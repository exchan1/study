const N = 45; // 로또 번호 총 개수
const M = 6; // 예측할 로또 번호 개수
const K = 10000; // 시뮬레이션 횟수

function gen() {
  let lotto = new Array(M);
  for (let i = 0; i < M; i++) {
    let r = Math.floor(Math.random() * N) + 1;
    lotto[i] = r;
  }
  return lotto;
}

function predict() {
  let counts = new Array(N + 1).fill(0);

  for (let i = 0; i < K; i++) {
    let prediction = gen();
    prediction.forEach((n) => counts[n]++);
  }

  let top = [];
  for (let i = 0; i < M; i++) {
    let maxIdx = counts.indexOf(Math.max(...counts));
    counts[maxIdx] = 0;
    top.push(maxIdx < 10 ? `0${maxIdx}` : `${maxIdx}`);
  }

  return top.sort((a, b) => a - b);
}

// 다섯 번의 결과 출력
for (let i = 0; i < 5; i++) {
  let high = predict();
  console.log(high.join(","));
}
