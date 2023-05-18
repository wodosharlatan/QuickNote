# Backend Documentation

This documentation provides an overview and usage guide for the backend application. It covers the API endpoints, configuration, and deployment instructions.

## Table of Contents

- [API Endpoints](#api-endpoints)
- [Configuration](#configuration)
- [Deployment](#deployment)

## API Endpoints

### Users

#### Create a User

- **Endpoint:** `/users`
- **Method:** `POST`
- **Request Body:**
  - `username` (string, required): The username of the user.
- **Response:**
  - `id` (string): The unique ID of the created user.
  - `username` (string): The username of the created user.
  - `password` (string): Password of the created user.
  - `IsAdmin` (bool): The admin privileges (default is false). 
  - `FirstTimeLogin` (bool): Returns true if user never logged in,
  - `LastLogin` (date): Unix timestamp
  - `MongoDBSystemInfo` (string): More information about the object
- **Example:**
```Json
    {
        "Username": "Tom",
        "Password": "gxgmgmpm",
        "ID": "7",
        "IsAdmin": false,
        "FirstTimeLogin": true,
        "LastLogin": "2023-05-18T07:19:36.103Z",
        "_id": "6465d2dab1dda60f48ef10e3",
        "__v": 0
    }
```


#### Get All Users

- **Endpoint:** `/users`
- **Method:** `GET`
- **Response:**
  - Array of user objects, each containing:
    - `id` (string): The unique ID of the created user.
  - `username` (string): The username of the created user.
  - `password` (string): Password of the created user.
  - `IsAdmin` (bool): The admin privileges (default is false). 
  - `FirstTimeLogin` (bool): Returns true if user never logged in,
  - `LastLogin` (date): Unix timestamp
  - `MongoDBSystemInfo` (string): More information about the object
- **Example:**
```JSON
[
    {
        "_id": "6465cb22c902ff58c9caf692",
        "Username": "Hello",
        "Password": "gxgmgmpm",
        "ID": "7",
        "IsAdmin": false,
        "FirstTimeLogin": true,
        "LastLogin": "2023-05-18T06:52:04.654Z",
        "__v": 0
    },
    {
        "_id": "6465cb27c902ff58c9caf695",
        "Username": "World",
        "Password": "p721nvw0",
        "ID": "1",
        "IsAdmin": false,
        "FirstTimeLogin": true,
        "LastLogin": "2023-05-18T06:52:04.654Z",
        "__v": 0
    }
]
```

#### Get a User by ID

- **Endpoint:** `/users/{id}`
- **Method:** `GET`
- **Response:**
  - `id` (string): The unique ID of the created user.
  - `username` (string): The username of the created user.
  - `password` (string): Password of the created user.
  - `IsAdmin` (bool): The admin privileges (default is false). 
  - `FirstTimeLogin` (bool): Returns true if user never logged in,
  - `LastLogin` (date): Unix timestamp
  - `MongoDBSystemInfo` (string): More information about the object
- **Example:**
```Json
    {
        "Username": "Jhon Doe",
        "Password": "gxgmgmpm",
        "ID": "125",
        "IsAdmin": true,
        "FirstTimeLogin": false,
        "LastLogin": "2038-05-18T07:19:36.103Z",
        "_id": "6465d2dab1dda60f48ef10e3",
        "__v": 0
    }
```


#### Update User Password

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



#### Delete a User

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

#### Authenticate User

- **Endpoint:** `/login`
- **Method:** `POST`
- **Request Body:**
  - `username` (string, required): The username of the user.
  - `password` (string, required): The password of the user.
- **Response:**
  - `id` (string): The unique ID of the created user.
  - `username` (string): The username of the created user.
  - `password` (string): Password of the created user.
  - `IsAdmin` (bool): The admin privileges (default is false). 
  - `FirstTimeLogin` (bool): Returns true if user never logged in,
  - `LastLogin` (date): Unix timestamp
  - `MongoDBSystemInfo` (string): More information about the object
- **Example:**
```Json
    {
        "Username": "Jhon Doe",
        "Password": "gxgmgmpm",
        "ID": "6",
        "IsAdmin": false,
        "FirstTimeLogin": true,
        "LastLogin": "2038-05-18T07:19:36.103Z",
        "_id": "6465d2dab1dda60f48ef10e3",
        "__v": 0
    }
```
