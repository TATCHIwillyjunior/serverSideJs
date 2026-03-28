import express from "express"
import cors from "cors"
import studentsData from "./students.json" with { type: "json" }

const app = express()
const port = 3000

app.use(cors())


app.get("/", (req, res) => {
	res.json({ msg: "Hello Willy! Your server is running..." })	
})

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})

// GET all students
app.get("/students", (req, res) => {
	res.json(studentsData) 
})	

// GET student by ID
app.get("/students/:id", (req, res) => {
	const studentId = parseInt(req.params.id)
	const student = studentsData.find(s => s.id === studentId)
	if (student) {
		res.json(student)
	} else {
		res.status(404).json({ error: "❌❌ Student was not found" })
	}
})

// POST a new student
app.post("/students", (req, res) => {
	const newStudent = req.body
	res.json({ msg: "Student created successfully", student: newStudent })
})

// PUT update a student
app.put("/students/:id", (req, res) => {
	const studentId = parseInt(req.params.id)

	// check if student id exits in db or JSON file, if not return 404 error
	const student = studentsData.find(s => s.id === studentId)
	if (!student) {
		return res.status(404).json({ error: "❌❌ Student was not found" })
	} else {
		const updatedStudent = req.body
		res.json({ msg: "Student updated successfully", student: updatedStudent })
	}
})

// DELETE a student
app.delete("/students/:id", (req, res) => {
	const studentId = parseInt(req.params.id)
	// check if student id exits in db or JSON file, if not return 404 error
	const student = studentsData.find(s => s.id === studentId)
	if (!student) {
		return res.status(404).json({ error: "❌❌ Student was not found" })
	} else {
		// In a real application, you would remove the student from the database
		res.json({ msg: "Student deleted successfully" })
	}
})


// NODEMON

// send data to the exposed endpoints
// import data from students.json and send it to the client when they hit the endpoint
// use postman to send data to endpoints

// GET - retrieve data
// POST - create new data
// PUT - update existing data
// DELETE - remove data
// CRUD - create, read, update, delete

// SEND DATA vs SEND ERROR
// STATUS CODES - 200, 201, 400, 404
// JSON - JavaScript Object Notation
// res.json() - send JSON response
// res.status() - set status code
// res.send() - send response

// TRY FRONTEND NOW before moving on
// go to FONT folder and open index.html in the browser, check console for errors, fix them, and see the data being displayed

// CORS - Cross-Origin Resource Sharing
// npm i cors
// app.use(cors())

// REFACTORING
// 1. Create a separate file for routes (e.g., routes.js)
// 2. Create a separate file for controllers (e.g., controllers.js)
// 3. Change commonJs to ES6 modules (e.g., import/export) - this will require adding "type": "module" in package.json

// push to github and share the link
