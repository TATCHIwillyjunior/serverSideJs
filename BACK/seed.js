import "dotenv/config"
import mongoose from "mongoose"
import Student from "./models/student_db.js"
import Professor from "./models/professor_db.js"
import Room from "./models/room_db.js"
import Course from "./models/course_db.js"
import School from "./models/school_db.js"
import Enrollment from "./models/enrollment_db.js"

// ── Raw data from db.json ──────────────────────────────────────────────────

const schools = [
  { id: 1, name: "EPITA",   city: "Paris",      address: "14 Rue Voltaire, 94270 Le Kremlin-Bicêtre", dean: "Prof. Bernard Laurent" },
  { id: 2, name: "EPITECH", city: "Paris",      address: "24 Rue Pasteur, 94270 Le Kremlin-Bicêtre",  dean: "Prof. Sophie Marchand" }
]

const professors = [
  { id: 1, name: "Prof. Dupont",   email: "dupont@epita.fr",   department: "Computer Science",    title: "Associate Professor" },
  { id: 2, name: "Prof. Martin",   email: "martin@epita.fr",   department: "Web Technologies",    title: "Senior Lecturer"     },
  { id: 3, name: "Prof. Rousseau", email: "rousseau@epita.fr", department: "Database Systems",    title: "Professor"           },
  { id: 4, name: "Prof. Leclerc",  email: "leclerc@epita.fr",  department: "Systems Engineering", title: "Associate Professor" },
  { id: 5, name: "Prof. Morel",    email: "morel@epita.fr",    department: "Networks",            title: "Senior Lecturer"     }
]

const rooms = [
  { id: 1, number: "A101", building: "Block A", capacity: 30, type: "Lecture Hall"  },
  { id: 2, number: "B204", building: "Block B", capacity: 20, type: "Lab"           },
  { id: 3, number: "C301", building: "Block C", capacity: 15, type: "Seminar Room"  },
  { id: 4, number: "A102", building: "Block A", capacity: 50, type: "Lecture Hall"  }
]

const courses = [
  { id: 1, title: "Introduction to Algorithms", description: "Covers fundamental algorithms and data structures including sorting, searching, and graph algorithms.", credits: 4, professor_id: 1, room_id: 1 },
  { id: 2, title: "Web Development",            description: "Full-stack web development using modern frameworks and REST APIs.",                                      credits: 3, professor_id: 2, room_id: 2 },
  { id: 3, title: "Database Systems",           description: "Relational and non-relational databases, SQL, normalization, and query optimization.",                  credits: 3, professor_id: 3, room_id: 3 },
  { id: 4, title: "Operating Systems",          description: "Process management, memory management, file systems, and concurrency.",                                 credits: 4, professor_id: 4, room_id: 4 },
  { id: 5, title: "Computer Networks",          description: "Network protocols, TCP/IP stack, routing, and network security fundamentals.",                          credits: 3, professor_id: 5, room_id: 1 }
]

const enrollments = [
  { student_id: 1, course_id: 1 },
  { student_id: 1, course_id: 2 },
  { student_id: 2, course_id: 2 },
  { student_id: 2, course_id: 3 },
  { student_id: 3, course_id: 1 },
  { student_id: 3, course_id: 3 },
  { student_id: 3, course_id: 4 },
  { student_id: 4, course_id: 4 },
  { student_id: 4, course_id: 5 },
  { student_id: 5, course_id: 2 },
  { student_id: 5, course_id: 5 },
  { student_id: 6, course_id: 1 },
  { student_id: 7, course_id: 2 },
  { student_id: 7, course_id: 3 },
  { student_id: 8, course_id: 4 },
  { student_id: 9, course_id: 5 }
]

const students = [
  { id: 1, name: "Alice Martin",  email: "alice.martin@epita.fr",   password: "$2b$10$ml45xSUGi8vWyXqXEeRHv.apSzfGLNq.ZTi9l53JfoiZ6J6/sGOMC", major: "Computer Science",      gpa: 3.8, school_id: 1 },
  { id: 2, name: "Bob builder",   email: "bob.dupont@epita.fr",     password: "$2b$10$oED/q8Zr/ZuKjV7eVem/AOcUP5y6nJcXrUvArLZfV0PVRVotiYBNK", major: "Civil Engineering",      gpa: 3.8, school_id: 1 },
  { id: 3, name: "Clara Rousseau",email: "clara.rousseau@epita.fr", password: "$2b$10$J551cugdsDuaybtkPjgDLuUZ2BroNEv9q61aUyHte0UKQgCnTOyCy", major: "Computer Science",      gpa: 3.9, school_id: 1 },
  { id: 4, name: "David Moreau",  email: "david.moreau@epita.fr",   password: "$2b$10$95pScfVOuqHPgJHkZO2eH.2JmotvGnpftizOlooNo296y0jGI/0w6",  major: "Computer Science",      gpa: 3.5, school_id: 2 },
  { id: 5, name: "Danail Michev", email: "danail.michev@epita.fr",  password: "$2b$10$lc1jBRpz2r3kVt83ZNFQ4.ceSCUShNtzvB1RR0/rJOo5WRvr9R92.",  major: "Electrical Engineering", gpa: 3.5, school_id: 2 },
  { id: 6, name: "Eve Dupuis",    email: "EopEeve.dupuis@epita.fr", password: "$2b$10$3KsZrGKaI7y9y5EQ.QvLSuMj4nwBN6NWPdNbvxHNC/W3gtI0wG0oa",  major: "Mechanical Engineering", gpa: 3.7, school_id: 1 },
  { id: 7, name: "Frank Leclerc", email: "frank.leclerc@epita.fr",  password: "$2b$10$kuQ5L52PRKHlF6/y84tBFO33pOXEufpuPSxOaadkLHwIG4R3BqByW",  major: "Cloud Computing",        gpa: 3.7, school_id: 2 },
  { id: 8, name: "Grace Morel",   email: "grace.morel@epita.fr",    password: "$2b$10$p5w9ld2n5zkZjuRmixnACOsqvAvGIB0Tp/uyltsBpLe09s3X.to1a",   major: "Biomedical Engineering", gpa: 3.8, school_id: 2 },
  { id: 9, name: "James Mike",    email: "james.mike@epita.fr",     password: "$2b$10$.4jXgso6eIyyJp65xM5ZXOg9RmS8sKSMoOKdEmd4X0hGiqMrp7xti",   major: "Hitman",                 gpa: 3.8, school_id: 1 }
]

// ── Seed ──────────────────────────────────────────────────────────────────

async function seed() {
  await mongoose.connect(process.env.MONGODB_URL)
  console.log("✅ Connected to MongoDB")

  // Clear all collections first
  await Promise.all([
    Student.deleteMany({}),
    Professor.deleteMany({}),
    Room.deleteMany({}),
    Course.deleteMany({}),
    School.deleteMany({}),
    Enrollment.deleteMany({})
  ])
  console.log("🗑️  Cleared existing data")

  // 1. Insert schools — build numeric id → ObjectId map
  const schoolMap = {}
  for (const { id, ...data } of schools) {
    const doc = await School.create(data)
    schoolMap[id] = doc._id
    console.log(`  School    [${id}] → ${doc._id}  (${data.name})`)
  }

  // 3. Insert professors — build numeric id → ObjectId map
  const profMap = {}
  for (const { id, ...data } of professors) {
    const doc = await Professor.create(data)
    profMap[id] = doc._id
    console.log(`  Professor [${id}] → ${doc._id}  (${data.name})`)
  }

  // 4. Insert rooms — build numeric id → ObjectId map
  const roomMap = {}
  for (const { id, ...data } of rooms) {
    const doc = await Room.create(data)
    roomMap[id] = doc._id
    console.log(`  Room      [${id}] → ${doc._id}  (${data.number})`)
  }

  // 5. Insert courses — replace numeric professor_id / room_id with ObjectIds, build courseMap
  const courseMap = {}
  for (const { id, professor_id, room_id, ...data } of courses) {
    const doc = await Course.create({
      ...data,
      professor_id: profMap[professor_id],
      room_id:      roomMap[room_id]
    })
    courseMap[id] = doc._id
    console.log(`  Course    [${id}] → ${doc._id}  (${data.title})`)
  }

  // 6. Insert students — replace numeric school_id with ObjectId, build studentMap
  const studentMap = {}
  for (const { id, school_id, ...data } of students) {
    const doc = await Student.create({ ...data, school_id: schoolMap[school_id] })
    studentMap[id] = doc._id
    console.log(`  Student   [${id}] → ${doc._id}  (${data.name})`)
  }

  // 7. Insert enrollments — replace numeric student_id / course_id with ObjectIds
  for (const { student_id, course_id } of enrollments) {
    await Enrollment.create({
      student_id: studentMap[student_id],
      course_id:  courseMap[course_id]
    })
  }
  console.log(`  Enrollments inserted: ${enrollments.length}`)

  console.log("\n✅ Seed complete — all data inserted into MongoDB")
  await mongoose.disconnect()
}

seed().catch(err => {
  console.error("❌ Seed failed:", err)
  mongoose.disconnect()
  process.exit(1)
})