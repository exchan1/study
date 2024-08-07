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

let arr1 = [];
const logs = (str) => {
  console.log(
    `%c ==================== ${str}`,
    "color:yellow; font-weight:bold;"
  );
};

const setNum = () => {
  // 1~45번
  let allNo = new Array(45)
    .fill(0)
    .map((_, i) => (i < 9 ? "0" + (i + 1) : String(i + 1)));
  // 출현수
  logs("출현수");
  console.log(arr1);
  // 미출수
  let arr2 = [];
  // 결과
  arr2 = allNo.filter((v) => arr1.indexOf(v) === -1);
  logs("미출수");
  console.log(arr2);
  const uniqueArr = arr1.filter((element, index) => {
    return arr1.indexOf(element) === index;
  });
  // console.log(uniqueArr);
  logs("결과");

  let lottoArr = [];
  for (j = 0; j < 5; j++) {
    let newnum = [];
    for (i = 0; i <= 4; i++) {
      var movenum = uniqueArr.splice(
        Math.floor(Math.random() * uniqueArr.length),
        1
      )[0];
      newnum.push(movenum);
    }
    newnum.push(arr2.splice(Math.floor(Math.random() * arr2.length), 1)[0]);
    lottoArr.push(newnum.sort());
  }
  let txt = "";
  lottoArr.forEach((element) => {
    console.log(element.join());
    txt += element.join() + "<br />";
  });
};

/**
 * 시용법
 * npm run start
 */
const setDewNos = (e) => {
  let nos = [];
  let no1 = String(e.drwtNo1 < 10 ? "0" + e.drwtNo1 : e.drwtNo1);
  let no2 = String(e.drwtNo2 < 10 ? "0" + e.drwtNo2 : e.drwtNo2);
  let no3 = String(e.drwtNo3 < 10 ? "0" + e.drwtNo3 : e.drwtNo3);
  let no4 = String(e.drwtNo4 < 10 ? "0" + e.drwtNo4 : e.drwtNo4);
  let no5 = String(e.drwtNo5 < 10 ? "0" + e.drwtNo5 : e.drwtNo5);
  let no6 = String(e.drwtNo6 < 10 ? "0" + e.drwtNo6 : e.drwtNo6);

  nos.push(no1);
  nos.push(no2);
  nos.push(no3);
  nos.push(no4);
  nos.push(no5);
  nos.push(no6);

  arr1.push(no1);
  arr1.push(no2);
  arr1.push(no3);
  arr1.push(no4);
  arr1.push(no5);
  arr1.push(no6);

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
        setNum();
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
