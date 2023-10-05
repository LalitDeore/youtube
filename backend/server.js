const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bcrypt = require("bcrypt");

require("dotenv").config();

const app = express();
const port = 3001;
const PORT = process.env.PORT || 3003;
const db = mysql.createConnection({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT,
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database: ", err);
  } else {
    console.log("Connected to the database!");
  }
});

app.use(bodyParser.json());
// Initialize Express app
app.use(cors());
app.use(cookieParser());

// Use cookie-parser middleware to parse cookies
app.use(cookieParser());

// Use express-session middleware to manage sessions (optional but recommended)
app.use(
  session({
    secret: "12345678", // Change this to a secret key
    resave: false,
    saveUninitialized: true,
  })
);

session({
  secret: "your-secret-key", // Change this to a secret key
  resave: false,
  saveUninitialized: true,
});

// Route for handling user registration
app.post("/signup", (req, res) => {
  const { name, middlename, surname, email, password, mobile } = req.body;

  // Hash the user's password
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error("Error hashing password: ", err);
      res.status(500).json({ message: "Error hashing password" });
    } else {
      const registrationQuery = `INSERT INTO registration (NAME, Middle_name, Surname, email_id, password, mo_no) VALUES (?, ?, ?, ?, ?, ?)`;

      db.query(
        registrationQuery,
        [name, middlename, surname, email, hashedPassword, mobile], // Use the hashed password
        (err, result) => {
          if (err) {
            console.error("Error registering user: ", err);
            res.status(500).json({ message: "Error registering user" });
          } else {
            // After successful registration, create a JWT token for the user
            const userObject = {
              name,
              email,
              // Add other user details as needed
            };

            // Replace "your-secret-key" with a strong, secret key
            const token = jwt.sign(userObject, "your-secret-key", {
              expiresIn: "1h", // Set the expiration time for the token
            });

            // Set the JWT token as an HTTP-only cookie
            res.cookie("token", token, { httpOnly: true });

            console.log("User registered successfully");
            res.status(200).json({ message: "User registered successfully" });
          }
        }
      );
    }
  });
});

// Route for handling user login
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const loginQuery = `SELECT * FROM registration WHERE email_id = ?`;

  db.query(loginQuery, [email], (err, result) => {
    if (err) {
      console.error("Error during login: ", err);
      res.status(500).json({ message: "Error during login" });
    } else {
      if (result.length > 0) {
        const user = result[0];

        // Compare the provided password with the hashed password from the database
        bcrypt.compare(password, user.password, (bcryptErr, passwordMatch) => {
          if (bcryptErr || !passwordMatch) {
            console.log("Invalid credentials");
            res.status(401).json({ message: "Invalid credentials" });
          } else {
            // Passwords match, generate a JWT token
            const userObject = {
              name: user.NAME,
              email: user.email_id,
              // Add other user details as needed
            };

            // Replace "your-secret-key" with a strong, secret key
            const token = jwt.sign(userObject, "your-secret-key", {
              expiresIn: "1h", // Set the expiration time for the token
            });

            // Set the JWT token as an HTTP-only cookie
            res.cookie("token", token, { httpOnly: true });

            console.log("Login successful");
            res.status(200).json({ message: "Login successful" });
          }
        });
      } else {
        console.log("Invalid credentials");
        res.status(401).json({ message: "Invalid credentials" });
      }
    }
  });
});

app.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
