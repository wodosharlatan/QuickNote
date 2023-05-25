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

### Make User Admin

- **Endpoint**: `/users/set-admin`
- **Method**: `POST`
- **Description**: Grants admin privileges to a user.
- **Request Body**:
  - `token` (string, required): Token for authentication as an admin user.
  - `username` (string, required): Username of the user to grant admin privileges to.
- **Response**:

  - If authentication fails:

    ```json
    {
    	"message": "Unauthorized"
    }
    ```

  - If authentication succeeds and the user is updated:

    ```json
    {
    	"message": "Admin privileges granted!"
    }
    ```

### Delete a Specific User by Username

- **Endpoint**: `/users/delete`
- **Method**: `POST`
- **Description**: Deletes a specific user based on their username.
- **Request Body**:
  - `token` (string, required): Token for authentication as an admin user.
  - `username` (string, required): Username of the user to delete.
- **Response**:

  - If authentication fails:

    ```json
    {
    	"message": "Unauthorized"
    }
    ```

  - If authentication succeeds and the user is deleted:

    ```json
    {
    	"message": "User deleted!"
    }
    ```

### Change Password for a Specific User by Token

- **Endpoint**: `/tokens/change-password`
- **Method**: `POST`
- **Description**: Changes the password for a specific user based on their token.
- **Request Body**:
  - `token` (string, required): Token for user authentication.
  - `password` (string, required): New password for the user.
- **Response**:

  - If authentication fails:

    ```json
    {
    	"message": "Unauthorized"
    }
    ```

  - If authentication succeeds and the password is changed:

    ```json
    {
    	"message": "Password changed!"
    }
    ```

### Make New User

- **Endpoint**: `/new-user`
- **Method**: `POST`
- **Description**: Creates a new user with a temporary password.
- **Request Body**:
  - `token` (string, required): Token for authentication as an admin user.
  - `username` (string, required): Username for the new user.
- **Response**:

  - If authentication fails:

    ```json
    {
    	"message": "Unauthorized"
    }
    ```

  - If the username already exists:

    ```json
    {
    	"message": "Username already exists!"
    }
    ```

  - If the user is created successfully:

    ```json
    {
    	"message": "User created with temporary password: <temporary_password>"
    }
    ```
