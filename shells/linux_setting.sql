

## 우분투 설치 후 APT 업데이트 서버 변경
sudo sed -i 's/kr.archive.ubuntu.com/ftp.daumkakao.com/g' /etc/apt/sources.list

## 우분투 업데이트
sudo apt-get -y update && sudo apt-get -y dist-upgrade

## SU 권한 추가
adduser exchan1 sudo

## SSH 포트 방화벽 처리
sudo ufw allow ssh

## 최소설치
sudo apt-get install --no-install-recommends ubuntu-desktop


startx
