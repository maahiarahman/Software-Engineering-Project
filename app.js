const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('express-flash');
const path = require('path');
const multer = require('multer');
const bcrypt = require('bcryptjs');

const app = express();

// Controllers
const adminController = require('./app/controllers/adminController');
const userController = require('./app/controllers/userController');
const db = require('./app/services/db');
const userRoutes = require('./app/routes/user');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'static')));
app.use(flash());

// View engine
app.set('view engine', 'pug');
app.set('views', './app/views');

// Session
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// Global locals
// Set global locals for all templates
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  res.locals.year = new Date().getFullYear();
  res.locals.isAdminPage = req.originalUrl.startsWith('/admin');
  res.locals.currentPath = req.path; // 👈 must be here and early
  next();
});




// Routes
app.get('/', (req, res) => res.redirect('/splash'));
app.get('/splash', (req, res) => res.render('splash'));
app.get('/contact', (req, res) => res.render('contact'));
app.get('/membership', (req, res) => res.render('membership'));
app.get('/terms', (req, res) => res.render('terms'));

app.get('/register', (req, res) => res.render('register'));
app.post('/register', userController.register);
app.get('/login', (req, res) => res.render('login'));
app.post('/login', userController.login);

app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Logout Error:', err);
      return res.status(500).send('Logout failed.');
    }
    res.redirect('/login');
  });
});


app.get('/about', (req, res) => {
  const team = [
    {
      name: "Sumana",
      role: "Design & UX",
      desc: "Led the visual design and user experience. Took care of the details that bring the site together – from styling to layouts and UI polish."
    },
    {
      name: "Shaiza",
      role: "Backend & Database",
      desc: "Engineered the backend. Set up the database, API routes, and made sure the whole app runs smoothly under the hood."
    },
    {
      name: "Maahia",
      role: "User Systems",
      desc: "Built the authentication system and user-facing features like login, registration, and the dashboard experience."
    },
    {
      name: "Aneeta",
      role: "Recipes & Profiles",
      desc: "Focused on recipes and profile functionalities, making sure users could create, view, and interact with personalized content."
    }
  ];

  res.render('about', { team }); // Pass the team array to the template
});



// ✅ View profile page
app.get('/profile/:id', async (req, res) => {
  const userId = req.params.id;

  try {
    const [userResult] = await db.query(
      `SELECT *, DATE_FORMAT(date_of_birth,"%Y-%m-%d") as date_of_birth FROM users WHERE user_ID = ?`,
      [userId]
    );
    const user = userResult[0];

    if (!user) return res.status(404).send("User not found");

    const [recipes] = await db.query('SELECT * FROM recipes WHERE user_id = ?', [user.user_ID]);
    const [reviews] = await db.query('SELECT * FROM reviews WHERE user_id = ?', [user.user_ID]);
    const [posts] = await db.query('SELECT * FROM posts WHERE user_id = ?', [user.user_ID]);
    const [swaps] = await db.query(`
      SELECT * FROM swaps WHERE user_id = ? OR swapped_recipe_id IN (
        SELECT recipe_id FROM recipes WHERE user_id = ?
      )
    `, [user.user_ID, user.user_ID]);

    res.render('profile', {
      user,
      recipes,
      reviews,
      posts,
      swaps,
      isAdmin: req.session.admin || false
    });
  } catch (err) {
    console.error('Error loading profile:', err);
    res.status(500).send('Failed to load profile.');
  }
});


// Recipe posting
const upload = multer({ dest: 'public/images/' });
app.get('/recipe-post', (req, res) => res.render('recipe_post'));
app.post('/recipes', upload.single('image'), async (req, res) => {
  const { name, description, ingredients, instructions, category } = req.body;
  const imageUrl = req.file ? `/images/${req.file.filename}` : 'default.jpg';
  const userId = req.session.user?.id;

  if (!userId) return res.status(400).send("You must be logged in.");

  try {
    await db.query(
      'INSERT INTO recipes (name, description, ingredients, instructions, category_id, image_url, user_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, description, ingredients, instructions, category, imageUrl, userId]
    );
    res.redirect('/profile/' + userId); // 👈 after insert & optional swap insert
  } catch (err) {
    console.error('Error inserting recipe:', err);
    res.status(500).send('Error inserting recipe');
  }
});
// ✅ Recipes list
app.get('/recipes', async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM recipes');
    res.render('recipes', { recipes: results });
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

// ✅ Recipe details with reviews
app.get('/recipes/:id', async (req, res) => {
  const recipeId = req.params.id;
  try {
    const [recipe] = await db.query('SELECT * FROM recipes WHERE recipe_id = ?', [recipeId]);

    if (recipe.length > 0) {
      const [reviews] = await db.query(`
        SELECT r.*, u.first_name, u.last_name
        FROM reviews r
        JOIN users u ON r.user_id = u.user_id
        WHERE r.recipe_id = ?
      `, [recipeId]);

      res.render('recipe_detail', { recipe: recipe[0], reviews });
    } else {
      res.status(404).send('Recipe not found');
    }
  } catch (err) {
    console.error('Error fetching recipe details:', err);
    res.status(500).send('Internal Server Error');
  }
});

// ✅ Submit a review
app.post('/reviews', async (req, res) => {
  const { recipeId, reviewText, rating } = req.body;
  const userId = req.session.user?.id;

  if (!userId) return res.status(400).send("You must be logged in to submit a review.");

  try {
    await db.query(
      'INSERT INTO reviews (recipe_id, user_id, rating, comment) VALUES (?, ?, ?, ?)',
      [recipeId, userId, rating, reviewText]
    );
    res.redirect('/recipes/' + recipeId);
  } catch (err) {
    console.error('Error inserting review:', err);
    res.status(500).send('Error inserting review');
  }
});

// ✅ Swap page
app.get('/swap', async (req, res) => {
  if (!req.session.user) return res.redirect('/login');

  try {
    const userId = req.session.user.id;
    const [recipes] = await db.query('SELECT * FROM recipes WHERE user_id != ?', [userId]);
    const [userRecipes] = await db.query('SELECT * FROM recipes WHERE user_id = ?', [userId]);

    res.render('swap', {
      recipes,
      userRecipes,
      user: req.session.user,
      messages: {
        success: req.flash('success'),
        error: req.flash('error')
      }
    });
  } catch (err) {
    console.error('Error loading swap page:', err);
    res.status(500).send('Error loading swap page.');
  }
});

// ✅ Send swap request
app.post('/swap/send', async (req, res) => {
  const { target_recipe_id, your_recipe_id } = req.body;
  const userId = req.session.user?.id;

  if (!userId) {
    req.flash('error', 'You must be logged in to request a swap.');
    return res.redirect('/login');
  }

  if (!target_recipe_id || !your_recipe_id) {
    req.flash('error', 'Please select a valid recipe for swapping.');
    return res.redirect('/swap');
  }

  try {
    await db.query(
      'INSERT INTO swaps (recipe_id, user_id, swapped_recipe_id, swap_status) VALUES (?, ?, ?, ?)',
      [your_recipe_id, userId, target_recipe_id, 'pending']
    );

    req.flash('success', 'Your swap request has been sent! ✅');
    res.redirect('/swap');
  } catch (err) {
    console.error('Error processing swap:', err);
    req.flash('error', 'There was an error processing your swap.');
    res.redirect('/swap');
  }
});

// ✅ User dashboard redirect (real logic lives in /user/dashboard)
app.get('/dashboard', (req, res) => res.redirect('/user/dashboard'));
app.get('/user/dashboard', userController.getUserDashboard);

// ✅ Admin auth check
function isAdmin(req, res, next) {
  if (req.session.admin) return next();
  res.status(403).send("Access denied. Admins only.");
}

// ✅ Admin login form + auth
app.get('/adminlogin', (req, res) => res.render('admin-login'));
app.post('/adminlogin', userController.adminLogin);

// ✅ Admin dashboard
app.get('/admin', isAdmin, async function (req, res) {
  console.log('Admin route is being accessed');

  try {
    const adminQuery = "SELECT * FROM Admin_info";
    const usersQuery = "SELECT * FROM users";
    const approvedQuery = "SELECT * FROM approve_users";
    const deletedQuery = "SELECT * FROM Deleted_users";
    const categoriesQuery = "SELECT * FROM categories";
    const favouritesQuery = "SELECT * FROM favourites";
    const postQuery = "SELECT * FROM posts";
    const recipesQuery = "SELECT * FROM recipes";
    const reviewsQuery = "SELECT * FROM reviews";
    const bannedQuery = `
      SELECT b.ban_ID, u.user_ID, u.first_name, u.last_name, b.ban_date, b.admin_ID 
      FROM Banned_users b
      JOIN users u ON b.user_ID = u.user_ID;
    `;

    const [admins, users, banned, approved, deleted, categories, favourites, posts, recipes, reviews] = await Promise.all([
      db.query(adminQuery),
      db.query(usersQuery),
      db.query(bannedQuery),
      db.query(approvedQuery),
      db.query(deletedQuery),
      db.query(categoriesQuery),
      db.query(favouritesQuery),
      db.query(postQuery),
      db.query(recipesQuery),
      db.query(reviewsQuery)
    ]);

    res.render("admin", {
      admin: req.session.admin,
      admins: admins[0],
      users: users[0],
      bannedUsers: banned[0],
      approvedUsers: approved[0],
      deletedUsers: deleted[0],
      categories: categories[0],
      favourites: favourites[0],
      posts: posts[0],
      recipes: recipes[0],
      reviews: reviews[0]
    });

  } catch (error) {
    console.error("Database error:", error);
    res.status(500).send("Failed to fetch admin data.");
  }
});
// ✅ View single admin
app.get("/adminSingle/:id", function(req, res) {
  const adminId = req.params.id;
  const sql = "SELECT admin_ID, name, email FROM Admin_info WHERE admin_ID = ?";

  db.query(sql, [adminId])
    .then(([results]) => {
      if (results.length > 0) {
        res.render('adminSingle', { data: results[0] });
      } else {
        res.status(404).send("Admin not found");
      }
    })
    .catch(error => {
      console.error("Database error:", error);
      res.status(500).send("Internal Server Error");
    });
});

// ✅ View specific user
app.get("/user/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    // 🔍 Debug log
    console.log("Fetching profile for user ID:", userId);

    const userQuery = `
      SELECT u.user_ID, u.first_name, u.last_name, u.email, u.date_of_birth, u.age, u.user_password, u.badge,
        CASE WHEN b.user_ID IS NOT NULL THEN 1 ELSE 0 END AS isBanned
      FROM users u
      LEFT JOIN Banned_users b ON u.user_ID = b.user_ID
      WHERE u.user_ID = ?;
    `;

    const recipesQuery = `SELECT * FROM recipes WHERE user_id = ?`;
    const reviewsQuery = `SELECT * FROM reviews WHERE user_id = ?`;
    const postsQuery = `SELECT * FROM posts WHERE user_id = ?`;
    const swapsQuery = `SELECT * FROM swaps WHERE user_id = ?`;

    const [[user]] = await db.query(userQuery, [userId]);
    const [recipes] = await db.query(recipesQuery, [userId]);
    const [reviews] = await db.query(reviewsQuery, [userId]);
    const [posts] = await db.query(postsQuery, [userId]);
    const [swaps] = await db.query(swapsQuery, [userId]);

    if (!user) return res.status(404).send("User not found");

    res.render("userProfile", {
      user,
      recipes,
      reviews,
      posts,
      swaps,
      isAdmin: req.session.admin ? true : false
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).send("Internal server error");
  }
});



// ✅ Ban a user
app.post("/user/:id/ban", async (req, res) => {
  try {
    const userId = req.params.id;

    const query = `INSERT INTO Banned_users (user_ID) VALUES (?);`;
    const deleteQuery = `DELETE FROM approve_users WHERE user_ID = ?`;

    await db.query(query, [userId]);
    await db.query(deleteQuery, [userId]);

    res.redirect("/user/" + userId);
  } catch (error) {
    console.error("Error banning user:", error);
    res.status(500).send("Failed to ban user.");
  }
});

// ✅ Delete a specific review
app.post("/user/:userId/review/:reviewId/delete", async (req, res) => {
  try {
    const { userId, reviewId } = req.params;

    const deleteQuery = `DELETE FROM reviews WHERE review_ID = ? AND user_ID = ?`;
    await db.query(deleteQuery, [reviewId, userId]);

    console.log(`Deleted review ${reviewId} for user ${userId}`);
    res.redirect("/user/" + userId);
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).send("Failed to delete review.");
  }
});

// ✅ Delete a user's recipe and related post
app.post("/user/:userId/recipes/:recipeId/delete", async (req, res) => {
  try {
    const { userId, recipeId } = req.params;

    const deletePostsQuery = `DELETE FROM posts WHERE recipe_ID = ? AND user_ID = ?`;
    const deleteRecipesQuery = `DELETE FROM recipes WHERE recipe_ID = ? AND user_ID = ?`;

    await db.query(deletePostsQuery, [recipeId, userId]);
    await db.query(deleteRecipesQuery, [recipeId, userId]);

    console.log(`Deleted recipe ${recipeId} and post for user ${userId}`);
    res.redirect("/user/" + userId);
  } catch (error) {
    console.error("Error deleting recipe/post:", error);
    res.status(500).send("Failed to delete recipe/post.");
  }
});

// ✅ Permanently delete user (soft-delete to Deleted_users)
app.post("/user/:id/delete", async (req, res) => {
  try {
    const userId = req.params.id;

    const [[user]] = await db.query('SELECT * FROM users WHERE user_ID = ?', [userId]);
    if (!user) return res.status(404).send("User not found");

    await db.query(`
      INSERT INTO Deleted_users (user_ID, admin_ID, delete_states, delete_date)
      VALUES (?, ?, ?, NOW())
    `, [userId, req.session.admin?.id || null, 'Deleted by admin']);

    await db.query('DELETE FROM users WHERE user_ID = ?', [userId]);

    res.redirect("/admin");
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).send("Failed to delete user.");
  }
});
// ✅ View a banned user (by ban ID)
app.get('/banned-user/:id', async (req, res) => {
  const banId = req.params.id;
  try {
    const [[user]] = await db.query('SELECT * FROM Banned_users WHERE ban_ID = ?', [banId]);

    if (!user) return res.status(404).send('Banned user not found');

    res.render('bannedusers', { bannedUsers: [user], singleView: true });
  } catch (err) {
    console.error('Error fetching banned user:', err);
    res.status(500).send('Server error');
  }
});

// ✅ Unban a user
app.post('/banned-user/:id/unban', async (req, res) => {
  const banId = req.params.id;
  try {
    const [[bannedUser]] = await db.query('SELECT * FROM Banned_users WHERE ban_ID = ?', [banId]);
    if (!bannedUser) return res.status(404).send('User not found');

    await db.query('DELETE FROM Banned_users WHERE ban_ID = ?', [banId]);
    res.redirect('/admin');
  } catch (err) {
    console.error('Unban Error:', err);
    res.status(500).send('Error unbanning user');
  }
});

// ✅ View deleted user
app.get('/deleted-user/:id', async (req, res) => {
  const deleteId = req.params.id;
  try {
    const [[deleted]] = await db.query(`
      SELECT d.*, u.first_name, u.last_name, u.email, u.date_of_birth, u.age, u.user_password, u.badge
      FROM Deleted_users d
      LEFT JOIN users u ON d.user_ID = u.user_ID
      WHERE d.delete_ID = ?
    `, [deleteId]);

    if (!deleted) return res.status(404).send('Deleted user not found');

    const [[userBackup]] = await db.query(`
      SELECT * FROM users WHERE user_ID = ?
    `, [deleted.user_ID]);

    res.render('deletedUser', {
      user: userBackup || deleted
    });

  } catch (err) {
    console.error('Error fetching deleted user:', err);
    res.status(500).send('Server error');
  }
});

// ✅ Restore a deleted user
app.post('/deleted-user/:id/restore', async (req, res) => {
  const deleteId = req.params.id;
  try {
    const [[deleted]] = await db.query(`SELECT * FROM Deleted_users WHERE delete_ID = ?`, [deleteId]);
    if (!deleted) return res.status(404).send("Deleted user not found.");

    const [[userInfo]] = await db.query(`SELECT * FROM users WHERE user_ID = ?`, [deleted.user_ID]);

    if (!userInfo) {
      await db.query(`
        INSERT INTO users (user_ID, first_name, last_name, email, date_of_birth, age, user_password, badge)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        deleted.user_ID,
        deleted.first_name || null,
        deleted.last_name || null,
        deleted.email || null,
        deleted.date_of_birth || null,
        deleted.age || null,
        deleted.user_password || null,
        deleted.badge || null
      ]);
    }

    await db.query(`DELETE FROM Deleted_users WHERE delete_ID = ?`, [deleteId]);
    res.redirect('/admin');
  } catch (error) {
    console.error('Error restoring deleted user:', error);
    res.status(500).send('Failed to restore user');
  }
});
// ✅ Fallback route
app.use((req, res) => {
  res.status(404).send('Page Not Found');
});

// ✅ Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
