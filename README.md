## CRM App backend
### (Customer relationship management)
- In this application customer should be able to raise the issue and track it .

### Features
- User Registration and Login himself
- Admin registration will be from the backend directly. No API support for the ADMIN user creation
- Engineer registration will be supported through API, but it needs to be approved by the ADMIN

- Customer registration will be supported through API with no approval needed from the ADMIN
- API to support the ADMIN login. Login API call should return the access token, which will be used to make all the other calls
- API to support the CUSTOMER login. Login API call should return the access token, which will be used to make all the other calls

- API to support the ENGINEER login. Login API call should return the access token, which will be used to make all the other calls.
- Login API will succeed only if the ENGINEER registration request has been approved by the ADMIN.

- Proper error message in the case ADMIN has yet not approved/rejected the registration request
- Proper validation if User Post empty request.

### How is the code organized in this repo ?
The whole repo is divided into multiple branches. Each branch contains code for a specific concept. For example session1 has the code base for user registration and login . Each branch is built on the top of the previous branch

### Prerequisite
- Understanding of Node.js
- Understanding of Async Await
- Mongo DB locally installed and running

## 🛠 Tech
- **Client   :** Post-man,
- **Server   :** Node, Express, JWT, node-rest-client, JWT, bcryptjs
- **Database :** mongoDB
- This app. requires Node.js v14+ to run.

### Install the dependencies and devDependencies and start the server.
Before starting the server please ensure mongodb server is locally installed and running on the default port

```bash
  cd crm
```
```bash
  npm install
```

## REST endpoints
### Customer 
- Signup 
``` 
localhost:8081/crm/app/v1/auth/signup
Sample request body :
{
        "name" : "Ram kumar",
        "userId" : "ram1",
        "email" : "ram@gmail.com",
        "password" : "welcom@A7",
        "userType" : "CUSTOMER"
}
Sample response body :
{
    "name": "Ram kumar",
    "userId": "ram1",
    "email": "ram@gmail.com",
    "userType": "CUSTOMER",
    "userStatus": "APPROVED"
}
```
- Signin 
```
localhost:8081/crm/app/v1/auth/signin
Sample request body :
{
    "email" : "ram@gmail.com",
    "password" : "welcom@A7"
}
Sample response body :
{
    "message": "Welcome Ram kumar",
    "userId": "ram1",
    "userType": "CUSTOMER",
    "AccessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InJhbTEiLCJpYXQiOjE2NTk2MDE2NTEsImV4cCI6MTY1OTYwMTg1MX0.CXhGnfBTmYE-0vG11Wzyf-oqDGodmW0IwR9cQh7gO84"
}
```
### Engineer 
- Signup 
``` 
localhost:8081/crm/app/v1/auth/signup
Sample request body :
{
        "name" : "Hanuman Singh",
        "userId" : "hanuman07",
        "email" : "hanuman07@gmail.com",
        "password" : "welcom@A7",
        "userType" : "ENGINEER"
}
Sample response body :
{
    "name": "Hanuman Singh",
    "userId": "hanuman07",
    "email": "hanuman07@gmail.com",
    "userType": "ENGINEER",
    "userStatus": "PENDING"
}
```
- Signin 
```
localhost:8081/crm/app/v1/auth/signin
Sample request body :
{
   "email" : "hanuman07@gmail.com",
    "password" : "welcom@A7"
}
Sample response body :
{
    "message": "You are not approved for login"
}
```
-> When ADMIN APPROVED Engineer then he can login
Admin update userStatus with AccessToken
```
localhost:8081/crm/app/v1/auth/users/hanuman07
{
    "name": "Hanuman Singh",
    "userId": "hanuman07",
    "email": "hanuman07@gmail.com",
    "userType": "ENGINEER",
    "userStatus": "APPROVED"
}
```
### Ticket
Pass accessToken in header
```
localhost:8081/crm/api/v1/tickets
Sample request body :
{
    "title" : " bad product ",
    "description" : " i want to return by headphone "
}
Sample response body :
{
    "title": " bad product ",
    "ticketPriority": 4,
    "description": " i want to return by headphone ",
    "status": "OPEN",
    "reporter": "ram1",
    "assignee": "hanuman07",
    "_id": "62eb886d584bef13120046c0",
    "createdAt": "2022-08-04T08:50:53.058Z",
    "updatedAt": "2022-08-04T08:50:53.058Z"
}
```
## Development
Want to improve? Great! Make the changes and raise a PR. Reach out to me over 98.derin@gmail.com
