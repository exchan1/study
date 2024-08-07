const fs = require("fs");
const Epub = require("epub-gen");
const path = require("path");

// 오늘 날짜를 YYYYMMDD 형식으로 가져오기
const today = new Date();
const formattedDate = today.toISOString().split("T")[0].replace(/-/g, "");

// 텍스트 파일 읽기
const text = fs.readFileSync(
  path.join(__dirname, "contents", "book.txt"),
  "utf-8"
);

// 특정 문자열을 기준으로 텍스트 분할
const chapters = text
  .split("<CHAPTER>")
  .map((chapter, index) => {
    const [title, ...content] = chapter.split("\n\n");
    return {
      title: title.trim(),
      data: content.join("\n\n").trim(),
    };
  })
  .filter((chapter) => chapter.title); // 빈 챕터 제거

// EPUB 옵션 설정
const options = {
  title: "브런치-부자",
  author: "East Gold",
  content: chapters,
};

// EPUB 파일 생성
new Epub(options, `blog_${formattedDate}.epub`).promise.then(
  () => console.log("Ebook Generated Successfully!"),
  (err) => console.error("Failed to generate Ebook because of ", err)
);
