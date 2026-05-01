# School Management REST API

A Node.js Express server providing a complete REST API for managing school resources — students, courses, professors, and rooms — with full CRUD operations, JWT authentication, and a unified JSON database.

## Features

- ✅ Full CRUD for students, courses, professors, and rooms
- ✅ Unified `db.json` — one file, six collections with relational links (foreign keys via IDs)
- ✅ JWT issued on register (POST /students) and login (POST /login)
- ✅ Protected routes — mutating endpoints require a valid Bearer token
- ✅ DTO responses — password never leaves the server
- ✅ Request body validation per resource (required fields, types, formats)
- ✅ Password validation (required on POST, min 6 chars, optional on PUT)
- ✅ bcrypt password hashing before storage (cost factor 10)
- ✅ Protection against double-hashing already-hashed passwords
- ✅ Course validation checks that professor_id and room_id exist in db.json
- ✅ Duplicate email detection for students and professors (409 Conflict)
- ✅ Malformed JSON handled gracefully (400 instead of server crash)
- ✅ CORS enabled for cross-origin requests
- ✅ Hot-reload with Nodemon for development
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
├── BACK/
│   ├── index.js                  # Entry point — mounts all routers
│   ├── db.json                   # Unified database (students, courses, professors, rooms, schools, enrollments)
│   ├── package.json
│   ├── .env                      # JWT_SECRET, JWT_EXPIRES_IN (never committed)
│   ├── controllers/
│   │   ├── studentsController.js
│   │   ├── coursesController.js
│   │   ├── professorsController.js
│   │   ├── roomsController.js
│   │   └── authController.js     # Login logic
│   ├── middleware/
│   │   ├── auth.js               # JWT Bearer token verification
│   │   ├── validation.js         # Student body/param validation + JSON error handler
│   │   ├── hashPassword.js       # bcrypt hashing
│   │   ├── courseValidation.js   # Course body/param validation
│   │   ├── professorValidation.js
│   │   └── roomValidation.js
│   ├── routes/
│   │   ├── students.js
│   │   ├── courses.js
│   │   ├── professors.js
│   │   ├── rooms.js
│   │   └── auth.js               # POST /login
│   └── services/
│       ├── studentsServices.js
│       ├── coursesServices.js
│       ├── professorsServices.js
│       └── roomsServices.js
├── FONT/                         # Frontend (HTML, CSS, JS)
│   ├── index.html
│   ├── script.js
│   └── style.css
└── README.md
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

### Route overview

Protected routes require: `Authorization: Bearer <token>`

**Auth**
| Method | Route | Auth | Description |
|---|---|---|---|
| POST | `/login` | No | Login — returns token + DTO |

**Students**
| Method | Route | Auth | Description |
|---|---|---|---|
| GET | `/students` | No | Get all students (DTO) |
| POST | `/students` | No | Register — returns token + DTO |
| GET | `/students/:id` | Yes | Get student by ID (DTO) |
| PUT | `/students/:id` | Yes | Update student |
| DELETE | `/students/:id` | Yes | Delete student |

**Courses**
| Method | Route | Auth | Description |
|---|---|---|---|
| GET | `/courses` | No | Get all courses |
| GET | `/courses/:id` | No | Get course by ID |
| POST | `/courses` | Yes | Create course |
| PUT | `/courses/:id` | Yes | Update course |
| DELETE | `/courses/:id` | Yes | Delete course |

**Professors**
| Method | Route | Auth | Description |
|---|---|---|---|
| GET | `/professors` | No | Get all professors |
| GET | `/professors/:id` | No | Get professor by ID |
| POST | `/professors` | Yes | Create professor |
| PUT | `/professors/:id` | Yes | Update professor |
| DELETE | `/professors/:id` | Yes | Delete professor |

**Rooms**
| Method | Route | Auth | Description |
|---|---|---|---|
| GET | `/rooms` | No | Get all rooms |
| GET | `/rooms/:id` | No | Get room by ID |
| POST | `/rooms` | Yes | Create room |
| PUT | `/rooms/:id` | Yes | Update room |
| DELETE | `/rooms/:id` | Yes | Delete room |

---

### GET /
Returns a welcome message.

**Response:**
```json
{ "msg": "Hello Willy! Your server is running..." }
```

---

### POST /login
Authenticates an existing student and returns a JWT.

**Request:**
```
POST http://localhost:3000/login
Content-Type: application/json

{
  "email": "alice.martin@epita.fr",
  "password": "alice123"
}
```

**Response (200):**
```json
{
  "token": "eyJhbGci...",
  "student": { "id": 1, "email": "alice.martin@epita.fr" }
}
```

**Response (400 - Missing fields):**
```json
{ "error": "❌ Email and password are required." }
```

**Response (401 - Wrong credentials):**
```json
{ "error": "❌ Invalid credentials." }
```

---

### GET /students
Retrieves all students. Public. Returns DTO array.

**Response (200):**
```json
[
  { "id": 1, "email": "alice.martin@epita.fr" },
  { "id": 2, "email": "bob.dupont@epita.fr" }
]
```

---

### GET /students/:id
Retrieves a specific student by ID. Requires token.

**Request:**
```
GET http://localhost:3000/students/1
Authorization: Bearer <token>
```

**Response (200):**
```json
{ "id": 1, "email": "alice.martin@epita.fr" }
```

**Response (401 - Missing or invalid token):**
```json
{ "error": "❌ Authorization token required." }
```

**Response (404 - Not found):**
```json
{ "error": "❌❌ Student was not found" }
```

---

### POST /students
Creates a new student (register). Public. Returns JWT + DTO.

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
  "token": "eyJhbGci...",
  "student": { "id": 10, "email": "david.chen@epita.fr" }
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

**Response (409 - Duplicate email):**
```json
{ "error": "❌ A student with this email already exists." }
```

---

### PUT /students/:id
Updates an existing student. Requires token. Returns DTO.

**Request:**
```
PUT http://localhost:3000/students/1
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Alice Martin",
  "email": "alice.martin@epita.fr",
  "major": "Data Science",
  "gpa": 3.9
}
```

> `password` is optional on PUT. If provided it must be at least 6 characters and will be re-hashed before saving.

**Response (200):**
```json
{
  "msg": "✅ Student updated successfully",
  "student": { "id": 1, "email": "alice.martin@epita.fr" }
}
```

**Response (401 - Missing or invalid token):**
```json
{ "error": "❌ Authorization token required." }
```

**Response (400 - Invalid field):**
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

---

### DELETE /students/:id
Deletes a student. Requires token.

**Request:**
```
DELETE http://localhost:3000/students/1
Authorization: Bearer <token>
```

**Response (200):**
```json
{ "msg": "✅ Student deleted successfully" }
```

**Response (401 - Missing or invalid token):**
```json
{ "error": "❌ Authorization token required." }
```

**Response (404 - Not found):**
```json
{ "error": "❌❌ Student was not found" }
```

## Usage Examples

### Using cURL

```bash
# Login and capture token
TOKEN=$(curl -s -X POST http://localhost:3000/login \
  -H "Content-Type: application/json" \
  -d '{"email":"alice.martin@epita.fr","password":"alice123"}' | jq -r '.token')

# Register (also returns a token)
curl -X POST http://localhost:3000/students \
  -H "Content-Type: application/json" \
  -d '{"name":"David","email":"david@epita.fr","password":"secret123","major":"CS","gpa":3.7}'

# Get all students (public)
curl http://localhost:3000/students

# Get student by ID (requires token)
curl http://localhost:3000/students/1 \
  -H "Authorization: Bearer $TOKEN"

# Update a student (requires token, password optional)
curl -X PUT http://localhost:3000/students/1 \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice","email":"alice@epita.fr","major":"DS","gpa":3.9}'

# Delete a student (requires token)
curl -X DELETE http://localhost:3000/students/1 \
  -H "Authorization: Bearer $TOKEN"
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

## Sample Data

All data lives in `db.json`. Passwords are stored as bcrypt hashes.

**Students (9)**
1. Alice Martin — Computer Science, GPA 3.8, EPITA
2. Bob builder — Civil Engineering, GPA 3.8, EPITA
3. Clara Rousseau — Computer Science, GPA 3.9, EPITA
4. David Moreau — Computer Science, GPA 3.5, EPITA
5. Danail Michev — Electrical Engineering, GPA 3.5, EPITECH
6. Eve Dupuis — Mechanical Engineering, GPA 3.7, EPITECH
7. Frank Leclerc — Cloud Computing, GPA 3.7, EPITA
8. Grace Morel — Biomedical Engineering, GPA 3.8, EPITECH
9. James Mike — Hitman, GPA 3.8, EPITECH

**Schools (2):** EPITA, EPITECH

**Professors (5):** Dupont, Martin, Rousseau, Leclerc, Morel

**Rooms (4):** A101 (Lecture Hall), B204 (Lab), C301 (Seminar), A102 (Lecture Hall)

**Courses (5):** Algorithms, Web Development, Database Systems, Operating Systems, Computer Networks

**Enrollments (16):** students linked to courses via `{ student_id, course_id }` pairs

## Future Enhancements

- [x] Add request body validation
- [x] Password validation (required on POST, min 6 chars)
- [x] bcrypt password hashing before storage
- [x] Duplicate ID and email detection on POST
- [x] Graceful malformed JSON error handling
- [x] Implement PUT to actually update the data file
- [x] Implement DELETE to actually remove from the data file
- [x] JWT authentication (issued on register and login)
- [x] Protected routes with Bearer token middleware
- [x] DTO responses — password never sent to client
- [x] Unified db.json with relational data (courses, professors, rooms, schools, enrollments)
- [x] Full CRUD for courses, professors, and rooms
- [x] Cross-resource validation (course professor_id and room_id checked against db)
- [ ] Replace db.json with a real database (MongoDB, PostgreSQL, etc.)
- [ ] Add search/filter endpoints per resource
- [ ] Add error logging
- [ ] Add API documentation with Swagger

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
  - Displays student data in the UI.

### Design Patterns Used

1. **MVC (Model-View-Controller)**: Backend separates concerns with controllers, routes, and services
2. **API-First**: Frontend consumes REST API independently
3. **Modular Structure**: Each layer has a single responsibility

## Notes

- All services read and write to `db.json` under their own key (`students`, `courses`, `professors`, `rooms`) — every request reads fresh from disk, no in-memory state
- All four services share the same `db.json` file; a write by one service preserves the other collections untouched
- Always set `Content-Type: application/json` on POST and PUT requests — without it, `express.json()` won't parse the body and validation will return a 400
- Passwords are hashed with bcrypt (cost factor 10) before being written — plaintext passwords are never stored
- `hashPassword` detects already-hashed values (bcrypt regex `$2b$...`) and skips them to prevent double-hashing on repeated PUT calls
- Course `POST`/`PUT` validates that `professor_id` and `room_id` reference records that actually exist in `db.json` before writing
- `authenticate` middleware runs before any ID lookup on protected routes — unauthorized requests are rejected before touching the database
- JWT is signed with `JWT_SECRET` from `.env` — use a strong random string in production; the placeholder in the repo is for development only
- Tokens expire after `JWT_EXPIRES_IN` (default `24h`) — clients must call `POST /login` again after expiry
- Malformed JSON bodies are caught by `handleJsonParseError` and return a clean 400 instead of an HTML crash page
- For production, replace `db.json` with a real database (MongoDB, PostgreSQL, etc.)

