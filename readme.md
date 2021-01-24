# Chaters backend
Chaters adalah aplikasi pesan untuk ponsel cerdas. Chaters merupakan aplikasi pesan lintas platform yang memungkinkan kita bertukar pesan tanpa pulsa, karena Chaters menggunakan paket data internet. Aplikasi Chaters menggunakan koneksi internet 3G, 4G atau WiFi untuk komunikasi data. Dengan menggunakan WhatsApp, kita dapat melakukan obrolan daring, berbagi file, bertukar foto dan lain-lain.

Chaters is a messaging application for smartphones. Chaters is a cross-platform messaging application that allows us to exchange messages without credit, because Chaters uses internet data packages. Chaters application uses internet connection 3G, 4G or WiFi for data communication. By using WhatsApp, we can chat online, share files, exchange photos and more

## Requirements
```
MySQL
Node.js
Sequelize
```

## Project setup
```
npm install
```

### set config
```
src/config/config.json
on development
    
"username": "your username",
"password": "your password",
"database": "name databases",
"host": "127.0.0.1",
"dialect": "mysql"

```

### set .env
```
DB_PORT= 5000

BASE_URL = 
SECRET_KEY = 

EMAIL = 
PW_EMAIL =

```

### table migratiton
```
before doing the migration, please create a database in your local

cd src
Sequelize db:migrate

```
### fix problem Sequelize cannot run
```
npm install --save sequelize
npm install --save-dev sequelize-cli
```


### Compiles and hot-reloads for development
```
npm run dev
```


## Postman Collection for testing

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/fe5a149fe5cb0b8d7e2d)