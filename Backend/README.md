# User Registration Endpoint

Endpoint: `POST /user/register`

Description:
- Registers a new user with `fullname`, `email`, and `password`.
- Validates input and returns an authentication token and created user on success.

Request body (JSON):
- `fullname` (object):
  - `firstname` (string, required) — minimum 3 characters
  - `lastname` (string, optional) — minimum 3 characters if provided
- `email` (string, required) — must be a valid email address
- `password` (string, required) — minimum 6 characters

Validation rules (as implemented):
- `body('email').isEmail()` — returns 400 with validation errors if invalid
- `body('fullname.firstname').isLength({ min: 3 })` — returns 400 if too short
- `body('password').isLength({ min: 6 })` — returns 400 if too short

Responses and status codes:
- `201 Created` — user created successfully. Response body includes `token` and `user` object.
- `400 Bad Request` — validation errors (returns `errors` array) or if user already exists (message: "User already exist").
- `500 Internal Server Error` — unexpected server error.

Example request (curl):

```
curl -X POST http://localhost:3000/user/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": { "firstname": "Alice", "lastname": "Doe" },
    "email": "alice@example.com",
    "password": "s3cureP@ss"
  }'
```

Example success response (201):

```json
{
  "token": "<jwt_token_here>",
  "user": {
    "_id": "6412f1e5...",
    "fullname": { "firstname": "Alice", "lastname": "Doe" },
    "email": "alice@example.com",
    "socketId": null
  }
}
```

Example validation error response (400):

```json
{
  "errors": [
    { "msg": "Invalid Email", "param": "email", "location": "body" },
    { "msg": "First name must be at least 3 characters long", "param": "fullname.firstname", "location": "body" }
  ]
}
```

Example user-exists response (400):

```json
{ "message": "User already exist" }
```

Notes:
- The route's validators are defined in `routes/user.routes.js` and the controller logic is in `controllers/user.controller.js`.
- Ensure `JWT_SECRET` is set in the environment for tokens to be generated.
