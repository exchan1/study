// request 모듈
const request = require("request");
// fs 모듈
const fs = require("fs");
// 파일명을 변수로 선언
const fileName = "./lotto.json";

const axios = require("axios");
const cheerio = require("cheerio");

let lottoNo = 0;
const loopCnt = 10;

const newData = [];

const createJson = () => {
  // 파일이 존재하는지 확인하고, 존재하면 데이터 추가, 그렇지 않으면 새로 생성
  fs.access(fileName, fs.constants.F_OK, (err) => {
    if (err) {
      // 파일이 없을 경우, 새로 생성
      fs.writeFile(fileName, JSON.stringify([], null, 2), (err) => {
        if (err) {
          console.error("파일 생성에 실패했습니다:", err);
        } else {
          console.log(`${fileName} 파일 생성 완료`);
        }
      });
    }
  });
};

createJson();

/**
 * 시용법
 * npm run start
 */
const setDewNos = (e) => {
  let nos = [
    e.drwtNo1,
    e.drwtNo2,
    e.drwtNo3,
    e.drwtNo4,
    e.drwtNo5,
    e.drwtNo6,
  ].map((num) => String(num < 10 ? "0" + num : num));
  return {
    drwNo: e.drwNo,
    drwData: nos,
  };
};
const reqNo = async (no) => {
  const tempArray = [];
  console.log("현재 로또 회차:", no);
  const requests = Array.from({ length: loopCnt }, (_, i) => {
    return fetch(
      `https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=${
        no - i
      }`
    );
  });
  try {
    const responses = await Promise.all(requests);
    for (const response of responses) {
      const obj = await response.json();
      const drw = setDewNos(obj);
      tempArray.push(drw);
    }
    console.log(tempArray);
  } catch (err) {
    console.error("로또 번호 요청에 실패했습니다:", err);
  }
  return tempArray;
};

const getLottoNo = async (no) => {
  reqNo(no);
};

async function getCurrentLottoRound() {
  try {
    const response = await axios.get(
      "https://dhlottery.co.kr/common.do?method=main"
    );
    const html = response.data;
    const $ = cheerio.load(html);

    // 웹사이트 구조를 확인하여 현재 회차 번호가 있는 요소를 찾습니다.
    // 일반적으로 class 이름이나 id를 사용하여 찾습니다.
    // 현재 dhlottery.co.kr 웹사이트에서는 다음과 같은 구조에서 회차 정보를 찾을 수 있습니다.
    const periodElement = $("#lottoDrwNo").first();

    if (periodElement.length > 0) {
      const roundNumberText = periodElement.text();
      // 텍스트에서 숫자만 추출합니다.
      const roundNumber = parseInt(roundNumberText, 10);
      return roundNumber;
    } else {
      return "현재 로또 회차 정보를 찾을 수 없습니다.";
    }
  } catch (error) {
    console.error(
      "로또 회차 정보를 가져오는 중 오류가 발생했습니다:",
      error.message
    );
    return "로또 회차 정보를 가져오는 데 실패했습니다.";
  }
}

// 함수를 호출하여 현재 로또 회차를 출력합니다.
getCurrentLottoRound().then(async (round) => {
  await getLottoNo(round);
});
