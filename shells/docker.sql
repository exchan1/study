docker run -d --name=lemp \
  -v /home/dkkim/lemp/www/:/var/www/ \
  -v /home/dkkim/lemp/mysql:/var/lib/mysql \
  -p port_of_nginx:80 \
  stenote/docker-lemp:latest



docker run \
-d \
--name=plex \
--net=host \
-p 32400:32400 \
-p 32400:32400/udp \
-e VERSION=latest \
-v /home/exchan1/transmission/download:/data/movies \
linuxserver/plex



docker create \
--name=plex \
--net=host \
-e VERSION=latest \
-e PUID=<UID> -e PGID=<GID> \
-e TZ=<timezone> \
-v /home/exchan1/transmission/config:/config \
-v /home/exchan1/transmission/download:/data/movies \
linuxserver/plex



docker run -td --name plex --net=host -p 32400:32400 -p 32400:32400/udp -v /home/exchan1/transmission/config:/config \
-v /home/exchan1/transmission/download:/data/movies \
linuxserver/plex


docker run -td --name plex -p 32400:32400 -p 32400:32400/udp -v /home/exchan1/transmission/config:/config \
-e PLEX_LOGIN='exchan1' -e PLEX_PASSWORD='e383177805' \
-v /home/exchan1/transmission/download:/media \
wernight/plex-media-server




docker run -d --net="host" --name="plex" -p 32400:32400 -p 32400:32400/udp -v /home/exchan1/transmission/config:/config -v /home/exchan1/transmission/download:/data zaephor/plex




docker run -d -h 127.0.0.1 -v /home/exchan1/transmission/config:/config -v /home/exchan1/transmission/download:/data -p 32400:32400  ecliptik/docker-plex



docker run -d \
    --publish 8080:80\
    --name gitlab \
    --volume /home/exchan1/work/git/gitlab/config:/etc/gitlab \
    --volume /home/exchan1/work/git/gitlab/logs:/var/log/gitlab \
    --volume /home/exchan1/work/git/gitlab/data:/var/opt/gitlab \
    gitlab/gitlab-ce:latest
