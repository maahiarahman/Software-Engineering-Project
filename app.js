const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('express-flash');
const path = require('path');
const adminController = require('./app/controllers/adminController');
const userController = require('./app/controllers/userController');
const db = require('./app/services/db');
const bcrypt = require('bcryptjs');
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
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

// Expose session to views
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  res.locals.year = new Date().getFullYear();
  next();
});

// Middleware for injecting user and year information into locals
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  res.locals.year = new Date().getFullYear();
  res.locals.isAdminPage = req.originalUrl.startsWith('/admin');
  next();
});

res.render('user-profile', {
  user: userData,
  recipes: userRecipes,
  reviews: userReviews,
  posts: userPosts,
  swaps: swapRequests // ⬅️ You must include this array!
});

// Routes
app.get('/', (req, res) => {
  res.redirect('/splash');
});

app.get('/dashboard', async (req, res) => {
  console.log('Dashboard route accessed');
  if (!req.session.user) return res.redirect('/login');
  try {
    const [recipes] = await db.query('SELECT * FROM recipes');
    console.log('Fetched recipes:', recipes);
    res.render('dashboard', { recipes });
  } catch (err) {
    console.error('Error fetching dashboard:', err);
    res.status(500).send('Error loading dashboard.');
  }
});

app.get('/swap', async (req, res) => {
  if (!req.session.user) return res.redirect('/login');

  try {
    const userId = req.session.user.id;

    const [recipes] = await db.query('SELECT * FROM recipes WHERE user_id != ?', [userId]);
    const [userRecipes] = await db.query('SELECT * FROM recipes WHERE user_id = ?', [userId]);

    res.render('swap', {
      recipes,
      userRecipes,
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



app.get('/about', (req, res) => {
  const teamMembers = [
    {
      name: 'Sumana',
      role: 'The Creative Force',
      desc: 'Sumana crafted the branding and user journey, giving Recipe Swap its heart and personality.',
      img: 'sumana.jpg'
    },
    {
      name: 'Shaiza',
      role: 'The Technical Chef',
      desc: 'Shaiza engineered the backend and database. Her work powers the platform under the hood.',
      img: 'shaiza.jpg'
    },
    {
      name: 'Aneeta',
      role: 'The Perfectionist',
      desc: 'Aneeta was our quality gatekeeper, refining UI and interactions until flawless.',
      img: 'aneeta.jpg'
    },
    {
      name: 'Maahia',
      role: 'The Architect',
      desc: 'Maahia tied everything together with full-stack logic. Her architecture makes Recipe Swap scalable.',
      img: 'maahia.jpg'
    }
  ];

  res.render('about', { teamMembers });
});


app.get('/contact', (req, res) => {
  res.render('contact');
});

app.get('/terms', (req, res) => {
  res.render('terms');
});

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

// Dashboard
app.get('/dashboard', async (req, res) => {
  if (!req.session.user) return res.redirect('/login');
  try {
    const [recipes] = await db.query(`
      SELECT r.*, u.first_name, u.user_id
      FROM recipes r
      JOIN users u ON r.user_id = u.user_id
    `);
    res.render('dashboard', { recipes });
  } catch (err) {
    console.error('Error fetching dashboard:', err);
    res.status(500).send('Error loading dashboard.');
  }
});

// Recipes
app.get('/recipes', async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM recipes');
    res.render('recipes', { recipes: results });
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

app.post('/swap/send', async (req, res) => {
  const { target_recipe_id, target_user_id, your_recipe_id } = req.body;
  const userId = req.session.user ? req.session.user.id : null;

  if (!userId) {
    return res.status(400).send("You must be logged in to request a swap.");
  }

  try {
    // Insert the swap request into the database
    await db.query(
      'INSERT INTO swaps (recipe_id, user_id, swapped_recipe_id, swap_status) VALUES (?, ?, ?, ?)',
      [your_recipe_id, userId, target_recipe_id, 'pending']
    );
    res.redirect('/dashboard');  // Redirect to the dashboard after sending the swap request
  } catch (err) {
    console.error('Error processing swap:', err);
    res.status(500).send('Error processing swap');
  }
});

// Route for rendering the 'Post a Recipe' form
app.get('/recipe-post', (req, res) => {
  res.render('recipe_post'); // This will render the 'recipe_post.pug' file
});


const multer = require('multer');

// Set up multer for file upload handling
const upload = multer({ dest: 'public/images/' }); // Images will be stored in the 'public/images' directory

// Handle recipe submission with image upload
app.post('/recipes', upload.single('image'), async (req, res) => {
  const { name, description, ingredients, instructions, category } = req.body;
  const imageUrl = req.file ? `/images/${req.file.filename}` : 'default.jpg'; // Set image URL or default

  // Get the user_id from session (ensure the user is logged in)
  const userId = req.session.user ? req.session.user.id : null;

  if (!userId) {
    return res.status(400).send("User must be logged in to post a recipe.");
  }

  try {
    // Insert the recipe into the database
    await db.query(
      'INSERT INTO recipes (name, description, ingredients, instructions, category_id, image_url, user_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, description, ingredients, instructions, category, imageUrl, userId]
    );
    res.redirect('/dashboard');  // Redirect to the dashboard page after submission
  } catch (err) {
    console.error('Error inserting recipe:', err);
    res.status(500).send('Error inserting recipe');
  }
});

app.post('/swap/send', async (req, res) => {
  const { target_recipe_id, target_user_id, your_recipe_id } = req.body;
  const userId = req.session.user ? req.session.user.id : null;

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


// Route to submit a review
app.post('/reviews', async (req, res) => {
  const { recipeId, reviewText, rating } = req.body;
  const userId = req.session.user ? req.session.user.id : null;

  if (!userId) {
    return res.status(400).send("You must be logged in to submit a review.");
  }

  try {
    await db.query(
      'INSERT INTO reviews (recipe_id, user_id, rating, comment) VALUES (?, ?, ?, ?)',
      [recipeId, userId, rating, reviewText]
    );
    res.redirect('/reviews'); // Redirect to the reviews page after submission
  } catch (err) {
    console.error('Error inserting review:', err);
    res.status(500).send('Error inserting review');
  }
});

// Route to show details of a recipe and its reviews
app.get('/recipes/:id', async (req, res) => {
  const recipeId = req.params.id; // Get the recipe ID from the URL
  try {
    const [recipe] = await db.query('SELECT * FROM recipes WHERE recipe_id = ?', [recipeId]);

    if (recipe.length > 0) {
      // Get reviews for the recipe
      const [reviews] = await db.query(`
        SELECT r.*, u.first_name, u.last_name
        FROM reviews r
        JOIN users u ON r.user_id = u.user_id
        WHERE r.recipe_id = ?
      `, [recipeId]);

      res.render('recipe_detail', { 
        recipe: recipe[0],  // Pass the recipe details
        reviews: reviews    // Pass the reviews for the recipe
      });
    } else {
      res.status(404).send('Recipe not found');
    }
  } catch (err) {
    console.error('Error fetching recipe details:', err);
    res.status(500).send('Internal Server Error');
  }
})


// Users list
app.get('/users', async (req, res) => {
  try {
    const [results] = await db.query(`
      SELECT user_ID, first_name, last_name, email, 
             DATE_FORMAT(date_of_birth, "%m/%d/%Y") AS formatted_dob, 
             age 
      FROM users
    `);
    res.render("users", { users: results });
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});


app.get('/profile/:id', async (req, res) => {
  if (!req.session.user) return res.redirect('/login'); // Ensure user is logged in

  const userId = req.params.id;
  try {
    // Fetch user details
    const [user] = await db.query('SELECT * FROM users WHERE user_ID = ?', [userId]);
    // Fetch user recipes
    const [user_recipes] = await db.query('SELECT recipe_id, name, description FROM recipes WHERE user_ID = ?', [userId]);
    // Fetch user reviews
    const [user_reviews] = await db.query('SELECT comment, rating FROM reviews WHERE user_ID = ?', [userId]);

    if (user.length > 0) {
      res.render('profile', { 
        user: user[0], 
        user_recipes: user_recipes, 
        user_reviews: user_reviews
      });
    } else {
      res.status(404).send('User not found');
    }
  } catch (err) {
    console.error('Error fetching user profile:', err);
    res.status(500).send('Internal Server Error');
  }
});

//splash page
app.get('/splash', (req, res) => {
  res.render('splash');  // This will render the splash.pug file when visiting the /splash URL.
});

//admin stuff dont touch 
function isAdmin(req, res, next) {
  if (req.session.admin) {
    return next(); // Allow access
  }
  res.status(403).send("Access denied. Admins only.");
}

app.get('/adminlogin', (req, res) => res.render('admin-login'));
app.post('/adminlogin', userController.adminLogin);
//admin route 
app.get('/admin',isAdmin, async function (req, res) {
  console.log('Admin route is being accessed');  // Check if this is logged
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

    // Render the admin page without any admin login requirement
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

// Route to display a single admin member's details
app.get("/adminSingle/:id", function(req, res) {
  const adminId = req.params.id;
  console.log("Requested Admin ID:", adminId);

  const sql = "SELECT admin_ID, name, email FROM Admin_info WHERE admin_ID = ?";

  db.query(sql, [adminId])
    .then(([results]) => {
      if (results.length > 0) {
        console.log("Admin Found:", results[0]); // ✅ add this log
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

app.get("/user/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    console.log("Fetching user with ID:", userId);

    const userQuery = `
      SELECT u.user_ID, u.first_name, u.last_name, u.email, DATE_FORMAT(u.date_of_birth,"%m/%d/%Y") AS format_dob,
             u.date_of_birth, u.age, u.user_password,
             CASE WHEN b.user_ID IS NOT NULL THEN 1 ELSE 0 END AS isBanned
      FROM users u
      LEFT JOIN Banned_users b ON u.user_ID = b.user_ID
      WHERE u.user_ID = ?;
    `;

    const recipesQuery = `SELECT * FROM recipes WHERE user_ID = ?`;
    const reviewsQuery = `SELECT * FROM reviews WHERE user_ID = ?`;
    const postsQuery = `SELECT * FROM posts WHERE user_ID = ?`;

    const [userResult, recipes, posts, reviews] = await Promise.all([
      db.query(userQuery, [userId]),
      db.query(recipesQuery, [userId]),
      db.query(postsQuery, [userId]),
      db.query(reviewsQuery, [userId])
    ]);

    const user = userResult[0][0]; // Extract the actual user data row

    if (!user) {
      return res.status(404).send("User not found");
    }

    // ✅ Log the user to the terminal
    console.log("User object being passed:", user);

    res.render("userProfile", {
      user,
      recipes: recipes[0],
      posts: posts[0],
      reviews: reviews[0]
    });

  } catch (error) {
    console.error("Database error:", error);
    res.status(500).send("Failed to fetch user data.");
  }
});

app.post("/user/:id/ban", async (req, res) => {
  try {
    const userId = req.params.id;

    // ✅ Insert user_ID into Banned_users (ban_ID auto-increments now)
    const query = `INSERT INTO Banned_users (user_ID) VALUES (?);`;

    // Optional: remove from approve_users table
    const deleteQuery = `DELETE FROM approve_users WHERE user_ID = ?`;

    await db.query(query, [userId]);
    await db.query(deleteQuery, [userId]);

    res.redirect("/user/" + userId);
  } catch (error) {
    console.error("Error banning user:", error);
    res.status(500).send("Failed to ban user.");
  }
});

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

app.post("/user/:userId/recipes/:recipeId/delete", async (req, res) => {
  try {
      const { userId, recipeId } = req.params;

      // Delete from the posts table first (if a post is linked to the recipe)
      const deletePostsQuery = `DELETE FROM posts WHERE recipe_ID = ? AND user_ID = ?`;
      await db.query(deletePostsQuery, [recipeId, userId]);

      // Then delete from the recipes table
      const deleteRecipesQuery = `DELETE FROM recipes WHERE recipe_ID = ? AND user_ID = ?`;
      await db.query(deleteRecipesQuery, [recipeId, userId]);

      console.log(`Deleted recipe ${recipeId} and its post for user ${userId}`);

      res.redirect("/user/" + userId);
  } 
  catch (error) {
      console.error("Error deleting recipe and post:", error);
      res.status(500).send("Failed to delete recipe and post.");
  }
});
app.post("/user/:id/delete", async (req, res) => {
  try {
    const userId = req.params.id;

    // Fetch user before deleting for logging or archiving (optional)
    const [[user]] = await db.query('SELECT * FROM users WHERE user_ID = ?', [userId]);

    if (!user) {
      return res.status(404).send("User not found");
    }

    // Move to Deleted_users table
    await db.query(
      `INSERT INTO Deleted_users (user_ID, admin_ID, delete_states, delete_date)
       VALUES (?, ?, ?, NOW())`,
      [userId, req.session.admin?.id || null, 'Deleted by admin']
    );

    // Delete from users table
    await db.query('DELETE FROM users WHERE user_ID = ?', [userId]);

    res.redirect("/admin"); 
  } catch (error) {
    console.error(" Error deleting user:", error);
    res.status(500).send("Failed to delete user.");
  }
});
//admin unban 
app.get('/banned-user/:id', async (req, res) => {
  const banId = req.params.id;
  try {
    const [[user]] = await db.query('SELECT * FROM Banned_users WHERE ban_ID = ?', [banId]);

    if (!user) {
      return res.status(404).send('Banned user not found');
    }

    res.render('bannedusers', { bannedUsers: [user], singleView: true });
  } catch (err) {
    console.error('Error fetching banned user:', err);
    res.status(500).send('Server error');
  }
});

// POST: Unban the user
app.post('/banned-user/:id/unban', async (req, res) => {
  const banId = req.params.id;

  try {
    const [[bannedUser]] = await db.query('SELECT * FROM Banned_users WHERE ban_ID = ?', [banId]);

    if (!bannedUser) {
      return res.status(404).send('User not found');
    }

    await db.query('DELETE FROM Banned_users WHERE ban_ID = ?', [banId]);

    res.redirect('/admin');
  } catch (err) {
    console.error('Unban Error:', err);
    res.status(500).send('Error unbanning user');
  }
});

app.get('/deleted-user/:id', async (req, res) => {
  const deleteId = req.params.id;
  try {
    const [[deleted]] = await db.query(`
      SELECT d.*, u.first_name, u.last_name, u.email, u.date_of_birth, u.age, u.user_password, u.badge
      FROM Deleted_users d
      LEFT JOIN users u ON d.user_ID = u.user_ID
      WHERE d.delete_ID = ?
    `, [deleteId]);

    if (!deleted) {
      return res.status(404).send('Deleted user not found');
    }

   
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
app.post('/deleted-user/:id/restore', async (req, res) => {
  const deleteId = req.params.id;
  try {
    const [[deleted]] = await db.query(`
      SELECT * FROM Deleted_users WHERE delete_ID = ?
    `, [deleteId]);

    if (!deleted) {
      return res.status(404).send("Deleted user not found.");
    }

   
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





// 404 Fallback
app.use((req, res) => {
  res.status(404).send('Page Not Found');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
