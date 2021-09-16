FROM nginx:1.21.3-alpine
WORKDIR /var/www/html

COPY . .
COPY ./docker/nginx/default.conf /etc/nginx/conf.d/default.conf
