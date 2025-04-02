const axios = require("axios");
const cheerio = require("cheerio");

async function getCurrentLottoRound() {
  try {
    const response = await axios.get(
      "https://dhlottery.co.kr/common.do?method=main"
    );
    const html = response.data;
    const $ = cheerio.load(html);

    // 웹사이트 구조를 확인하여 현재 회차 번호가 있는 요소를 찾습니다.
    // 일반적으로 class 이름이나 id를 사용하여 찾습니다.
    // 현재 dhlottery.co.kr 웹사이트에서는 다음과 같은 구조에서 회차 정보를 찾을 수 있습니다.
    const periodElement = $("#lottoDrwNo").first();

    if (periodElement.length > 0) {
      const roundNumberText = periodElement.text();
      // 텍스트에서 숫자만 추출합니다.
      const roundNumber = parseInt(roundNumberText, 10);
      return roundNumber;
    } else {
      return "현재 로또 회차 정보를 찾을 수 없습니다.";
    }
  } catch (error) {
    console.error(
      "로또 회차 정보를 가져오는 중 오류가 발생했습니다:",
      error.message
    );
    return "로또 회차 정보를 가져오는 데 실패했습니다.";
  }
}

// 함수를 호출하여 현재 로또 회차를 출력합니다.
getCurrentLottoRound().then((round) => {
  console.log("현재 로또 회차:", round);
});
