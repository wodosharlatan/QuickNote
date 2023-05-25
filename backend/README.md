# Backend Documentation

## Introduction

This Node.js server provides an API for a user authentication system and an entry management system. It uses the Express framework to handle HTTP requests and MongoDB as the database for storing user and entry data.

### Prerequisites

Before running the server, make sure you have `Node.js` installed:

## Installation

Follow these steps to set up and run the server:

1. Clone the repository or download the backend code to your local machine.
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

## API Endpoints

The server provides the following API endpoints:

### Get all users

- **Endpoint**: `/users`
- **Method**: `POST`
- **Description**: Retrieves information about all users.
- **Request Body**:
  - `token` (string, required): Token for authentication as an admin user.
- **Response**:

  - If authentication fails:

    ```json
    {
    	"message": "Unauthorized"
    }
    ```

  - If authentication succeeds:

    ```json
    [
    	{
    		"Username": "username",
    		"IsAdmin": true,
    		"LastLogin": "2023-05-24T10:30:00.000Z",
    		"FirstTimeLogin": false
    	},
    	{
    		"Username": "anotheruser",
    		"IsAdmin": false,
    		"LastLogin": "2023-05-23T15:45:00.000Z",
    		"FirstTimeLogin": true
    	},
    	{
    		"and so on": "...."
    	}
    ]
    ```

### Get a Specific User by Username

- **Endpoint**: `/users/specific`
- **Method**: `POST`
- **Description**: Retrieves information about a specific user based on their username.
- **Request Body**:
  - `token` (string, required): Token for authentication as an admin user.
  - `username` (string, required): Username of the user to retrieve information for.
- **Response**:

  - If authentication fails:

    ```json
    {
    	"message": "Unauthorized"
    }
    ```

  - If authentication succeeds and the user is found:

    ```json
    {
    	"Username": "username",
    	"IsAdmin": true,
    	"LastLogin": "2023-05-24T10:30:00.000Z",
    	"FirstTimeLogin": false
    }
    ```

  - If authentication succeeds but the user is not found:

    ```json
    {
    	"message": "User not found"
    }
    ```
