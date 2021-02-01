# Chaters backend
This API is for Chaters APP [https://github.com/FendiAnwarRifai/chaters-Frontend](https://github.com/FendiAnwarRifai/chaters-Frontend)<br>
Chaters is a messaging application for smartphones. Chaters is a cross-platform messaging application that allows us to exchange messages without credit, because Chaters uses internet data packages. Chaters application uses internet connection 3G, 4G or WiFi for data communication. By using Chaters, we can chat online, exchange photos and more

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