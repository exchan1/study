const request = require("request");

const printNo = (e) => {
  let nos = [];
  nos.push(String(e.drwtNo1 < 10 ? "0" + e.drwtNo1 : e.drwtNo1));
  nos.push(String(e.drwtNo2 < 10 ? "0" + e.drwtNo2 : e.drwtNo2));
  nos.push(String(e.drwtNo3 < 10 ? "0" + e.drwtNo3 : e.drwtNo3));
  nos.push(String(e.drwtNo4 < 10 ? "0" + e.drwtNo4 : e.drwtNo4));
  nos.push(String(e.drwtNo5 < 10 ? "0" + e.drwtNo5 : e.drwtNo5));
  nos.push(String(e.drwtNo6 < 10 ? "0" + e.drwtNo6 : e.drwtNo6));
  console.log(nos.join("  "));
};

const reqNo = (no) => {
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
      printNo(obj);
    });
  }
};

const getLottoNo = () => {
  const no = 1117;
  reqNo(no);
};

getLottoNo();
