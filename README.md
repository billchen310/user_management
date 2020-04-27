This project consists of frontend UI, backend server and in memory DB.
It allows admin users to manage the groups and users and normal users to view the groups and users.

## Technology Stacks:

### Frontend
React JS (v16), Redux, React-router-dom, HTML, SASS, Webpack

### Backend
Node JS (v12), Express JS

### DB
In memory DB constructed by JSON list

## demo:
A production instance has been deployed to AWS for the demonstration:
http://user-management-ui.s3-website-ap-southeast-2.amazonaws.com/

## Prerequisites
Node JS v12 has to be installed on OS.
Before running or building, use "npm install" to install all dependencies for both UI and Server projects.

## Available Scripts

### Backend
Use "npm run start" to launch the Node server:
http://localhost:3000

### Frontend
Use "npm run start" to start the frontend UI under development mode:
http://localhost:8080

Use "npm run build" to build the package for production deployment

## Default user
2 default users have been put in the in memory DB:

(1), username: "admin", password: "admin" -> administrator

(2), username: "user1", password: "123456" -> normal user

So login is available for above users





