const QRCode = require("qrcode");

// QR 코드를 생성할 데이터
const data = "afa5dxx546";

// QR 코드를 파일로 저장
QRCode.toFile("./qr/qrcode.png", data, (err) => {
  if (err) throw err;
  console.log("QR 코드가 성공적으로 생성되었습니다.");
});

// QR 코드를 콘솔에 출력 (텍스트 형식)
QRCode.toString(data, { type: "terminal" }, (err, url) => {
  if (err) throw err;
  console.log(url);
});
