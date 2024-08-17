const _ = require("lodash");

const past10Weeks = [
  ["06", "07", "19", "28", "34", "41"],
  ["01", "02", "06", "14", "27", "38"],
  ["15", "19", "21", "25", "27", "28"],
  ["05", "10", "11", "17", "28", "34"],
  ["01", "05", "08", "16", "28", "33"],
  ["10", "15", "24", "30", "31", "37"],
  ["04", "05", "09", "11", "37", "40"],
  ["06", "14", "25", "33", "40", "44"],
  ["03", "08", "17", "30", "33", "34"],
  ["13", "19", "21", "24", "34", "35"],
];

// 1. 최근 10주 이내 출현수에서 4~5수를 가져간다.
const recentNumbers = _.flatten(past10Weeks);
const recentFrequency = _.countBy(recentNumbers);
const frequentNumbers = _.filter(
  recentNumbers,
  (num) => recentFrequency[num] >= 3
);

// 2. 최근 10주 이상 미출수에서 1~2수를 조합해서 넣는다.
const allNumbers = Array.from({ length: 45 }, (_, i) =>
  (i + 1).toString().padStart(2, "0")
);
const missingNumbers = _.difference(allNumbers, recentNumbers);

// 5. 최근 10회차 3회 이상 출현수는 제외수로 한다.
const excludedNumbers = _.keys(_.pickBy(recentFrequency, (freq) => freq >= 3));

function generateGame() {
  const numbers = [];

  // 1. 최근 10주 이내 출현수에서 4~5수
  numbers.push(
    ..._.sampleSize(
      _.difference(frequentNumbers, excludedNumbers),
      _.random(4, 5)
    )
  );

  // 2. 최근 10주 이상 미출수에서 1~2수
  numbers.push(..._.sampleSize(missingNumbers, 1));

  // 3. 출현 빈도 그룹 활용
  const remainingNumbers = _.difference(allNumbers, numbers, excludedNumbers);
  numbers.push(..._.sampleSize(remainingNumbers, 6 - numbers.length));

  // 6. 전체 구매 조합에 연번을 50%는 넣는다.
  if (_.random(0, 1)) {
    const pairs = _.chunk(_.sortBy(numbers), 2);
    pairs.forEach((pair) => {
      if (Math.abs(pair[0] - pair[1]) !== 1) {
        numbers.push(pair[0]);
      }
    });
  }

  return _.shuffle(numbers).slice(0, 6);
}

function generateLottoGames() {
  return Array.from({ length: 5 }, () => generateGame());
}

console.log(generateLottoGames());
