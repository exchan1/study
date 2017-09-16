sudo sed -i 's/kr.archve.ubuntu.com/ftp.daumkakao.com/g' /etc/apt/sources.list
sudo sed -i 's/security.ubuntu.com/ftp.daumkakao.com/g' /etc/apt/sources.list

sudo apt-get update
sudo apt-get dist-upgrade

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




/*
docker-compose up -d
*/
version: "2"
services:
  jenkins:
    image: "jenkins:2.19.2"
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