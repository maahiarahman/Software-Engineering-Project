// app/controllers/adminController.js

const db = require('../services/db');

async function getAdminData(req, res) {
  try {
    const queries = [
      "SELECT * FROM Admin_info",
      "SELECT * FROM users",
      "SELECT * FROM Banned_users",
      "SELECT * FROM approve_users",
      "SELECT * FROM Deleted_users",
      "SELECT * FROM categories",
      "SELECT * FROM favourites",
      "SELECT * FROM posts",
      "SELECT * FROM recipes",
      "SELECT * FROM reviews"
    ];

    const results = await Promise.all(queries.map(q => db.query(q)));

    // Debugging log to ensure data is coming through
    console.log("Results from DB:", results);

    res.render("admin", {
      admins: results[0],
      users: results[1],
      bannedUsers: results[2],
      approvedUsers: results[3],
      deletedUsers: results[4],
      categories: results[5],
      favourites: results[6],
      posts: results[7],
      recipes: results[8],
      reviews: results[9],
    });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).send("Failed to fetch admin data.");
  }
}

module.exports = {
  getAdminData
};
