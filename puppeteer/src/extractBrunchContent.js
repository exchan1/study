const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const urls = [
  "https://brunch.co.kr/@tamer/26",
  "https://brunch.co.kr/@brand-unboxing/16",
  "https://brunch.co.kr/@yoonash/172",
  "https://brunch.co.kr/@yoonash/117",
  "https://brunch.co.kr/@lovebrander",
  "https://brunch.co.kr/@geunbae/5",
  "https://brunch.co.kr/@clickb7402/100",
  "https://brunch.co.kr/@yj5wqu/10",
];

(async () => {
  // 브라우저를 시작합니다.
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // contents 폴더가 없으면 생성합니다.
  const contentsDir = path.join(__dirname, "contents");
  if (!fs.existsSync(contentsDir)) {
    fs.mkdirSync(contentsDir);
  }

  // book.txt 파일 경로 설정
  const bookFilePath = path.join(contentsDir, "book.txt");

  // URL 배열의 각 항목을 처리합니다.
  for (const url of urls) {
    // 입력받은 URL로 이동합니다.
    await page.goto(url, { waitUntil: "networkidle2" });

    // 페이지 제목 추출
    const title = await page.title();

    // 본문 내용이 로드될 때까지 기다립니다.
    try {
      await page.waitForSelector(".wrap_body", {
        timeout: 60000,
      }); // 본문 내용의 셀렉터입니다.
    } catch (error) {
      console.error(`본문 내용 셀렉터를 찾지 못했습니다 (${url}):`, error);
      continue;
    }

    // 본문 내용을 추출합니다.
    const content = await page.evaluate(() => {
      const contentElement = document.querySelector(".wrap_body");
      return contentElement
        ? contentElement.innerText.trim()
        : "본문 내용을 찾을 수 없습니다.";
    });

    // book.txt 파일에 내용 추가
    const chapterContent = `<CHAPTER> : ${title}\n\n${content}\n\n`;
    fs.appendFileSync(bookFilePath, chapterContent);

    console.log(`본문 내용이 ${bookFilePath}에 추가되었습니다 (${url}).`);
  }

  // 브라우저를 닫습니다.
  await browser.close();
})();
