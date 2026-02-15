# API Documentation

## User Endpoints

### User Registration Endpoint

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

**User Login Endpoint**

### POST /user/login

Description:
- Authenticates an existing user using `email` and `password`.
- Returns an authentication token and the user object on success.

Request body (JSON):
- `email` (string, required) — must be a valid email address
- `password` (string, required)

Validation rules (as implemented):
- `body('email').isEmail()` — returns 400 with validation errors if invalid
- `body('password').notEmpty()` — returns 400 if password is missing

Responses and status codes:
- `200 OK` — login successful. Response body includes `token` and `user` object.
- `400 Bad Request` — validation errors (returns `errors` array).
- `401 Unauthorized` — invalid credentials (returns `{ message: "Invalid email or password" }`).
- `500 Internal Server Error` — unexpected server error.

Example request (curl):

```
curl -X POST http://localhost:3000/user/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "alice@example.com",
    "password": "s3cureP@ss"
  }'
```

Example success response (200):

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

Example invalid-credentials response (401):

```json
{ "message": "Invalid email or password" }
```

## GET /user/profile

Description:
- Returns the authenticated user's profile object.

Authentication:
- Requires `authMiddleware`.
- Provide the JWT either in a cookie named `token` (used by this app) or in the `Authorization` header as `Bearer <token>`.

Responses and status codes:
- `200 OK` — returns the authenticated user object (JSON).
- `401 Unauthorized` — when token is missing, invalid, or expired.

Example success response (200):

```json
{
  "_id": "6412f1e5...",
  "fullname": { "firstname": "Alice", "lastname": "Doe" },
  "email": "alice@example.com",
  "socketId": null
}
```

---

## GET /user/logout

Description:
- Logs the user out by removing the `token` cookie (sets it to expired) and adding the token to a blacklist so it cannot be reused.

Authentication:
- Requires `authMiddleware`. The token to blacklist is read from the cookie or the `Authorization` header.

Responses and status codes:
- `200 OK` — logout successful. Response body: `{ "message": "Logged out successfully" }`.
- `401 Unauthorized` — when token is missing or invalid.

Notes:
- The logout implementation stores blacklisted tokens in `models/blacklistToken.model.js`. Ensure the blacklist is consulted during auth checks if relying on token invalidation.

---

## Captain Endpoints

### Captain Registration Endpoint

Endpoint: `POST /captain/register`

Description:
- Registers a new captain with `fullname`, `email`, `password`, `vehicle`, and `location`.
- Validates input and returns an authentication token and created captain on success.

Request body (JSON):
- `fullname` (object):
  - `firstname` (string, required) — minimum 3 characters
  - `lastname` (string, optional)
- `email` (string, required) — must be a valid email address
- `password` (string, required) — minimum 6 characters
- `vehicle` (object):
  - `color` (string, required) — minimum 3 characters
  - `plate` (string, required) — minimum 3 characters
  - `capacity` (number, required) — minimum 1
  - `vehicleType` (string, required) — must be "Car", "Motorcycle", or "Auto"
- `location` (object) — coordinates for captain's current location

Responses and status codes:
- `201 Created` — captain created successfully. Response body includes `token` and `captain` object.
- `400 Bad Request` — validation errors or if captain already exists.
- `500 Internal Server Error` — unexpected server error.

Example request (curl):

```
curl -X POST http://localhost:3000/captain/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": { "firstname": "John", "lastname": "Smith" },
    "email": "john@example.com",
    "password": "s3cureP@ss",
    "vehicle": { "color": "Black", "plate": "ABC123", "capacity": 4, "vehicleType": "Car" },
    "location": { "lat": 0, "lng": 0 }
  }'
```

---

### Captain Login Endpoint

Endpoint: `POST /captain/login`

Description:
- Authenticates an existing captain using `email` and `password`.
- Returns an authentication token and the captain object on success.

Request body (JSON):
- `email` (string, required) — must be a valid email address
- `password` (string, required) — minimum 6 characters

Responses and status codes:
- `200 OK` — login successful. Response body includes `token` and `captain` object.
- `400 Bad Request` — validation errors.
- `401 Unauthorized` — invalid credentials.
- `500 Internal Server Error` — unexpected server error.

Example request (curl):

```
curl -X POST http://localhost:3000/captain/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "s3cureP@ss"
  }'
```

---

### GET /captain/profile

Description:
- Returns the authenticated captain's profile object.

Authentication:
- Requires `authMiddleware.authCaptain`.
- Provide the JWT either in a cookie named `token` or in the `Authorization` header as `Bearer <token>`.

Responses and status codes:
- `200 OK` — returns the authenticated captain object (JSON).
- `401 Unauthorized` — when token is missing, invalid, or expired.

---

### GET /captain/logout

Description:
- Logs the captain out by removing the `token` cookie and adding the token to a blacklist.

Authentication:
- Requires `authMiddleware.authCaptain`.

Responses and status codes:
- `200 OK` — logout successful. Response body: `{ "message": "Logged out successfully" }`.
- `401 Unauthorized` — when token is missing or invalid.

Notes:
- The logout implementation stores blacklisted tokens in `models/blacklistToken.model.js`.
