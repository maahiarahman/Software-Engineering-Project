const express = require("express");
const { Student } = require("./app/models/student");
const { Programme } = require("./app/models/programme");
const db = require("./app/services/db");  // Ensure DB service is loaded

// Create Express app
var app = express();

// Add static files location
app.use(express.static("static"));

// Use the Pug templating engine
app.set('view engine', 'pug');
app.set('views', './app/views');

// 🟢 **Fetch and display students from the database**
app.get("/", async function(req, res) {
    var sql = 'SELECT * FROM Students';
    const students = await db.query(sql);

    res.render("index", { 
        title: "Students List",
        heading: "Welcome to Student Page",
        students: students  // ✅ Send students from DB
    });
});

// 🟢 **Fetch a single student and display their programme & modules**
app.get("/student-single/:id", async function(req, res) {
    var student = new Student(req.params.id);
    await student.getStudentName();
    await student.getStudentProgramme();
    await student.getStudentModules();
    res.render('student', { student: student });
});

// 🟢 **Fetch all programmes**
app.get("/all-programmes", async function(req, res) {
    var sql = 'SELECT * FROM Programmes';
    const results = await db.query(sql);
    res.json(results);
});

// Start server on port 3000
app.listen(3000, function() {
    console.log(`Server running at http://127.0.0.1:3000/`);
});
