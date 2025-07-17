# POST /user/register

Registers a new user.

## Endpoint

```
POST /user/register
```

## Request Body

Send a JSON object with the following fields:

| Field    | Type   | Required | Description                  |
|----------|--------|----------|------------------------------|
| name     | String | Yes      | User's full name (min 3 chars) |
| email    | String | Yes      | User's email (must be valid) |
| password | String | Yes      | User's password (min 6 chars)|

### Example

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

## Responses

### Success (201 Created)

```json
{
  "msg": "User registered successfully",
  "user": {
    "_id": "60f7c2b5e1d3c2a1b8e4d123",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2025-07-17T12:34:56.789Z",
    "updatedAt": "2025-07-17T12:34:56.789Z",
    "__v": 0
  },
  "token": "<JWT_TOKEN>"
}
```

- A `token` cookie is also set (HTTP-only).

### Validation Error (400 Bad Request)

```json
{
  "errors": [
    {
      "msg": "Email is required",
      "param": "email",
      "location": "body"
    }
  ]
}
```

### User Already Exists (400 Bad Request)

```json
{
  "errors": [
    {
      "msg": "User already exists with this email"
    }
  ]
}
```

## Notes

- The `token` is a JWT for authentication.
- The password is securely hashed before storage.
- The endpoint expects `Content-Type: application/json`.