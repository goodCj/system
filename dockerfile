# 父镜像
FROM nginx
# 安装服务
COPY ./dist  /usr/local/dist/
COPY ./MP_verify_qPlXtEvHoYcgN6Jm.txt /usr/local/dist/
# 安装启动脚本
COPY ./nginx.conf  /etc/nginx/
ENTRYPOINT nginx && /bin/sh -c 'while true; do echo hello docker; sleep 3600; done'
