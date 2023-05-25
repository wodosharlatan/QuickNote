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
  PORT = <Your backend port>
  HOST = <Your backend host>
  DB_CONNECTION = <MongoDB connection string>
  ADMIN_USERNAME = <Admin username>
  ADMIN_PASSWORD = <Admin password>
```

5. Start The Backend server by running the following command:

```shell
  npm start
```

The server should now be running and listening for incoming requests.

## API Endpoints

The server provides the following API endpoints:


- [Get all users](#get-all-users)
- [Get a Specific User by Username](#get-a-specific-user-by-username)
- [Make User Admin](#make-user-admin)
- [Delete a Specific User by Username](#delete-a-specific-user-by-username)
- [Change Password for a Specific User by Token](#change-password-for-a-specific-user-by-token)
- [Make New User](#make-new-user)
- [Logout: Delete Token for a Specific User by Token](#logout-delete-token-for-a-specific-user-by-token)
- [Login: Authenticate User and Generate Token](#login-authenticate-user-and-generate-token)
- [Create New Entry](#create-new-entry)
- [Delete Entry by ID](#delete-entry-by-id)
- [Get Entry by ID](#get-entry-by-id)
- [Get all public entries](#get-all-public-entries)
- [Get all private entries](#get-all-private-entries)

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

### Logout: Delete Token for a Specific User by Token

- **Endpoint**: `/logout`
- **Method**: `POST`
- **Description**: Deletes the token for a specific user based on their authentication token, effectively logging them out.
- **Request Body**:
  - `token` (string, required): Token for user authentication.
- **Response**:

  - If authentication fails:

    ```json
    {
    	"message": "Unauthorized"
    }
    ```

  - If authentication succeeds and the token is deleted:

    ```json
    {
    	"message": "Logged out! Token Deleted"
    }
    ```

### Login: Authenticate User and Generate Token

- **Endpoint**: `/login`
- **Method**: `POST`
- **Description**: Authenticates a user by their username and password, generates a token for authentication, and returns the token along with user details.
- **Request Body**:
  - `username` (string, required): Username of the user.
  - `password` (string, required): Password of the user.
- **Response**:

  - If the username or password is invalid:

    ```json
    {
    	"message": "Invalid username or password"
    }
    ```

  - If the authentication succeeds and the token is generated:

    ```json
    {
    	"Token": "<generated_token>",
    	"IsAdmin": true,
    	"FirstTimeLogin": true
    }
    ```

### Create New Entry

- **Endpoint**: `/new-entry`
- **Method**: `POST`
- **Description**: Creates a new entry with the provided details.
- **Request Body**:
  - `token` (string, required): Token for authentication as a user.
  - `deadline` (string, required): Deadline for the entry in the format "dd.mm.yyyy".
  - `urgency` (number, required): Urgency level of the entry (1, 2, or 3).
  - `title` (string, required): Title of the entry.
  - `text` (string, required): Text content of the entry.
  - `ispublic` (boolean, optional): Indicates whether the entry is public or not.
- **Response**:

  - If the authentication fails:

    ```json
    {
    	"message": "Unauthorized"
    }
    ```

  - If the validation fails for the entry fields:

    ```json
    {
    	"message": "<validation_error_message>"
    }
    ```

  - If the entry is successfully created:

    ```json
    {
    	"message": "Entry successfully created"
    }
    ```

### Delete Entry by ID

- **Endpoint**: `/delete-entry/:ID`
- **Method**: `POST`
- **Description**: Deletes an entry based on its ID.
- **Request Body**:
  - `token` (string, required): Token for authentication as a user.
- **URL Parameter**:
  - `ID` (string, required): ID of the entry to delete.
- **Response**:

  - If the authentication fails:

    ```json
    {
    	"message": "Unauthorized"
    }
    ```

  - If the entry is not found:

    ```json
    {
    	"message": "Entry not found"
    }
    ```

  - If the user is not authorized to delete the entry:

    ```json
    {
    	"message": "Not authorized to delete this entry"
    }
    ```

  - If the entry is successfully deleted:

    ```json
    {
    	"message": "Entry deleted!"
    }
    ```

### Get Entry by ID

- **Endpoint**: `/entries/:ID`
- **Method**: `POST`
- **Description**: Retrieves an entry by its ID.
- **Request Body**:
  - `token` (string, required): Token for authentication as a user.
- **URL Parameter**:
  - `ID` (string, required): ID of the entry.
- **Response**:

- If the entry is private and doesn't belong to the user:

  ```json
  {
  	"message": "Entry is Private And Doesn't Belong to you"
  }
  ```

- If the authentication fails:

  ```JSON
  {
    "message": "Unauthorized"
  }
  ```

- If the authentication succeeds and the entry is found:

  ```JSON

  {
    "ID": "entry_id",
    "Urgency": "entry_urgency",
    "DeadLine": "entry_deadline",
    "Title": "entry_title",
    "Text": "entry_text",
    "IsPublic": "entry_is_public",
    "AddedBy": "entry_added_by"
  }

  ```

### Get all public entries

- **Endpoint**: `/entries`
- **Method**: `POST`
- **Description**: Retrieves public all entries.
- **Request Body**:
  - `token` (string, required): Token for authentication as a user.
- **Response**:

  - If the authentication fails:

    ```json
    {
    	"message": "Unauthorized"
    }
    ```

  - If the authentication succeeds and the entries are found:

    ```json
    {
    	"ID": 12,
    	"Urgency": 3,
    	"DeadLine": "25.6.3045",
    	"Title": "Some title",
    	"Text": "Some text within the entry",
    	"IsPublic": true,
    	"AddedBy": "user"
    }
    ```


### Get all private entries

- **Endpoint**: `/entries/private`
- **Method**: `POST`
- **Description**: Retrieves public private entries that belongs to user associated with the token.
- **Request Body**:
  - `token` (string, required): Token for authentication as a user.
- **Response**:

  - If the authentication fails:

    ```json
    {
    	"message": "Unauthorized"
    }
    ```

  - If the authentication succeeds and the entries are found:

    ```json
    {
    	"ID": 71,
    	"Urgency": 32,
    	"DeadLine": "2.7.2048",
    	"Title": "Some title",
    	"Text": "Some text within the entry",
    	"IsPublic": false,
    	"AddedBy": "another user"
    }
    ```

