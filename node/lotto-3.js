function generateUniqueLottoNumbers() {
  const allUsedNumbers = new Set(); // 이미 사용된 모든 숫자를 저장하는 Set

  for (let i = 0; i < 5; i++) {
    const numbers = new Set(); // 각 회차별 숫자를 저장하는 Set

    while (numbers.size < 6) {
      const randomNumber = Math.floor(Math.random() * 45) + 1;
      if (!allUsedNumbers.has(randomNumber)) {
        numbers.add(randomNumber);
        allUsedNumbers.add(randomNumber);
      }
    }

    const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);
    const formattedNumbers = sortedNumbers.map((number) => {
      return number < 10 ? "0" + number : String(number);
    });

    console.log(formattedNumbers);
  }

  // 만약 30개의 고유한 숫자를 생성하지 못한 경우 (극히 드문 경우)
  if (allUsedNumbers.size < 30) {
    console.warn("경고: 30개의 고유한 숫자를 생성하지 못했습니다.");
  }
}

generateUniqueLottoNumbers();
