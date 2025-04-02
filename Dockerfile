FROM php:7.4-apache

RUN apt-get update && apt-get install -y git curl

RUN docker-php-ext-install mysqli

WORKDIR /var/www/html

COPY ./backend /var/www/html/