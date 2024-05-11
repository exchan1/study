// request 모듈
const request = require("request");
// fs 모듈
const fs = require("fs");
// 파일명을 변수로 선언
const fileName = "./lotto.json";

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

const setDewNos = (e) => {
  let nos = [];
  nos.push(String(e.drwtNo1 < 10 ? "0" + e.drwtNo1 : e.drwtNo1));
  nos.push(String(e.drwtNo2 < 10 ? "0" + e.drwtNo2 : e.drwtNo2));
  nos.push(String(e.drwtNo3 < 10 ? "0" + e.drwtNo3 : e.drwtNo3));
  nos.push(String(e.drwtNo4 < 10 ? "0" + e.drwtNo4 : e.drwtNo4));
  nos.push(String(e.drwtNo5 < 10 ? "0" + e.drwtNo5 : e.drwtNo5));
  nos.push(String(e.drwtNo6 < 10 ? "0" + e.drwtNo6 : e.drwtNo6));

  return {
    drwNo: e.drwNo,
    drwData: nos,
  };
};
const reqNo = async (no) => {
  const tempArray = [];
  try {
    for (let i = 0; i < 10; i++) {
      const options = {
        uri: "https://www.dhlottery.co.kr/common.do",
        qs: {
          method: "getLottoNumber",
          drwNo: no - i,
        },
      };

      let req = await request(options, function (err, response, body) {
        let obj = JSON.parse(body);
        const drw = setDewNos(obj);
        tempArray.push(drw);
        // addDrwNo(drw);
      });
    }
  } catch (e) {
    console.log(e);
  }
  console.log(tempArray);
  return tempArray;
};

const getLottoNo = async () => {
  const no = 10;
  const reqArr = reqNo(no);
  // await addDrw();
  // console.log(reqArr);
};

getLottoNo();
