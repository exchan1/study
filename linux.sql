sudo sed -i 's/kr.archve.ubuntu.com/ftp.daumkakao.com/g' /etc/apt/sources.list
sudo sed -i 's/security.ubuntu.com/ftp.daumkakao.com/g' /etc/apt/sources.list

:%s/kr.archive.ubuntu.com/ftp.daumkakao.com/g
:%s/security.ubuntu.com/ftp.daumkakao.com/g
:%s/extras.ubuntu.com/ftp.daumkakao.com/g


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