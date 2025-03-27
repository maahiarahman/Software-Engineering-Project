// Import express.js
const express = require("express");

// Create express app
var app = express();

// Add static files location
app.use(express.static("static"));


// Get the functions in the db.js file to use
const db = require('./services/db');
const db2 = require('./services/db');
const db3 = require('./services/db');

// Set up Pug as the view engine
app.set('view engine', 'pug');
app.set('views', './app/views');

app.get("/users", function(req, res) { 
    const sql = 'SELECT user_id, first_name, last_name, email, DATE_FORMAT(date_of_birth, "%m/%d/%Y") AS formatted_dob,age FROM users';

    db.query(sql)
    .then(results => {
        res.render("users", { users: results });
    })
});

app.get("/profile/:id", function(req, res) {
    const userId = req.params.id;  


    const sql = 'SELECT first_name, last_name, email, age FROM users WHERE user_id = ?';
    const sql2 = 'SELECT name FROM recipes WHERE user_id = ?';
    const sql3 = 'SELECT rating, comment FROM reviews WHERE user_id = ?';

    Promise.all([
        db.query(sql, [userId]),
        db2.query(sql2, [userId]),
        db3.query(sql3, [userId])
    ])
        .then(([results, results2, results3]) => {
            if (results.length > 0) {
                const user = results[0]; 
                const user_recipes = results2.map(recipe => recipe.name);
                const user_reviews = results3.map(review => review.rating + "☆" + " " + review.comment)
                res.render("profile", { user: user, user_recipes: user_recipes, user_reviews: user_reviews });  
            } else {
             
                res.status(404).send("User not found");
            }
        })
        
        .catch(err => {
            console.error("Database error:", err);
            res.status(500).send("Database query failed");
        });
});

// Start server on port 3000
app.listen(3000, function() {
    console.log(`Server running at http://127.0.0.1:3000/`);
});
