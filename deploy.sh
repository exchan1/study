#!/bin/bash

HOME_DIR=/home/kdnavien
DEPLOY_HOME=$HOME_DIR/deploy
WAS_HOME=$HOME_DIR/kdnavien-tomcat
APP_HOME=$HOME_DIR/kdnavien.etribe.co.kr
WAR_NAME=kyungdong-navien-webapp.war

# Stop WAS
sh $WAS_HOME/bin/shutdown.sh

# Clear WAS Working Folder
cd $APP_HOME/wasdoc
rm -fR *

# extract
cd $APP_HOME/wasdoc
jar xvf $DEPLOY_HOME/$WAR_NAME

# copy static resources
cd $APP_HOME/webdoc
rm -fR *


#mv $APP_HOME/wasdoc/resources/* $APP_HOME/webdoc/
mv $APP_HOME/wasdoc/resources/font $APP_HOME/webdoc/
mv $APP_HOME/wasdoc/resources/images $APP_HOME/webdoc/
mv $APP_HOME/wasdoc/resources/inc $APP_HOME/webdoc/
mv $APP_HOME/wasdoc/resources/bootstrap $APP_HOME/webdoc/
mv $APP_HOME/wasdoc/resources/ckeditor $APP_HOME/webdoc/
mv $APP_HOME/wasdoc/resources/dist $APP_HOME/webdoc/
mv $APP_HOME/wasdoc/resources/lib $APP_HOME/webdoc/
mv $APP_HOME/wasdoc/resources/plugins $APP_HOME/webdoc/
mv $APP_HOME/upload $APP_HOME/webdoc/

ln -s $HOME_DIR/upload $APP_HOME/webdoc/upload

# Start WAS
sh $WAS_HOME/bin/startup.sh

# WAR BACKUP
cd $DEPLOY_HOME
mv $WAR_NAME backup/$WAR_NAME.$(date +"%Y%m%d%H%M%S")

find /home/kdnavien/deploy/backup/ -type f -ctime +10 -exec rm -rf {} \;
find /home/kdnavien/kdnavien-tomcat/logs -type f -ctime +10 -exec rm -rf {} \;


## Test commit
## git config --global user.name "dkkim"
## git config --global user.email exchan1@gmail.com