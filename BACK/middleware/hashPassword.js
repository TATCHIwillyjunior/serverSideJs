import bcrypt from "bcrypt";


// this function is here to check the validity of the bcrypt hash formate.
// This is to avoid a user sending a password that can start with $2a$, $2b$, or $2y$
//  or entering something like this: "$2b$myRealPassword123" and cause the hashPassword function
//  to not hash or send the password to DB or JSON file as plain text, which is a security risk.
function isBcryptHash(password) {
  // Bcrypt hashes are always 60 chars and start with $2a$, $2b$, or $2y$
  const bcryptRegex = /^\$2[aby]\$[0-9]{2}\$[./A-Za-z0-9]{53}$/;
  return bcryptRegex.test(password);
}

export async function hashPassword(req, res, next) {
  try {
    const { password } = req.body;

    // No password provided → skip
    if (!password) return next();

    // Check if password is already a valid bcrypt hash
    if (isBcryptHash(password)) {
      return next();
    }

    // Hash plaintext password
    req.body.password = await bcrypt.hash(password, 10);

    next();
  } catch (err) {
    console.error("Error hashing password:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}
