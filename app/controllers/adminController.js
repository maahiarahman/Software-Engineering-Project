// app/controllers/adminController.js

const db = require('../services/db');

async function getAdminData(req, res) {
  try {
    const queries = [
      "SELECT * FROM Admin_info",     // admins
      "SELECT * FROM users",          // users
      "SELECT * FROM approve_users",  // approvedUsers
      "SELECT * FROM Banned_users",   // bannedUsers
      "SELECT * FROM Deleted_users",  // deletedUsers
      "SELECT * FROM categories",     // categories
      "SELECT * FROM favourites",     // favourites
      "SELECT * FROM posts",          // posts
      "SELECT * FROM recipes",        // recipes
      "SELECT * FROM reviews"         // reviews
    ];

    const [
      admins,
      users,
      approvedUsers,
      bannedUsers,
      deletedUsers,
      categories,
      favourites,
      posts,
      recipes,
      reviews
    ] = await Promise.all(queries.map(async (q) => {
      const [rows] = await db.query(q);
      return rows;
    }));

    // Optional debug log
    console.log("✅ Admin dashboard data fetched");

    res.render("admin", {
      user: req.session.user, // optional: show admin info in dashboard
      admins,
      users,
      approvedUsers,
      bannedUsers,
      deletedUsers,
      categories,
      favourites,
      posts,
      recipes,
      reviews
    });

  } catch (err) {
    console.error("Database error:", err.stack || err);
    res.status(500).send("Failed to fetch admin data.");
  }
}

module.exports = {
  getAdminData
};
