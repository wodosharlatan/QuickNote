# Backend Documentation

This documentation provides an overview and usage guide for the backend application. It covers the API endpoints and instructions.

## API Endpoints

## Users

### Create a User

- **Endpoint:** `/users`
- **Method:** `POST`
- **Request Body:**
- `username` (string, required): The username of the user.
- **Response:** 
-`message`: Contains information if the action was successful or not
- **Example:**

```Json
  {
    "message": "User created with temporary password: A6VbzvLwHVZFW3c46MiEXo."
  }
```

### Get All Users

- **Endpoint:** `/users`
- **Method:** `GET`
- **Response:**
  - Array of user objects, each containing:
  - `username` (string): The username of the created user.
  - `IsAdmin` (bool): The admin privileges (default is false).
  - `LastLogin` (date): Unix timestamp
  - `FirstTimeLogin` (bool): Returns true if user never logged in,
  - `UserToken` (string): A token used for verification of the user (default is empty string).
- **Example:**

```JSON
[
    {
        "Username": "blob",
        "IsAdmin": false,
        "LastLogin": "2023-05-19T09:14:42.494Z",
        "FirstTimeLogin": true,
        "UserToken": ""
    },
    {
        "Username": "ben",
        "IsAdmin": false,
        "LastLogin": "2023-05-19T10:47:33.965Z",
        "FirstTimeLogin": true,
        "UserToken": "UW1qMMqkTD4wjLskbVu8B9"
    }
]
```

### Get a User by Username

- **Endpoint:** `/users/{Username}`
- **Method:** `GET`
- **Response:**
  - `username` (string): The username of the created user.
  - `IsAdmin` (bool): The admin privileges (default is false).
  - `LastLogin` (date): Unix timestamp
  - `FirstTimeLogin` (bool): Returns true if user never logged in,
  - `UserToken` (string): A token used for verification of the user (default is empty string).
- **Example:**

```Json
  {
    "Username": "ben",
    "IsAdmin": false,
    "LastLogin": "2023-05-19T10:47:33.965Z",
    "FirstTimeLogin": true,
    "UserToken": "UW1qMMqkTD4wjLskbVu8B9"
  }
```

### Update User Password

- **Endpoint:** `/users/{id}`
- **Method:** `PATCH`
- **Request Body:**
  - `password` (string, required): The new password for the user.
- **Response:**
  - `MongoDBSystemInfo` (string): Information about the action
- **Example:**

```JSON
{
    "acknowledged": true,
    "modifiedCount": 1,
    "upsertedId": null,
    "upsertedCount": 0,
    "matchedCount": 1
}
```

### Delete a User

- **Endpoint:** `/users/{id}`
- **Method:** `DELETE`
- **Response:**
  - `MongoDBSystemInfo` (string): Information about the action
- **Example:**

```JSON
{
    "acknowledged": true,
    "deletedCount": 1
}
```

## Login

### Authenticate User

- **Endpoint:** `/login`
- **Method:** `POST`
- **Request Body:**
  - `username` (string, required): The username of the user.
  - `password` (string, required): The password of the user.
- **Response:**
  - `IsAdmin` (bool): The admin privileges (default is false).
  - `FirstTimeLogin` (bool): in this case it is called `ShouldChangePassword` ,
  - `UserToken` (string): A token used for verification of the user (default is empty string).
- **Example:**

```Json
  {
    "token": "5j6TBd4GhvJBkiPNwBoKrr",
    "isAdmin": "false",
    "ShouldChangePassword": "true"
  }
```
