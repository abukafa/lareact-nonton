# Gunakan image dasar PHP-FPM dengan versi yang sesuai untuk Laravel 9 (PHP 8.2 direkomendasikan)
FROM php:8.2-fpm-alpine

# Instal dependensi sistem yang dibutuhkan untuk ekstensi PHP dan Composer
RUN apk add --no-cache \
    git \
    unzip \
    bash \
    icu-dev \
    libzip-dev \
    libpng-dev \
    libjpeg-turbo-dev \
    libwebp-dev \
    freetype-dev \
    oniguruma-dev \
    openssl-dev \
    mariadb-connector-c-dev \
    zlib-dev \
    autoconf \
    g++ \
    make \
    libxml2-dev

# Instal ekstensi PHP yang umum digunakan oleh Laravel dan library Anda
RUN docker-php-ext-configure gd --with-freetype --with-jpeg --with-webp \
    && docker-php-ext-install -j$(nproc) gd

RUN docker-php-ext-install -j$(nproc) intl
RUN docker-php-ext-install -j$(nproc) zip
RUN docker-php-ext-install -j$(nproc) pdo_mysql
RUN docker-php-ext-install -j$(nproc) mbstring
RUN docker-php-ext-install -j$(nproc) exif
RUN docker-php-ext-install -j$(nproc) pcntl
RUN docker-php-ext-install -j$(nproc) bcmath
RUN docker-php-ext-install -j$(nproc) opcache

# Hapus dependensi build untuk mengurangi ukuran image
RUN apk del autoconf g++ make libxml2-dev

# Instal Composer secara global di dalam image
COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer

# Tentukan direktori kerja di dalam kontainer
WORKDIR /var/www/html

# Salin SELURUH kode aplikasi terlebih dahulu
COPY . .

# Instal dependensi Composer
# RUN composer install --no-dev --optimize-autoloader || true
RUN composer install

# Konfigurasi hak akses direktori yang dibutuhkan Laravel
RUN chown -R www-data:www-data /var/www/html/storage \
    && chown -R www-data:www-data /var/www/html/bootstrap/cache \
    && chmod -R 775 /var/www/html/storage \
    && chmod -R 775 /var/www/html/bootstrap/cache

# Ekspos port default PHP-FPM
EXPOSE 9000

# Perintah default untuk menjalankan PHP-FPM
CMD ["php-fpm"]
