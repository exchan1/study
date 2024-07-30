sudo sed -i 's/kr.archve.ubuntu.com/ftp.daumkakao.com/g' /etc/apt/sources.list
sudo sed -i 's/security.ubuntu.com/ftp.daumkakao.com/g' /etc/apt/sources.list

:%s/kr.archive.ubuntu.com/ftp.daumkakao.com/g
:%s/security.ubuntu.com/ftp.daumkakao.com/g
:%s/extras.ubuntu.com/ftp.daumkakao.com/g

## ssh -p 1441 exchan1@122.45.82.104


sudo apt-get update
sudo apt-get dist-upgrade

# wget https://github.com/Thestars3/arkzip/releases/download/v2.4.4/arkzip_2.4.4_amd64.deb
# apt-get install libqt4-core

# 1. Docker 저장소 GPG key 추가
apt-key adv --keyserver hkp://p80.pool.sks-keyservers.net:80 --recv-keys 58118E89F3A912897C070ADBF76221572C52609D
# 2. Docker 저장소 추가
echo "deb https://apt.dockerproject.org/repo ubuntu-xenial main" | sudo tee /etc/apt/sources.list.d/docker.list
# 3. APT 업데이트
apt-get update
# 4. Docker, Docker-compose 설치
apt-get install -y docker-engine
apt-get install -y docker-compose

# 5. sudo 없이 명령어 사용하도록 설정
sudo usermod -aG docker $(whoami)

# 6. 명령어 실행
docker -v
docker-compose -v

## USB Mount
## mount -t ntfs-3g /dev/sdc1 /home/exchan1/compose-plex/data/usb/
## umount /home/exchan1/compose-plex/data/usb
## tasksel









docker exec jenkins /bin/bash

docker \
  run \
  -d \
  -p 8080:8080 \
  -p 50000:50000 \
  -v /home/service/jenkins_home:/var/jenkins_home \
  --name jenkins \
  -u root \
  jenkins;





#docker-compose -p up -d
version: "2"
services:
  jenkins:
    image: "jenkins"
    ports:
      - 8080:8080
    restart: "always"
    volumes:
      - ./data-jenkins:/var/jenkins_home



version: '2'
services:
  web:
    image: nginx:1.11-alpine
    links:
      - php
    ports:
      - "8080:80"
    volumes:
      - ./nginx.conf:/etc/nginx/conf.d/default.conf
    volumes_from:
      - php
  php:
    build: php-7.0-fpm-custom
    environment:
      - TYPO3_CONTEXT=Development/Docker
    links:
      - db
      - redis
    volumes:
      - ./htdocs:/var/www/html
  db:
    image: mariadb:10.1
    environment:
      - MYSQL_ROOT_PASSWORD=secret
    volumes:
      - ./mysql:/var/lib/mysql
  redis:
    image: redis:3.2


## gitlab
version: '2'
services:
  web:
    image: 'gitlab/gitlab-ce:latest'
    restart: always
  ports:
    - '8080:80'
    - '443:443'
    - '22:22'
  volumes:
    - './config:/etc/gitlab'
    - './logs:/var/log/gitlab'
    - './data:/var/opt/gitlab'




## 리눅스 최소설치
apt-get install git
mkdir ~/github
cd ~/github
git init
git clone https://github.com/dymaxionkim/UbuntuBang.git
cd UbuntuBang
chmod +x ./UbuntuBang.sh
sudo sh UbuntuBang.sh




docker create --name=transmission \
-v /home/exchan1/compose-transmission/config:/config \
-v /home/exchan1/compose-transmission/downloads:/downloads \
-v /home/exchan1/compose-transmission/watch:/watch \
-e PGID=0 -e PUID=0 \
-e TZ=Asia/Seoul \
-p 9091:9091 -p 51413:51413 \
-p 51413:51413/udp \
linuxserver/transmission



##---------------------------------------------------------------------------------------------------
### 이클립스 단축키
대문자로 변환: ctrl + shift + x
소문자로 변환: ctrl + shift + y
들여쓰기: ctrl + shift + tab ( 블록 범위 )
내어쓰기: shift + tab ( 블록 범위 )
커서 이동: alt + ↑, alt + ↓
컴파일(저장): ctrl + s
모든 클래스 저장: ctrl + shift + s
라인으로 커서 이동: ctrl + l
전체 선택:  ctrl + a
소스 정렬:  ctrl + shift + f ( 블록 범위 )
한 줄 삭제: ctrl + d
패널 접기: ctrl + m
디버깅: F11
실행: ctrl + F11
오른쪽클릭 + Source: alt + shift + s
getter, setter 자동 구현: (alt + shift + s) + r
디폴트 생성자 자동 구현: (alt + shift + s) + c
빌드 생성자 자동 구현: (alt + shift + s) + o
Ctrl + e : 한줄지움
Ctrl + w : 메뉴보여줌
Ctrl + space : 클래스등 코드 도움
Ctrl + / : 한줄 주석 반대는 Ctrl + \
Ctrl + , : 찾기나, TASK항목 이동
Ctrl + . : 이동
Ctrl + F6 : Editor 선택
Ctrl + F7 : View 선택
Ctrl + F8 : Perspectieve 선택
Ctrl + F11 : 디버깅
Ctrl + 1 : QuickFix 실행
Ctrl + Shift + b : 브레이크 포인트
Ctrl + Shift + e : 현재 캐럿에서 끝까지 삭제
Ctrl + Shift + f : 코드 포맷팅
Ctrl + Shift + m : 자동 임포트
Ctrl + Shift + o : 임포트 자동 정리
Ctrl + Shift + space : 입력 파라미터 정보 보여줌

-- 테스트 자동화 툴
http://dev.naver.com/projects/guitar
https://github.com/naver/guitar
https://www.youtube.com/watch?v=qlnF6mFeP4c


tar zcvf ./upload.tar.gz ./upload --exclude=./upload/dev --exclude=*.pdf --exclude=*.mp3 --exclude=*.zip


find /home/kdnavien/deploy/backup/ -type f -ctime +30 -exec rm -rf {} \;
cat /dev/null > catalina.out


tar zcvf ./upload.tar.gz ./upload \
--exclude=./upload/customer \
--exclude=./upload/editor \
--exclude=./upload/ir \
--exclude=./upload/main \
--exclude=./upload/pr \
--exclude=./upload/productSpec \
--exclude=./upload/products


tar zcvf ./images.tar.gz ./images \
--exclude=./images/email \
--exclude=./images/ko


tar zcvf ./kd-new-mgmt.tar.gz ./kd-new-mgmt \
--exclude=./kd-new-mgmt/webapp/resources/upload \
--exclude=./kd-new-mgmt/webapp/resources/images


tar zcvf ./kd-new-web.tar.gz ./kd-new-web \
--exclude=./kd-new-web/webapp/resources/upload \
--exclude=./kd-new-web/webapp/resources/images


--------------- Bausch Push Test
$.get('./app_proc.jsp?Trans=S&fiPushSeq=43');



========= MSSQL Test
sqlcmd -U kdnavien -P kdnavien -S localhost -d kdnavien -Q "UPDATE T_AS_REQUEST SET AS_CUST_MODEL='test' WHERE AS_CONSULT_NO='2016122900014'"