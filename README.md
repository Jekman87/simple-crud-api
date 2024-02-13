# CRUD API

## Description

Implemented a simple CRUD API using in-memory database underneath.

[Assignment link](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/crud-api/assignment.md)

## Installing
- `git clone git@github.com:Jekman87/simple-crud-api.git` clone the repo 
- `cd simple-crud-api` go to project directory 
- `git checkout develop` checkout to develop branch 
- `npm i` install packages 

## Usage
+ `npm run start:dev` run app in development mode
+ `npm run start:prod` run app in production mode
+ `npm run lint` check lint errors
+ `npm run test` run e2e tests

## Endpoints
To check the task you can use [Postman](https://www.postman.com/)
- **GET** `api/users` is used to get all persons
    - Server should answer with `status code` **200** and all users records
- **GET** `api/users/{userId}` 
    - Server should answer with `status code` **200** and record with `id === userId` if it exists
    - Server should answer with `status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
    - Server should answer with `status code` **404** and corresponding message if record with `id === userId` doesn't exist
- **POST** `api/users` is used to create record about new user and store it in database
    - Server should answer with `status code` **201** and newly created record
    - Server should answer with `status code` **400** and corresponding message if request `body` does not contain **required** fields
- **PUT** `api/users/{userId}` is used to update existing user
    - Server should answer with` status code` **200** and updated record
    - Server should answer with` status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
    - Server should answer with` status code` **404** and corresponding message if record with `id === userId` doesn't exist
- **DELETE** `api/users/{userId}` is used to delete existing user from database
    - Server should answer with `status code` **204** if the record is found and deleted
    - Server should answer with `status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
    - Server should answer with `status code` **404** and corresponding message if record with `id === userId` doesn't exist