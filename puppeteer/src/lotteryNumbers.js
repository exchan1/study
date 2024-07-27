const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

(async () => {
  // 브라우저를 시작합니다.
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // 사이트로 이동합니다.
  await page.goto("https://www.dhlottery.co.kr/common.do?method=main", {
    waitUntil: "networkidle2",
  });

  // 회차 번호와 로또 번호가 로드될 때까지 기다립니다.
  try {
    await page.waitForSelector("#lottoDrwNo", { timeout: 60000 }); // 회차 번호가 로드될 때까지 기다립니다.
  } catch (error) {
    console.error("회차 번호 셀렉터를 찾지 못했습니다:", error);
    await browser.close();
    return;
  }

  // 회차 번호와 로또 번호를 추출합니다.
  const result = await page.evaluate(() => {
    const drawNumber = document.querySelector("#lottoDrwNo").textContent.trim();
    const numbers = [];
    for (let i = 1; i <= 6; i++) {
      const selector = `#drwtNo${i}`;
      const numberElement = document.querySelector(selector);
      if (numberElement) {
        numbers.push(numberElement.textContent.trim());
      }
    }
    // 보너스 번호 추출
    const bonusNumberElement = document.querySelector("#bnusNo");
    if (bonusNumberElement) {
      numbers.push(`Bonus: ${bonusNumberElement.textContent.trim()}`);
    }
    return { drawNumber, numbers };
  });

  console.log(`회차 번호: ${result.drawNumber}`);
  console.log("로또 번호:", result.numbers);

  // 캡처할 폴더가 없으면 생성합니다.
  // const captureDir = path.join(__dirname, 'capture');
  // if (!fs.existsSync(captureDir)) {
  //   fs.mkdirSync(captureDir);
  // }

  // 화면을 캡처하여 PNG 파일로 저장합니다.
  // const fileName = path.join(captureDir, `lottery_${result.drawNumber}.png`);
  // await page.screenshot({ path: fileName, fullPage: true });

  // console.log(`스크린샷 저장됨: ${fileName}`);

  // 브라우저를 닫습니다.
  await browser.close();
})();
