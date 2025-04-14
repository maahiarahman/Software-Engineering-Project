// Import express.js
const express = require("express");

// Create express app
var app = express();

// ✅ Use the Pug templating engine
app.set("view engine", "pug");
app.set("views", "./app/views"); // ✅ Fix the path if needed

// Add static files location
app.use(express.static("static"));

// Get the functions in the db.js file to use
const db = require("./app/services/db");

// ✅ Root Route - Render `index.pug`
app.get("/", function (req, res) {
    res.render("index", { title: "My Index Page", heading: "Welcome to Pug!" });
});

// ✅ Start server on port 3000
app.listen(3000, function () {
    console.log(`Server running at http://127.0.0.1:3000/`);
});
