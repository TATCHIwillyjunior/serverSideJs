import { getStudentById, getAllStudents } from "../services/studentsServices.js"

export function logRequest(req, _res, next) {
    console.log(`${req.method} ${req.url}`);
    next();
}

export function validateStudentId(req, res, next) {
    const id = parseInt(req.params.id)
    if (isNaN(id) || id <= 0) {
        return res.status(400).json({ error: "❌ ID must be a valid number." })
    }
    const student = getStudentById(id)
    if (!student) {
            // If student not found, return 404 error
            // but by default it returns 200 status code, showing the GET request work but
            // 200 should show up just for working id's so defining a 404 error makes it more clear and accurate.
        return res.status(404).json({ error: "❌❌ Student was not found" })
    }
    req.student = student
    next()
}

export function validateStudentBody(req, res, next) {
    if (!req.body || typeof req.body !== "object") {
        return res.status(400).json({ error: "❌ Request body is missing or not valid JSON. Make sure to set Content-Type: application/json." })
    }

    const { id, name, email, major, gpa } = req.body;

    if (id !== undefined) {
        const parsedId = parseInt(id);
        if (isNaN(parsedId) || parsedId <= 0) {
            return res.status(400).json({ error: "❌ ID must be a valid number." });
        }
        // Only block duplicate ID on create (POST), not on update (PUT) 
        if (!req.student && getStudentById(parsedId)) {
            return res.status(409).json({ error: "❌ A student with this ID already exists." });
        }
    }

    if (!name || typeof name !== "string" || name.trim() === "") {
        return res
            .status(400)
            .json({ error: "❌ 'name' is required and must be a non-empty string." });
    }

    if (!email || typeof email !== "string") {
        return res
            .status(400)
            .json({
                error: "❌ 'email' is required and must be a valid email address.",
            });
    }

    if (!major || typeof major !== "string" || major.trim() === "") {
        return res
            .status(400)
            .json({
                error: "❌ 'major' is required and must be a non-empty string.",
            });
    }

    if (gpa === undefined || gpa === null) {
        return res.status(400).json({ error: "❌ 'gpa' is required." });
    }

    const parsedGpa = parseFloat(gpa);
    if (isNaN(parsedGpa) || parsedGpa === -0 || parsedGpa < 0 || parsedGpa > 4) {
        return res
            .status(400)
            .json({ error: "❌ 'gpa' must be a number between 0 and 4." });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res
            .status(400)
            .json({ error: "❌ 'email' must be a valid email address." });
    }

    const currentId = req.student ? req.student.id : null;
    if (getAllStudents().some(s => s.email === email && s.id !== currentId)) {
        return res.status(409).json({ error: "❌ A student with this email already exists." });
    }

    next();
}

// Password validation middleware
export function validatePassword(req, res, next) {
  const { password } = req.body;

  // Only require password on POST
  if (req.method === "POST") {
    if (!password || typeof password !== "string" || password.trim() === "") {
      return res.status(400).json({ error: "❌ 'password' is required for new students." });
    }
  }

  // If password exists on PUT, validate it
  if (password && password.length < 6) {
    return res.status(400).json({ error: "❌ Password must be at least 6 characters long." });
  }

  next();
}


export function handleJsonParseError(err, req, res, next) {
    if (err.type === "entity.parse.failed") {
        return res.status(400).json({ error: "❌ Invalid JSON in request body." })
    }
    next(err)
}
