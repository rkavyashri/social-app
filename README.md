# Welcome to Social Application

A Social Application which has following functionalities

- User can signup and login
- User can create topic and create a multiple posts
- Other user can comment on any post

## Requirements
The project requires [Node v10](https://nodejs.org/).
## Users

- User signup. Once signup is success, (s)he will get a welcome email on
his email.
- On login, use validation and only return required data.
- Use Authentication for authorized route.

Create Topic (Authorized)
- Create post under topic (Authorized)(Can upload multiple images)
- Comment on any post by any user(Authorized)
- List topics (Authorized) (With Pagination)
- List Posts including comments(Authorized)(With Pagination)

## Useful Node commands

The project makes use of node and its package manager to help you out carrying some common tasks such as building the project or running it.

### Install dependencies

```console
$ npm install
```

### Build the Project

  ```console
  $ npm run build
  ```

### Run the application

Run the application which will be listening on port `3000`. 

- Run the application with the current code

  ```console
  $ npm start
  ```
## API

Below is a list of API endpoints with their respective input and output. 

### User Login

Endpoint

```text
POST /v1/login
```

Example of body

```json
{
	"username":"kavya",
	"password":"kavya"
}
```

Example output

```json
{ "authenticated": true }
```

