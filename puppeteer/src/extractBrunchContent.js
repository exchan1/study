const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

// URL을 입력받습니다.
const url = process.argv[2];

if (!url) {
  console.error("URL을 입력하세요.");
  process.exit(1);
}

(async () => {
  // 브라우저를 시작합니다.
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // 입력받은 URL로 이동합니다.
  await page.goto(url, { waitUntil: "networkidle2" });

  // 본문 내용이 로드될 때까지 기다립니다.
  try {
    await page.waitForSelector(".wrap_body", {
      timeout: 60000,
    }); // 본문 내용의 셀렉터입니다.
  } catch (error) {
    console.error("본문 내용 셀렉터를 찾지 못했습니다:", error);
    await browser.close();
    return;
  }

  // 본문 내용을 추출합니다.
  const content = await page.evaluate(() => {
    const contentElement = document.querySelector(".wrap_body");
    return contentElement
      ? contentElement.innerText.trim()
      : "본문 내용을 찾을 수 없습니다.";
  });

  // console.log("본문 내용:", content);

  // contents 폴더가 없으면 생성합니다.
  const contentsDir = path.join(__dirname, "contents");
  if (!fs.existsSync(contentsDir)) {
    fs.mkdirSync(contentsDir);
  }

  // 파일 이름 생성 (URL의 마지막 부분을 파일 이름으로 사용)
  const fileName = path.join(contentsDir, `${path.basename(url)}.txt`);

  // 본문 내용을 텍스트 파일로 저장합니다.
  fs.writeFileSync(fileName, content);

  console.log(`본문 내용이 ${fileName}에 저장되었습니다.`);

  // 브라우저를 닫습니다.
  await browser.close();
})();
