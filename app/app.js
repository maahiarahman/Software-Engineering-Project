// Import express.js
const express = require("express");

// Create express app
var app = express();

// Add static files location
app.use(express.static("static"));

// Get the functions in the db.js file to use
const db = require('./services/db');

// EXERCISE 1: Modify the root route to display your name
app.get("/", function(req, res) {
    res.send("Hello Maahia");  
});

// EXERCISE 2: Create a new route /roehampton
app.get("/roehampton", function(req, res) {
    res.send("Hello Roehampton!");
});

// EXERCISE 3: Debugging to console
app.get("/roehampton", function(req, res) {
    console.log(req.url);  // Logs the requested URL to console
    res.send("Hello Roehampton!");
});

// EXERCISE 4: Process request path - Send first 3 letters of URL
app.get("/roehampton", function(req, res) {
    console.log(req.url);
    let path = req.url;
    res.send(path.substring(0, 3)); // Sends only "roe"
});

// EXERCISE 5: Create a dynamic route for /user/:id
app.get("/user/:id", function(req, res) {
    res.send("User ID: " + req.params.id);
});

// EXERCISE 6: Create a dynamic route for /student/:name/:id
app.get("/student/:name/:id", function(req, res) {
    res.send(`Student Name: ${req.params.name}, ID: ${req.params.id}`);
});

// EXERCISE 7: Display student info in an HTML table
app.get("/student/:name/:id", function(req, res) {
    res.send(`
        <html>
            <body>
                <table border="1">
                    <tr><th>Name</th><th>ID</th></tr>
                    <tr><td>${req.params.name}</td><td>${req.params.id}</td></tr>
                </table>
            </body>
        </html>
    `);
});

// EXERCISE 8: Modify /db_test to use a dynamic ID
app.get("/db_test/:id", function(req, res) {
    let id = req.params.id;

    let sql = `SELECT name FROM students WHERE id = ?`;
    db.query(sql, [id]).then(results => {
        if (results.length > 0) {
            res.send(`<h1>Student Name: ${results[0].name}</h1>`);
        } else {
            res.send(`<h1>No student found with ID ${id}</h1>`);
        }
    }).catch(err => {
        res.status(500).send("Database error");
    });
});

// EXERCISE 9: Reverse "roehampton" when requested
app.get("/roehampton", function(req, res) {
    let path = req.url.substring(1);  // Remove leading "/"
    let reversed = path.split("").reverse().join("");  // Reverse string
    res.send(reversed);
});

// EXERCISE 10: Number Table from 0 to n
app.get("/number/:n", function(req, res) {
    let n = parseInt(req.params.n);
    let table = "<table border='1'><tr><th>Numbers</th></tr>";

    for (let i = 0; i <= n; i++) {
        table += `<tr><td>${i}</td></tr>`;
    }

    table += "</table>";
    res.send(table);
});

// Existing routes

// Create a route for testing the db
app.get("/db_test", function(req, res) {
    sql = 'select * from test_table';
    db.query(sql).then(results => {
        console.log(results);
        res.send(results);
    });
});

// Create a route for /goodbye
app.get("/goodbye", function(req, res) {
    res.send("Goodbye world!");
});

// Create a dynamic route for /hello/:name
app.get("/hello/:name", function(req, res) {
    console.log(req.params);
    res.send("Hello " + req.params.name);
});

// Start server on port 3000
app.listen(3000, function() {
    console.log(`Server running at http://127.0.0.1:3000/`);
});
