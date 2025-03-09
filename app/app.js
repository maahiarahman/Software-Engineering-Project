// Import express.js
const express = require("express");

// Create express app
var app = express();

// Add static files location
app.use(express.static("static"));

// Get the functions in the db.js file to use
const db = require('./services/db');

// ✅ Root Route
app.get("/", function(req, res) {
    res.send("Hello world!");
});

// ✅ Fixed `/db_test` Route (Database Connection Test)
app.get("/db_test", async (req, res) => {
    try {
        const sql = 'SELECT * FROM test_table';
        const results = await db.query(sql);
        console.log(results);
        res.json(results);
    } catch (err) {
        console.error("Database error:", err.message);
        res.status(500).send("Database error: " + err.message);
    }
});

// ✅ Route to get all students (JSON)
app.get("/api/students", async (req, res) => {
    try {
        const students = await db.query("SELECT * FROM Students");
        res.json(students);
    } catch (err) {
        res.status(500).send("Database error: " + err.message);
    }
});

// ✅ Route to display students in an HTML table
app.get("/students", async (req, res) => {
    try {
        const students = await db.query("SELECT * FROM Students");
        let html = `<html><head><title>Students</title></head><body>
                    <h1>Students List</h1>
                    <table border="1">
                    <tr><th>ID</th><th>Name</th></tr>`;
        students.forEach(student => {
            html += `<tr>
                        <td>${student.id}</td>
                        <td><a href="/student/${student.id}">${student.name}</a></td>
                     </tr>`;
        });
        html += `</table></body></html>`;
        res.send(html);
    } catch (err) {
        res.status(500).send("Database error: " + err.message);
    }
});

// ✅ Route to get all programmes (JSON)
app.get("/api/programmes", async (req, res) => {
    try {
        const programmes = await db.query("SELECT * FROM Programmes");
        res.json(programmes);
    } catch (err) {
        res.status(500).send("Database error: " + err.message);
    }
});

// ✅ Route to display programmes in an HTML table
app.get("/programmes", async (req, res) => {
    try {
        const programmes = await db.query("SELECT * FROM Programmes");
        let html = `<html><head><title>Programmes</title></head><body>
                    <h1>Programmes List</h1>
                    <table border="1">
                    <tr><th>ID</th><th>Name</th></tr>`;
        programmes.forEach(prog => {
            html += `<tr>
                        <td>${prog.id}</td>
                        <td><a href="/programme/${prog.id}">${prog.name}</a></td>
                     </tr>`;
        });
        html += `</table></body></html>`;
        res.send(html);
    } catch (err) {
        res.status(500).send("Database error: " + err.message);
    }
});

// ✅ Route to get a specific programme and its modules
app.get("/programme/:id", async (req, res) => {
    try {
        const programmeId = req.params.id;
        const programme = await db.query("SELECT * FROM Programmes WHERE id = ?", [programmeId]);
        const modules = await db.query(`
            SELECT Modules.name FROM Modules
            JOIN Programme_Modules ON Modules.code = Programme_Modules.module
            WHERE Programme_Modules.programme = ?`, [programmeId]);

        if (programme.length === 0) return res.send("Programme not found!");

        let html = `<html><head><title>Programme Details</title></head><body>
                    <h1>${programme[0].name}</h1>
                    <h2>Modules:</h2><ul>`;
        modules.forEach(m => { html += `<li>${m.name}</li>`; });
        html += `</ul></body></html>`;
        res.send(html);
    } catch (err) {
        res.status(500).send("Database error: " + err.message);
    }
});

// ✅ Route for /goodbye
app.get("/goodbye", function(req, res) {
    res.send("Goodbye world!");
});

// ✅ Route for /hello/<name>
app.get("/hello/:name", function(req, res) {
    console.log(req.params);
    res.send("Hello " + req.params.name);
});

// ✅ Start server on port 3000
app.listen(3000, function() {
    console.log(`Server running at http://127.0.0.1:3000/`);
});
