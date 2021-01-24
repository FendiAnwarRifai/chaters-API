# Chaters backend
Find your Flight and explore the 
world with us. We will take care of the rest

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