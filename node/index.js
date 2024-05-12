// request 모듈
const request = require("request");
// fs 모듈
const fs = require("fs");
// 파일명을 변수로 선언
const fileName = "./lotto.json";

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
  for (let i = 0; i < 10; i++) {
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
      // addDrwNo(drw);
    });
  }

  setTimeout(function () {
    // addDrwNo();
  }, 3000);
};

const getLottoNo = async () => {
  const no = 1119;
  await reqNo(no);
  // await addDrw();
};

getLottoNo();
