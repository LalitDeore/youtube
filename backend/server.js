const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");
const jwt = require("jsonwebtoken");
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
app.use(cors());

// Route for handling user registration
app.post("/signup", (req, res) => {
  const { name, middlename, surname, email, password, mobile } = req.body;

  const registrationQuery = `INSERT INTO registration (NAME, Middle_name, Surname, email_id, password, mo_no) VALUES (?, ?, ?, ?, ?, ?)`;

  db.query(
    registrationQuery,
    [name, middlename, surname, email, password, mobile],
    (err, result) => {
      if (err) {
        console.error("Error registering user: ", err);
        res.status(500).json({ message: "Error registering user" });
      } else {
        console.log("User registered successfully");
        res.status(200).json({ message: "User registered successfully" });
      }
    }
  );
});

// Route for handling user login
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const loginQuery = `SELECT * FROM registration WHERE email_id = ? AND password = ?`;

  db.query(loginQuery, [email, password], (err, result) => {
    if (err) {
      console.error("Error during login: ", err);
      res.status(500).json({ message: "Error during login" });
    } else {
      if (result.length > 0) {
        console.log("Login successful");
        res.status(200).json({ message: "Login successful" });
      } else {
        console.log("Invalid credentials");
        res.status(401).json({ message: "Invalid credentials" });
      }
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${3001}`);
});
