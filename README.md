# Student Management REST API

A Node.js Express server that provides a complete REST API for managing student records with CRUD operations (Create, Read, Update, Delete).

## Features

- ✅ Get all students
- ✅ Get a student by ID
- ✅ Create a new student
- ✅ Update an existing student
- ✅ Delete a student
- ✅ CORS enabled for cross-origin requests
- ✅ Hot-reload with Nodemon for development
- ✅ Request body validation (required fields, types, formats)
- ✅ Password validation (required on POST, min 6 chars, optional on PUT)
- ✅ bcrypt password hashing before storage (cost factor 10)
- ✅ Protection against double-hashing already-hashed passwords
- ✅ Duplicate ID and email detection on creation (409 Conflict)
- ✅ Malformed JSON handled gracefully (400 instead of server crash)
- ✅ Full data persistence — POST, PUT, and DELETE all write to students.json
- ✅ PUT validates the body the same way POST does (via shared middleware)
- ✅ JWT issued on register (POST /students) and login (POST /login)
- ✅ Protected routes — GET /:id, PUT, DELETE require a valid Bearer token
- ✅ DTO responses — only `id` and `email` are ever sent back to the client
- ✅ Environment variables via dotenv (.env never committed)

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express 5.2.1
- **Middleware:** CORS 2.8.6
- **Password Hashing:** bcrypt 6.0.0
- **Authentication:** jsonwebtoken 9.0.3
- **Environment:** dotenv 17.4.2
- **Dev Tool:** Nodemon 3.1.14
- **Data Format:** JSON

## Project Structure

```
ServerJs/
├── BACK/                    # Backend server code
│   ├── index.js            # Main Express server with all API endpoints
│   ├── package.json        # Project dependencies and scripts
│   ├── package-lock.json   # Dependency lock file
│   ├── students.json       # Sample student data
│   ├── student_report.md   # Generated student report
│   ├── .env                # JWT_SECRET and JWT_EXPIRES_IN (never committed)
│   ├── controllers/        # Route controller logic
│   │   ├── studentsController.js
│   │   └── authController.js   # Login logic
│   ├── middleware/         # Request validation and error handling
│   │   ├── validation.js   # Body/param validation + JSON error handler
│   │   ├── hashPassword.js # bcrypt hashing middleware
│   │   └── auth.js         # JWT Bearer token verification
│   ├── routes/             # Route definitions
│   │   ├── students.js
│   │   └── auth.js         # POST /login
│   └── services/           # Business logic services
│       └── studentsServices.js
├── FONT/                   # Frontend files (HTML, CSS, JS)
│   ├── index.html         # Main HTML file
│   ├── script.js          # Frontend API integration
│   └── style.css          # Styling
├── README.md              # This file
├── package.json           # Root package configuration
└── serverSideJs/          # Submodule/additional server code
```

## Installation

### Backend Setup

1. **Navigate to the BACK folder:**
```bash
cd BACK
```

2. **Install dependencies:**
```bash
npm install
```

3. **Create a `.env` file in the `BACK/` folder:**
```
JWT_SECRET=your_super_secret_key_change_this
JWT_EXPIRES_IN=24h
```

4. **Start the development server:**
```bash
npm run dev
```

The server will start on `http://localhost:3000/` with hot-reload enabled via Nodemon.

### Frontend Setup

1. Open `FONT/index.html` in your browser
2. The frontend will automatically connect to the API at `http://localhost:3000/students`
3. Make sure the backend server is running before starting the frontend

## API Endpoints

### GET /
Returns a welcome message.

**Request:**
```
GET http://localhost:3000/
```

**Response:**
```json
{
  "msg": "Hello Willy! Your server is running..."
}
```

### GET /students
Retrieves all students.

**Request:**
```
GET http://localhost:3000/students
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "Alice Martin",
    "email": "alice.martin@epita.fr",
    "major": "Computer Science",
    "gpa": 3.8
  },
  ...
]
```

### GET /students/:id
Retrieves a specific student by ID.

**Request:**
```
GET http://localhost:3000/students/1
```

**Response (Success - 200):**
```json
{
  "id": 1,
  "name": "Alice Martin",
  "email": "alice.martin@epita.fr",
  "major": "Computer Science",
  "gpa": 3.8
}
```

**Response (Not Found - 404):**
```json
{
  "error": "❌❌ Student was not found"
}
```

### POST /students
Creates a new student.

**Request:**
```
POST http://localhost:3000/students
Content-Type: application/json

{
  "name": "David Chen",
  "email": "david.chen@epita.fr",
  "password": "secret123",
  "major": "Computer Science",
  "gpa": 3.7
}
```

**Response (201):**
```json
{
  "msg": "✅ Student created successfully",
  "student": {
    "id": 7,
    "name": "David Chen",
    "email": "david.chen@epita.fr",
    "password": "$2b$10$...",
    "major": "Computer Science",
    "gpa": 3.7
  }
}
```

**Response (400 - Missing or invalid field):**
```json
{ "error": "❌ 'gpa' must be a number between 0 and 4." }
```

**Response (400 - Malformed JSON):**
```json
{ "error": "❌ Invalid JSON in request body." }
```

**Response (409 - Duplicate ID or email):**
```json
{ "error": "❌ A student with this email already exists." }
```

### PUT /students/:id
Updates an existing student.

**Request:**
```
PUT http://localhost:3000/students/1
Content-Type: application/json

{
  "name": "Alice Martin",
  "email": "alice.martin@epita.fr",
  "major": "Data Science",
  "gpa": 3.9
}
```

> `password` is optional on PUT. If provided it must be at least 6 characters and will be hashed before saving.

**Response (Success - 200):**
```json
{
  "msg": "✅ Student updated successfully",
  "student": {
    "id": 1,
    "name": "Alice Martin",
    "email": "alice.martin@epita.fr",
    "major": "Data Science",
    "gpa": 3.9
  }
}
```

**Response (400 - Missing body or invalid field):**
```json
{ "error": "❌ Request body is missing or not valid JSON. Make sure to set Content-Type: application/json." }
```

**Response (404 - Not found):**
```json
{ "error": "❌❌ Student was not found" }
```

**Response (409 - Duplicate email):**
```json
{ "error": "❌ A student with this email already exists." }
```

### DELETE /students/:id
Deletes a student.

**Request:**
```
DELETE http://localhost:3000/students/1
```

**Response (Success - 200):**
```json
{ "msg": "✅ Student deleted successfully" }
```

**Response (Not Found - 404):**
```json
{ "error": "❌❌ Student was not found" }
```

## Usage Examples

### Using cURL

```bash
# Get all students
curl http://localhost:3000/students

# Get student by ID
curl http://localhost:3000/students/1

# Create a new student (password required)
curl -X POST http://localhost:3000/students \
  -H "Content-Type: application/json" \
  -d '{"name":"David","email":"david@epita.fr","password":"secret123","major":"CS","gpa":3.7}'

# Update a student (password optional)
curl -X PUT http://localhost:3000/students/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice","email":"alice@epita.fr","major":"DS","gpa":3.9}'

# Delete a student
curl -X DELETE http://localhost:3000/students/1
```

### Using Postman

1. Import the endpoints above into Postman
2. Use the request examples provided
3. Switch between GET, POST, PUT, DELETE methods as needed

## Available Scripts

Navigate to the `BACK/` folder to run these scripts:

```bash
# Run with Nodemon (development with hot-reload)
npm run dev

# Run with plain Node.js (EPITA project runner)
npm run epita
```

## Frontend

The frontend files are located in the `FONT/` folder at the root level. To use the API with the frontend:

1. Start the backend server: Navigate to `BACK/` folder and run `npm run dev`
2. Open `FONT/index.html` in your browser (or use a local server)
3. The frontend will automatically make requests to `http://localhost:3000/students`

**Important:** Make sure the backend server is running before accessing the frontend, as it relies on the API endpoints.

## Current Sample Data

The API comes with 6 sample students in `students.json`. All passwords are stored as bcrypt hashes:

1. **Alice Martin** - Computer Science, GPA: 3.8
2. **Bob builder** - Civil Engineering, GPA: 3.8
3. **Clara Rousseau** - Computer Science, GPA: 3.9
4. **David Moreau** - Computer Science, GPA: 3.5
5. **Danail Michev** - Electrical Engineering, GPA: 3.5
6. **Eve Dupuis** - Mechanical Engineering, GPA: 3.7

## Future Enhancements

- [x] Add request body validation
- [x] Password validation (required on POST, min 6 chars)
- [x] bcrypt password hashing before storage
- [x] Duplicate ID and email detection on POST
- [x] Graceful malformed JSON error handling
- [x] Implement PUT to actually update students.json
- [x] Implement DELETE to actually remove from students.json
- [ ] Replace students.json with a real database (MongoDB, PostgreSQL, etc.)
- [ ] Add student search/filter endpoints
- [ ] Add error logging
- [ ] Add authentication/authorization (JWT)
- [ ] Add API documentation with Swagger
- [ ] Hide password field from GET responses

## Project Architecture

### Code Organization

The project is organized with a **clear separation of concerns** between frontend and backend:

- **BACK/** - Backend REST API server (Node.js/Express)
  - `controllers/` - Handle HTTP requests and responses
  - `middleware/` - Validate request bodies/params and handle errors
  - `routes/` - Define API endpoints and map to controllers
  - `services/` - Contain business logic (data manipulation, validation)
  - `index.js` - Express app configuration and server initialization

- **FONT/** - Frontend client (HTML/CSS/JavaScript)
  - Communicates with the backend via HTTP requests
  - Displays student data in the UI

### Design Patterns Used

1. **MVC (Model-View-Controller)**: Backend separates concerns with controllers, routes, and services
2. **API-First**: Frontend consumes REST API independently
3. **Modular Structure**: Each layer has a single responsibility

## Notes

- POST, PUT, and DELETE all persist changes directly to `students.json` using `fs.readFileSync`/`writeFileSync` — no in-memory state, every read goes straight to the file
- CORS is enabled to allow requests from different origins
- Always set `Content-Type: application/json` on POST and PUT requests — without it, `express.json()` won't parse the body and the middleware will return a 400
- `validateStudentBody` is shared between POST and PUT — it skips the duplicate ID check on PUT since the student already exists, and skips the duplicate email check for the student's own current email
- Passwords are hashed with bcrypt (cost factor 10) before being written to `students.json` — plaintext passwords are never stored
- The `hashPassword` middleware detects already-hashed values (via bcrypt regex `$2b$...`) and skips them to prevent double-hashing on repeated PUT calls
- Malformed JSON (unparseable request body) is caught by `handleJsonParseError` and returns a clean 400 response instead of crashing to an HTML error page
- For production, replace `students.json` file storage with a proper database (MongoDB, PostgreSQL, etc.)

