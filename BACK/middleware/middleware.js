import { getStudentById } from "../services/studentsServices.js"

export function logRequest(req, _res, next) {
    console.log(`${req.method} ${req.url}`);
    next();
}

export function validateStudentId(req, res, next) {
    const id = parseInt(req.params.id)
    if (isNaN(id)) {
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
    const { name, email, major, gpa } = req.body;

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
    if (isNaN(parsedGpa) || parsedGpa < 0 || parsedGpa > 4) {
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

    next();
}
