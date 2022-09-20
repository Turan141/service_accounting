#FROM node:lts-alpine as builder
#
#WORKDIR /usr/src/app
#
#ENV PATH /usr/src/app/node_modules/.bin:$PATH
#
#COPY package*.json ./
#COPY .npmrc ./
#
#RUN npm cache clean --force && npm install
#
#COPY . .
#
#RUN npm run build

FROM nginx:alpine

#!/bin/sh

RUN rm -rf /usr/share/nginx/html/*
# COPY --from=builder /usr/src/app/build /var/www/app/flights
COPY ./build /var/www/app/flights
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
