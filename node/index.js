const request = require("request");
const fs = require("fs").promises;
const fileName = "./lotto.json";
const lootoNo = 1132;
const loopCnt = 10;
const newData = [];

const addDrwNo = async () => {
  try {
    let existingData = [];
    try {
      const fileData = await fs.readFile(fileName, "utf8");
      existingData = JSON.parse(fileData);
    } catch (err) {
      if (err.code !== "ENOENT") throw err;
    }

    existingData = Array.isArray(existingData) ? existingData : [];
    existingData = [...existingData, ...newData].sort(
      (a, b) => a.drwNo - b.drwNo
    );

    await fs.writeFile(fileName, JSON.stringify(existingData, null, 2));
    console.log(`${fileName} 파일에 데이터 추가 완료`);
  } catch (err) {
    console.error("파일 처리에 실패했습니다:", err);
  }
};

let arr1 = [];
const logs = (str) => {
  console.log(
    `%c ==================== ${str}`,
    "color:yellow; font-weight:bold;"
  );
};

const setNum = () => {
  let allNo = Array.from({ length: 45 }, (_, i) =>
    i < 9 ? "0" + (i + 1) : String(i + 1)
  );

  let arr2 = allNo.filter((v) => !arr1.includes(v));

  const uniqueArr = [...new Set(arr1)];
  logs("결과");
  console.log(uniqueArr);

  let lottoArr = [];
  for (let j = 0; j < 5; j++) {
    let newnum = [];
    for (let i = 0; i <= 4; i++) {
      let movenum = uniqueArr.splice(
        Math.floor(Math.random() * uniqueArr.length),
        1
      )[0];
      newnum.push(movenum);
    }
    newnum.push(arr2.splice(Math.floor(Math.random() * arr2.length), 1)[0]);
    lottoArr.push(newnum.sort());
  }
  lottoArr.forEach((element) => console.log(element.join()));
};

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
  arr1.push(...nos);
  return {
    drwNo: e.drwNo,
    drwData: nos,
  };
};

(async () => {
  const fetch = (await import("node-fetch")).default;

  const reqNo = async (no) => {
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
        newData.push(drw);
      }
      setNum(newData);
      logs("New!!!");
      console.log(setNum2(newData));
    } catch (err) {
      console.error("로또 번호 요청에 실패했습니다:", err);
    }
  };

  const getLottoNo = async () => {
    await reqNo(lootoNo);
  };

  getLottoNo();
})();

const _ = require("lodash");
const setNum2 = (newData) => {
  const recentNumbers = _.flatten(newData.map((d) => d.drwData));
  const recentFrequency = _.countBy(recentNumbers);
  const frequentNumbers = _.filter(
    recentNumbers,
    (num) => recentFrequency[num] >= 3
  );
  const allNumbers = Array.from({ length: 45 }, (_, i) =>
    (i + 1).toString().padStart(2, "0")
  );
  const missingNumbers = _.difference(allNumbers, recentNumbers);
  const excludedNumbers = _.keys(
    _.pickBy(recentFrequency, (freq) => freq >= 3)
  );

  function generateGame() {
    const numbersSet = new Set();

    // 1. 최근 10주 이내 출현수에서 4~5수 선택
    _.sampleSize(
      _.difference(frequentNumbers, excludedNumbers),
      _.random(4, 5)
    ).forEach((num) => numbersSet.add(num));

    // 2. 최근 10주 미출수에서 1~2수 선택
    _.sampleSize(missingNumbers, _.random(1, 2)).forEach((num) =>
      numbersSet.add(num)
    );

    // 3. 출현 빈도 그룹 활용
    const remainingNumbers = _.difference(
      allNumbers,
      Array.from(numbersSet),
      excludedNumbers
    );
    _.sampleSize(remainingNumbers, 6 - numbersSet.size).forEach((num) =>
      numbersSet.add(num)
    );

    // 4. 끝수와 동수 고려, 연번 포함
    const numbers = Array.from(numbersSet);
    if (_.random(0, 1)) {
      const pairs = _.chunk(_.sortBy(numbers), 2);
      pairs.forEach((pair) => {
        if (Math.abs(pair[0] - pair[1]) !== 1 && numbersSet.size < 6) {
          numbersSet.add(pair[0]);
        }
      });
    }

    // 결과를 정렬하여 반환
    return Array.from(numbersSet).sort();
  }

  function generateLottoGames() {
    return Array.from({ length: 5 }, () => generateGame());
  }

  return generateLottoGames();
};

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
