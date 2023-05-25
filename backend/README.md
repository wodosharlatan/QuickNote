## Server Documentation

### Introduction

This Node.js server provides an API for a user authentication system and an entry management system. It uses the Express framework to handle HTTP requests and MongoDB as the database for storing user and entry data.

### Prerequisites

Before running the server, make sure you have the following prerequisites installed:

- Node.js
- MongoDB

### Installation

Follow these steps to set up and run the server:

1. Clone the repository or download the server code to your local machine.
2. Open a terminal and navigate to the project directory.
3. Install the required dependencies by running the following command:

```shell
  npm install
```

4. Create a `.env` file in the project root directory and provide the necessary environment variables. Here's an example of the required variables:

```.env
  DB_CONNECTION=<MongoDB connection string>
  PORT=<Server port number>
  HOST=<Server hostname>
```

5. Start The Backend server by running the following command:

```shell
  npm start
```
The server should now be running and listening for incoming requests.


### API Endpoints
The server provides the following API endpoints:

#### User Authentication System
- `POST /login`: User login. Requires a JSON payload with the user's credentials (username and password). Returns a JSON response with a token if the login is successful.
- `POST /new-user`: User registration. Requires a JSON payload with the user's credentials (username and password). Returns a JSON response with a success message if the registration is successful.
- `POST /logout`: User logout. Requires a JSON payload with the user's token. Returns a JSON response with a success message if the logout is successful.
- `GET /tokens`: Get all user tokens. Returns a JSON response with an array of user tokens.

#### Entry Management System
- `POST /new-entry`: Create a new entry. Requires a JSON payload with the entry details. Returns a JSON response with the created entry if successful.
- `DELETE /delete-entry`: Delete an entry. Requires a JSON payload with the entry details. Returns a JSON response with a success message if the deletion is successful.
- `GET /entries`: Get all entries. Returns a JSON response with an array of entries.
