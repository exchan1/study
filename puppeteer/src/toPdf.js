const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // 웹사이트로 이동
  await page.goto("https://brunch.co.kr/@kfinland100/57", {
    waitUntil: "networkidle0",
  });

  // 페이지의 전체 높이 계산
  const bodyHandle = await page.$("body");
  const { height } = await bodyHandle.boundingBox();
  await bodyHandle.dispose();

  // 페이지 크기 설정 (90mm x 120mm)
  // await page.setViewport({
  //   width: 340, // 90mm를 픽셀로 변환 (1mm ≈ 3.78px)
  //   height: height,
  //   deviceScaleFactor: 1,
  // });

  // PDF로 저장
  await page.pdf({
    path: "output.pdf",
    // width: "90mm",
    // height: `${height}px`,
    printBackground: true,
  });

  await browser.close();
})();
