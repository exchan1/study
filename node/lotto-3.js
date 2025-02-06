function generateLottoNumbers() {
  const allNumbers = new Set(); // 전체 생성된 숫자를 저장하는 Set

  for (let i = 0; i < 5; i++) {
    const numbers = new Set(); // 각 회차별 숫자를 저장하는 Set

    while (numbers.size < 6) {
      const randomNumber = Math.floor(Math.random() * 45) + 1;
      numbers.add(randomNumber);
    }

    const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);
    const formattedNumbers = sortedNumbers.map((number) => {
      return number < 10 ? "0" + number : String(number);
    });

    // 이미 나온 숫자인지 확인하고, 아니라면 전체 Set에 추가하고 출력
    if (!hasDuplicate(allNumbers, formattedNumbers)) {
      formattedNumbers.forEach((num) => allNumbers.add(num));
      console.log(formattedNumbers);
    } else {
      i--; // 중복 발생 시 다시 시도
    }
  }
}

// 중복 확인 함수
function hasDuplicate(allNumbers, currentNumbers) {
  for (const num of currentNumbers) {
    if (allNumbers.has(num)) {
      return true; // 중복 발견
    }
  }
  return false; // 중복 없음
}

generateLottoNumbers();
