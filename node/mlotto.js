const N = 45; // 로또 번호 총 개수
const M = 6; // 예측할 로또 번호 개수
const K = 10000; // 시뮬레이션 횟수

function gen() {
  const lotto = new Set();
  while (lotto.size < M) {
    lotto.add(Math.floor(Math.random() * N) + 1);
  }
  return Array.from(lotto);
}

function predict() {
  const counts = new Array(N + 1).fill(0);

  for (let i = 0; i < K; i++) {
    gen().forEach((n) => counts[n]++);
  }

  return counts
    .map((count, number) => ({ number, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, M)
    .map(({ number }) => (number < 10 ? `0${number}` : `${number}`))
    .sort((a, b) => a - b);
}

// 다섯 번의 결과 출력
for (let i = 0; i < 5; i++) {
  console.log(predict().join(","));
}
