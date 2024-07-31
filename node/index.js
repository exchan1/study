// request 모듈
const request = require("request");
// fs 모듈
const fs = require("fs");
// 파일명을 변수로 선언
const fileName = "./lotto.json";

// 로또회차
const lootoNo = 1130;
// 반복횟수
const loopCnt = 10;

const newData = [];

const addDrwNo = () => {
  // 파일이 존재하는지 확인하고, 존재하면 데이터 추가, 그렇지 않으면 새로 생성
  fs.access(fileName, fs.constants.F_OK, (err) => {
    if (err) {
      // 파일이 없을 경우, 새로 생성
      fs.writeFile(fileName, JSON.stringify(newData, null, 2), (err) => {
        if (err) {
          console.error("파일 생성에 실패했습니다:", err);
        } else {
          console.log(`${fileName} 파일 생성 완료`);
        }
      });
    } else {
      // 파일이 있을 경우, 데이터 읽기 및 추가
      fs.readFile(fileName, "utf8", (err, fileData) => {
        if (err) {
          console.error("파일 읽기에 실패했습니다:", err);
        } else {
          let existingData = JSON.parse(fileData); // 기존 데이터를 읽어옵니다.
          // 데이터가 배열인지 확인하고 추가
          if (Array.isArray(existingData)) {
            existingData = [...existingData, ...newData]; // 새로운 데이터를 추가
          } else {
            // 배열이 아닐 경우, 배열로 변환하고 추가
            existingData = [...existingData, ...newData];
          }

          existingData = existingData.sort((a, b) => a.drwNo - b.drwNo);

          // 파일에 추가된 데이터를 다시 작성
          fs.writeFile(
            fileName,
            JSON.stringify(existingData, null, 2),
            (err) => {
              if (err) {
                console.error("파일 업데이트에 실패했습니다:", err);
              } else {
                // console.log(`${fileName} 파일에 데이터 추가 완료`);
              }
            }
          );
        }
      });
    }
  });
};

/**
 * 시용법
 * npm run start
 */
const setDewNos = (e) => {
  let nos = [];
  nos.push(String(e.drwtNo1 < 10 ? "0" + e.drwtNo1 : e.drwtNo1));
  nos.push(String(e.drwtNo2 < 10 ? "0" + e.drwtNo2 : e.drwtNo2));
  nos.push(String(e.drwtNo3 < 10 ? "0" + e.drwtNo3 : e.drwtNo3));
  nos.push(String(e.drwtNo4 < 10 ? "0" + e.drwtNo4 : e.drwtNo4));
  nos.push(String(e.drwtNo5 < 10 ? "0" + e.drwtNo5 : e.drwtNo5));
  nos.push(String(e.drwtNo6 < 10 ? "0" + e.drwtNo6 : e.drwtNo6));

  // console.log(`회차 : #${e.drwNo}`);
  console.log(nos.join("  "));

  return {
    drwNo: e.drwNo,
    drwData: nos,
  };
};

const reqNo = async (no) => {
  for (let i = 0; i < loopCnt; i++) {
    const options = {
      uri: "https://www.dhlottery.co.kr/common.do",
      qs: {
        method: "getLottoNumber",
        drwNo: no - i,
      },
    };
    request(options, function (err, response, body) {
      let obj = JSON.parse(body);
      const drw = setDewNos(obj);
      newData.push(drw);

      if (newData.length === loopCnt) {
        // console.log(newData);
        // addDrwNo();
      }
    });
  }
};

const getLottoNo = async () => {
  await reqNo(lootoNo);
  // await addDrw();
};

getLottoNo();

/*
// 모의로 최근 10회의 로또 번호
const recentLottoNumbers = [
    [3, 7, 12, 22, 34, 38],
    [4, 10, 18, 27, 30, 33],
    [7, 11, 12, 31, 33, 38],
    [6, 13, 17, 18, 29, 30],
    [8, 10, 23, 31, 35, 40],
    [5, 14, 20, 23, 30, 32],
    [9, 15, 21, 28, 36, 39],
    [2, 6, 15, 22, 29, 36],
    [1, 4, 8, 11, 28, 40],
    [3, 7, 15, 17, 19, 42]
];

// 최근 10회의 로또 번호 중 5개 선택
const selectedNumbers = recentLottoNumbers[9].slice(0, 5);

// 나머지 번호 생성
const remainingNumber = Math.floor(Math.random() * 45) + 1;
const allNumbers = [...selectedNumbers, remainingNumber];

// 결과 문자열로 변환 및 정렬
const formattedNumbers = allNumbers.map(number => (number < 10 ? '0' : '') + number).sort((a, b) => a - b).join(', ');

console.log(formattedNumbers);
*/
