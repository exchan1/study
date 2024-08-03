const pdf = require("pdf-poppler");
const Tesseract = require("tesseract.js");
const path = require("path");
const fs = require("fs");

async function convertPDFToImages(pdfPath) {
  const outputDir = path.dirname(pdfPath);
  const options = {
    format: "jpeg",
    out_dir: outputDir,
    out_prefix: path.basename(pdfPath, path.extname(pdfPath)),
    page: null,
  };

  try {
    await pdf.convert(pdfPath, options);
    console.log("PDF converted to images successfully.");
  } catch (error) {
    console.error("Error converting PDF to images:", error);
  }
}

async function extractTextFromImages(imagePaths) {
  const texts = [];
  for (const imagePath of imagePaths) {
    try {
      const {
        data: { text },
      } = await Tesseract.recognize(imagePath, "kor", {
        logger: (m) => console.log(m),
      });
      texts.push(text);
    } catch (error) {
      console.error(`Error extracting text from image ${imagePath}:`, error);
    }
  }
  return texts.join("\n");
}

async function processPDF(pdfPath) {
  await convertPDFToImages(pdfPath);
  const outputDir = path.dirname(pdfPath);
  const imagePaths = fs
    .readdirSync(outputDir)
    .filter((file) =>
      file.startsWith(path.basename(pdfPath, path.extname(pdfPath)))
    )
    .filter((file) => file.indexOf("pdf") === -1)
    .map((file) => path.join(outputDir, file));

  console.log(imagePaths);

  const extractedText = await extractTextFromImages(imagePaths);
  fs.writeFileSync("./work/output.txt", extractedText, "utf8");
  console.log("Extracted text saved to output.txt");
}

processPDF("./work/sample.pdf").catch(console.error);
