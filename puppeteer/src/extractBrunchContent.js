const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const urls = [
  "https://brunch.co.kr/@kfinland100/57", // 성공을 위한 10가지 습관
  "https://brunch.co.kr/@kfinland100/71", // 부자가 되기 위한 7가지 방법
  "https://brunch.co.kr/@kfinland100/73", // 성공한 사람들의 공통점
  "https://brunch.co.kr/@kfinland100/42", // 부자가 되기 위한 재정 관리 팁
  "https://brunch.co.kr/@kfinland100/33", // 성공적인 커리어를 위한 전략
  "https://brunch.co.kr/@kfinland100/113", // 부자가 되기 위한 투자 전략
  "https://brunch.co.kr/@kfinland100/26", // 성공을 위한 시간 관리 비법
  "https://brunch.co.kr/@kfinland100/10", // 부자가 되기 위한 습관
  "https://brunch.co.kr/@kfinland100/16", // 성공한 사람들의 일상 루틴
];

function removeUnsupportedTags(html, allowedTagsString) {
  const allowedTags = allowedTagsString.split(",").map((tag) => tag.trim());
  const allowedTagsPattern = allowedTags.join("|");
  const tagRegex = new RegExp(`<(?!/?(${allowedTagsPattern})\\b)[^>]+>`, "gi");
  const linkRegex = /<a\b[^>]*>(.*?)<\/a>/gi;
  const brRegex = /<br\s*\/?>/gi;

  // 태그와 링크 제거, <br> 태그를 줄바꿈으로 변환
  return html
    .replace(tagRegex, "")
    .replace(linkRegex, "$1")
    .replace(brRegex, "\n");
}

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
        ? contentElement.innerText.trim().replace(/\n/g, "<br>")
        : "본문 내용을 찾을 수 없습니다.";
    });

    // book.txt 파일에 내용 추가
    const chapterContent = `<CHAPTER> : ${title}\n\n${removeUnsupportedTags(
      content,
      "div,p,strong,br"
    )}\n\n`;
    fs.appendFileSync(bookFilePath, chapterContent);

    console.log(`본문 내용이 ${bookFilePath}에 추가되었습니다 (${url}).`);
  }

  // 브라우저를 닫습니다.
  await browser.close();
})();
