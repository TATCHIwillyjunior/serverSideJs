# School Management REST API

A Node.js Express server providing a complete REST API for managing school resources — students, courses, professors, rooms, schools, and enrollments — with full CRUD operations, JWT authentication, MongoDB persistence, and fully populated relational responses.

## Features

- ✅ Full CRUD for students, courses, professors, rooms, schools, and enrollments
- ✅ MongoDB Atlas via Mongoose — all data persisted in a real database
- ✅ Relational data model — ObjectId foreign keys across all collections
- ✅ Enrollment endpoint returns the full populated chain: student → school, course → professor + room
- ✅ Unique compound index on enrollments — prevents a student enrolling twice in the same course
- ✅ JWT issued on register (POST /students) and login (POST /login)
- ✅ Protected routes — mutating endpoints require a valid Bearer token
- ✅ DTO responses — password never leaves the server
- ✅ Request body validation per resource (required fields, types, formats)
- ✅ MongoDB ObjectId validation on all `:id` params
- ✅ bcrypt password hashing before storage (cost factor 10)
- ✅ Protection against double-hashing already-hashed passwords
- ✅ Cross-resource validation (course professor_id/room_id, enrollment student_id/course_id checked against DB)
- ✅ 409 Conflict on duplicate email (students, professors) and duplicate enrollment
- ✅ Malformed JSON handled gracefully (400 instead of server crash)
- ✅ CORS enabled for cross-origin requests
- ✅ Seed script to populate all collections in dependency order
- ✅ Hot-reload with Nodemon for development
- ✅ Environment variables via dotenv (.env never committed)

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express 5
- **Database:** MongoDB Atlas
- **ODM:** Mongoose
- **Password Hashing:** bcrypt
- **Authentication:** jsonwebtoken
- **Environment:** dotenv
- **Dev Tool:** Nodemon

## Project Structure

```
ServerJs/
├── BACK/
│   ├── index.js                      # Entry point — DB connection + all routers mounted
│   ├── seed.js                       # Seeds all 6 collections into MongoDB in dependency order
│   ├── db.json                       # Source data used by the seed script
│   ├── package.json
│   ├── .env                          # MONGODB_URL, JWT_SECRET, JWT_EXPIRES_IN (never committed)
│   ├── models/
│   │   ├── student_db.js             # name, email, password, major, gpa, school_id → School
│   │   ├── school_db.js              # name, city, address, dean
│   │   ├── professor_db.js           # name, email, department, title
│   │   ├── room_db.js                # number, building, capacity, type
│   │   ├── course_db.js              # title, description, credits, professor_id → Professor, room_id → Room
│   │   └── enrollment_db.js          # student_id → Student, course_id → Course (unique compound index)
│   ├── controllers/
│   │   ├── studentsController.js     # toDTO(), CRUD + JWT on register
│   │   ├── schoolsController.js
│   │   ├── coursesController.js
│   │   ├── professorsController.js
│   │   ├── roomsController.js
│   │   ├── enrollmentsController.js  # populated responses, 409 on duplicate
│   │   └── authController.js         # POST /login
│   ├── middleware/
│   │   ├── auth.js                   # JWT Bearer token verification → req.user
│   │   ├── validation.js             # Student body/param validation + JSON error handler
│   │   ├── hashPassword.js           # bcrypt hashing
│   │   ├── schoolValidation.js
│   │   ├── courseValidation.js
│   │   ├── professorValidation.js
│   │   ├── roomValidation.js
│   │   └── enrollmentValidation.js   # validates student_id + course_id exist in DB
│   ├── routes/
│   │   ├── students.js
│   │   ├── schools.js
│   │   ├── courses.js
│   │   ├── professors.js
│   │   ├── rooms.js
│   │   ├── enrollments.js
│   │   └── auth.js                   # POST /login
│   └── services/
│       ├── studentsServices.js
│       ├── schoolsServices.js
│       ├── coursesServices.js
│       ├── professorsServices.js
│       ├── roomsServices.js
│       └── enrollmentsServices.js    # all queries use .populate() for relational responses
├── FONT/                             # Frontend (HTML, CSS, JS)
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
MONGODB_URL=mongodb+srv://<user>:<password>@cluster.mongodb.net/data?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_key_change_this
JWT_EXPIRES_IN=24h
```

4. **Seed the database** (inserts all sample data into MongoDB):
```bash
node seed.js
```

5. **Start the development server:**
```bash
npm run dev
```

The server will start on `http://localhost:3000/` with hot-reload enabled via Nodemon. The server only starts after a successful MongoDB connection.

### Frontend Setup

1. Open `FONT/index.html` in your browser
2. Make sure the backend server is running before opening the frontend

## Data Model & Relationships

```
Student ──[school_id]──────────► School
   │
   └──[Enrollment]──────────────► Course ──[professor_id]──► Professor
                                      │
                                      └──[room_id]──────────► Room
```

All foreign keys are MongoDB ObjectIds. The `GET /enrollments` endpoints resolve the full chain in one query using Mongoose `.populate()`.

## API Endpoints

Protected routes require: `Authorization: Bearer <token>`

**Auth**
| Method | Route | Auth | Description |
|---|---|---|---|
| POST | `/login` | No | Login — returns token + student DTO |

**Students**
| Method | Route | Auth | Description |
|---|---|---|---|
| GET | `/students` | No | Get all students (DTO, no password) |
| POST | `/students` | No | Register — returns token + DTO |
| GET | `/students/:id` | Yes | Get student by ObjectId |
| PUT | `/students/:id` | Yes | Update student — returns DTO |
| DELETE | `/students/:id` | Yes | Delete student |

**Schools**
| Method | Route | Auth | Description |
|---|---|---|---|
| GET | `/schools` | No | Get all schools |
| GET | `/schools/:id` | No | Get school by ObjectId |
| POST | `/schools` | Yes | Create school |
| PUT | `/schools/:id` | Yes | Update school |
| DELETE | `/schools/:id` | Yes | Delete school |

**Courses**
| Method | Route | Auth | Description |
|---|---|---|---|
| GET | `/courses` | No | Get all courses |
| GET | `/courses/:id` | No | Get course by ObjectId |
| POST | `/courses` | Yes | Create course (professor_id + room_id validated) |
| PUT | `/courses/:id` | Yes | Update course |
| DELETE | `/courses/:id` | Yes | Delete course |

**Professors**
| Method | Route | Auth | Description |
|---|---|---|---|
| GET | `/professors` | No | Get all professors |
| GET | `/professors/:id` | No | Get professor by ObjectId |
| POST | `/professors` | Yes | Create professor |
| PUT | `/professors/:id` | Yes | Update professor |
| DELETE | `/professors/:id` | Yes | Delete professor |

**Rooms**
| Method | Route | Auth | Description |
|---|---|---|---|
| GET | `/rooms` | No | Get all rooms |
| GET | `/rooms/:id` | No | Get room by ObjectId |
| POST | `/rooms` | Yes | Create room |
| PUT | `/rooms/:id` | Yes | Update room |
| DELETE | `/rooms/:id` | Yes | Delete room |

**Enrollments**
| Method | Route | Auth | Description |
|---|---|---|---|
| GET | `/enrollments` | No | All enrollments (fully populated) |
| GET | `/enrollments/student/:studentId` | No | All courses for a student (populated) |
| GET | `/enrollments/:id` | No | Single enrollment (populated) |
| POST | `/enrollments` | Yes | Enroll student in course — 409 if already enrolled |
| DELETE | `/enrollments/:id` | Yes | Remove enrollment |

---

### Populated enrollment response

`GET /enrollments/student/:studentId` returns the full chain for each enrollment:

```json
[
  {
    "_id": "...",
    "student_id": {
      "_id": "...",
      "name": "Alice Martin",
      "email": "alice.martin@epita.fr",
      "major": "Computer Science",
      "gpa": 3.8,
      "school_id": {
        "_id": "...",
        "name": "EPITA",
        "city": "Paris"
      }
    },
    "course_id": {
      "_id": "...",
      "title": "Introduction to Algorithms",
      "credits": 4,
      "professor_id": {
        "_id": "...",
        "name": "Prof. Dupont",
        "department": "Computer Science"
      },
      "room_id": {
        "_id": "...",
        "number": "A101",
        "building": "Block A",
        "capacity": 30
      }
    }
  }
]
```

---

### POST /login

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
  "student": {
    "_id": "664a1f...",
    "name": "Alice Martin",
    "email": "alice.martin@epita.fr",
    "major": "Computer Science",
    "gpa": 3.8
  }
}
```

**Response (401):**
```json
{ "error": "❌ Invalid credentials." }
```

---

### POST /students (register)

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
  "student": {
    "_id": "664a1f...",
    "name": "David Chen",
    "email": "david.chen@epita.fr",
    "major": "Computer Science",
    "gpa": 3.7
  }
}
```

---

### POST /enrollments

**Request:**
```
POST http://localhost:3000/enrollments
Authorization: Bearer <token>
Content-Type: application/json

{
  "student_id": "664a1f...",
  "course_id":  "664a2b..."
}
```

**Response (201):** fully populated enrollment object

**Response (409 - already enrolled):**
```json
{ "error": "❌ Student is already enrolled in this course." }
```

## Usage Examples

### cURL

```bash
# Login and capture token
TOKEN=$(curl -s -X POST http://localhost:3000/login \
  -H "Content-Type: application/json" \
  -d '{"email":"alice.martin@epita.fr","password":"alice123"}' | jq -r '.token')

# Get all students (public)
curl http://localhost:3000/students

# Get a student's full enrollment details (courses, professors, rooms, school)
curl http://localhost:3000/enrollments/student/<studentObjectId>

# Create an enrollment (requires token)
curl -X POST http://localhost:3000/enrollments \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"student_id":"<id>","course_id":"<id>"}'

# Delete an enrollment (requires token)
curl -X DELETE http://localhost:3000/enrollments/<enrollmentId> \
  -H "Authorization: Bearer $TOKEN"
```

## Available Scripts

Navigate to the `BACK/` folder:

```bash
# Seed the database with sample data
node seed.js

# Run with Nodemon (development)
npm run dev

# Run with plain Node.js (EPITA runner)
npm run epita
```

## Sample Data (seeded via seed.js)

**Students (9)**
1. Alice Martin — Computer Science, GPA 3.8, EPITA
2. Bob Builder — Civil Engineering, GPA 3.8, EPITA
3. Clara Rousseau — Computer Science, GPA 3.9, EPITA
4. David Moreau — Computer Science, GPA 3.5, EPITECH
5. Danail Michev — Electrical Engineering, GPA 3.5, EPITECH
6. Eve Dupuis — Mechanical Engineering, GPA 3.7, EPITA
7. Frank Leclerc — Cloud Computing, GPA 3.7, EPITECH
8. Grace Morel — Biomedical Engineering, GPA 3.8, EPITECH
9. James Mike — Hitman, GPA 3.8, EPITA

**Schools (2):** EPITA (Paris), EPITECH (Paris)

**Professors (5):** Dupont (CS), Martin (Web), Rousseau (DB), Leclerc (Systems), Morel (Networks)

**Rooms (4):** A101 (Lecture Hall, 30), B204 (Lab, 20), C301 (Seminar, 15), A102 (Lecture Hall, 50)

**Courses (5):** Introduction to Algorithms, Web Development, Database Systems, Operating Systems, Computer Networks

**Enrollments (16):** 16 student → course pairs from db.json, all resolved to ObjectIds during seeding

## Architecture

### Design Patterns

- **MVC**: models → services (business logic) → controllers (HTTP) → routes
- **Middleware pipeline**: auth → validation → controller (every protected route)
- **DTO pattern**: `toDTO()` strips password before any student response
- **Populate pattern**: enrollment service uses nested `.populate()` to resolve the full relational chain in a single query

### Key Design Decisions

- `authenticate` runs before the ID lookup on protected routes — unauthorized requests are rejected before touching the database
- `/enrollments/student/:studentId` is declared before `/:id` in the router to prevent Express matching `student` as an ObjectId
- All services use `.lean()` on reads (plain JS objects, spread-safe) and `.toObject()` on creates
- The seed script inserts in dependency order: schools → professors → rooms → courses → students → enrollments, building numeric-id → ObjectId maps at each step

## Notes

- All IDs are MongoDB ObjectIds (24-char hex strings) — numeric IDs are no longer used
- Always set `Content-Type: application/json` on POST and PUT requests
- Passwords are hashed with bcrypt (cost factor 10) — plaintext passwords are never stored
- JWT is signed with `JWT_SECRET` from `.env` — use a strong random string in production
- Tokens expire after `JWT_EXPIRES_IN` (default `24h`) — clients must call `POST /login` again after expiry
- Malformed JSON bodies return a clean 400 via `handleJsonParseError` instead of crashing
- Run `node seed.js` any time to wipe and re-seed all collections

## Future Enhancements

- [x] Request body validation per resource
- [x] bcrypt password hashing
- [x] JWT authentication (register + login)
- [x] Protected routes with Bearer token middleware
- [x] DTO responses — password never sent to client
- [x] Full CRUD for courses, professors, rooms, schools, enrollments
- [x] MongoDB Atlas with Mongoose ODM
- [x] Relational data model with ObjectId foreign keys
- [x] Populated enrollment responses (full relational chain in one query)
- [x] Seed script for repeatable data setup
- [ ] Adding a public routes to let user (login/register) before accessing the protected routes
- [ ] Add search/filter query params per resource
- [ ] Pagination on list endpoints
- [ ] Role-based access control (admin vs student)
- [ ] Swagger / OpenAPI documentation
- [ ] Error logging (Winston, Pino)