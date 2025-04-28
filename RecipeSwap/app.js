const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('express-flash');
const path = require('path');
const userController = require('./app/controllers/userController');
const db = require('./app/services/db');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));
app.use(flash());
app.use((req, res, next) => {
  res.locals.isAdminPage = req.originalUrl.startsWith('/admin'); // Check if the URL starts with '/admin'
  next();
});

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

// Routes
app.get('/', (req, res) => {
  if (req.session.user) return res.redirect('/dashboard');
  res.render('login');
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
    const [recipes] = await db.query('SELECT * FROM recipes');
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


// Route for rendering the 'Post a Recipe' form
app.get('/recipe-post', (req, res) => {
  res.render('recipe_post'); // This will render the 'recipe_post.pug' file
});


const multer = require('multer');

// Set up multer for file upload handling
const upload = multer({ dest: 'public/images/' }); // Images will be stored in the 'public/images' directory

// Handle recipe submission with image upload
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
});

// Route to handle the swap request
app.post('/swap/send', async (req, res) => {
  const { target_recipe_id, your_recipe_id } = req.body;
  const senderId = req.session.user?.id;

  if (!senderId) {
    req.flash('error', 'You must be logged in to request a swap.');
    return res.redirect('/login');
  }
  if (!target_recipe_id || !your_recipe_id) {
    req.flash('error', 'Please select a valid recipe for swapping.');
    return res.redirect('/swap');
  }

  // Get receiver id
  const [[targetRecipe]] = await db.query(
    'SELECT user_id FROM recipes WHERE recipe_id = ?',
    [target_recipe_id]
  );
  if (!targetRecipe) {
    req.flash('error', 'Target recipe does not exist.');
    return res.redirect('/swap');
  }
  const receiverId = targetRecipe.user_id;

  try {
    await db.query(
      'INSERT INTO swaps (sender_id, receiver_id, recipe_sent, recipe_received, status) VALUES (?, ?, ?, ?, ?)',
      [senderId, receiverId, your_recipe_id, target_recipe_id, 'pending']
    );
    req.flash('success', 'Your swap request has been sent! ✅');
    res.redirect('/swap');
  } catch (err) {
    console.error('Error processing swap:', err);
    req.flash('error', 'There was an error processing your swap.');
    res.redirect('/swap');
  }
});




// Admin Dashboard
app.get("/admin", async (req, res) => {
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

    // Execute all queries in parallel
    const results = await Promise.all(queries.map(q => db.query(q)));

    // Extract data only (the first element of each query result)
    const [admins, users, bannedUsers, approvedUsers, deletedUsers, categories, favourites, posts, recipes, reviews] = results.map(result => result[0]);

    // Render the admin page and pass the extracted data
    res.render("admin", {
      admins,
      users,
      bannedUsers,
      approvedUsers,
      deletedUsers,
      categories,
      favourites,
      posts,
      recipes,
      reviews,
    });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).send("Failed to fetch admin data.");
  }
});

app.get("/adminSingle/:id", async (req, res) => {
  try {
    const [[admin]] = await db.query("SELECT admin_ID, name, email FROM Admin_info WHERE admin_ID = ?", [req.params.id]);
    if (!admin) return res.status(404).send("Admin not found");
    res.render("adminSingle", { data: admin });
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});


// Africa Page with Filter
app.get('/africa', async (req, res) => {
  const selectedCategory = req.query.dietary_category || ''; // Default is empty if no filter is selected
  let query = 'SELECT r.*, c.name as category_name FROM recipes r JOIN categories c ON r.category_id = c.category_id WHERE c.name = "African"';

  // If a dietary category is selected, filter the recipes based on that
  if (selectedCategory) {
    query += ' AND r.dietary_category = ?';
  }

  try {
    const [recipes] = await db.query(query, [selectedCategory]);

    res.render('africa', { 
      recipes,
      selectedCategory // Pass the selected category back to Pug to persist the selection
    });
  } catch (err) {
    console.error("Error fetching Africa recipes:", err);
    res.status(500).send("Internal Server Error");
  }
});

// Australia page
app.get('/australia', async (req, res) => {
  const selectedCategory = req.query.dietary_category || ''; // Default is empty if no filter is selected
  let query = 'SELECT r.*, c.name as category_name FROM recipes r JOIN categories c ON r.category_id = c.category_id WHERE c.name = "Australian"';

  // If a dietary category is selected, filter the recipes based on that
  if (selectedCategory) {
    query += ' AND r.dietary_category = ?';
  }

  try {
    const [recipes] = await db.query(query, [selectedCategory]);

    res.render('australia', { 
      recipes,
      selectedCategory // Pass the selected category back to Pug to persist the selection
    });
  } catch (err) {
    console.error("Error fetching Australia recipes:", err);
    res.status(500).send("Internal Server Error");
  }
});

//Europe page
app.get('/europe', async (req, res) => {
  const selectedCategory = req.query.dietary_category || ''; // Default is empty if no filter is selected
  let query = 'SELECT r.*, c.name as category_name FROM recipes r JOIN categories c ON r.category_id = c.category_id WHERE c.name = "European"';

  // If a dietary category is selected, filter the recipes based on that
  if (selectedCategory) {
    query += ' AND r.dietary_category = ?';
  }

  try {
    const [recipes] = await db.query(query, [selectedCategory]);

    res.render('europe', { 
      recipes,
      selectedCategory // Pass the selected category back to Pug to persist the selection
    });
  } catch (err) {
    console.error("Error fetching Europe recipes:", err);
    res.status(500).send("Internal Server Error");
  }
});

// Asia Page
app.get('/asia', async (req, res) => {
  const selectedCategory = req.query.dietary_category || ''; // Default is empty if no filter is selected
  let query = 'SELECT r.*, c.name as category_name FROM recipes r JOIN categories c ON r.category_id = c.category_id WHERE c.name = "Asian"';

  // If a dietary category is selected, filter the recipes based on that
  if (selectedCategory) {
    query += ' AND r.dietary_category = ?';
  }

  try {
    const [recipes] = await db.query(query, [selectedCategory]);

    res.render('asia', { 
      recipes,
      selectedCategory // Pass the selected category back to Pug to persist the selection
    });
  } catch (err) {
    console.error("Error fetching Asia recipes:", err);
    res.status(500).send("Internal Server Error");
  }
});

// Middle Eastern Page
app.get('/middle-eastern', async (req, res) => {
  const selectedCategory = req.query.dietary_category || ''; // Default is empty if no filter is selected
  let query = 'SELECT r.*, c.name as category_name FROM recipes r JOIN categories c ON r.category_id = c.category_id WHERE c.name = "Middle Eastern"';

  // If a dietary category is selected, filter the recipes based on that
  if (selectedCategory) {
    query += ' AND r.dietary_category = ?';
  }

  try {
    const [recipes] = await db.query(query, [selectedCategory]);

    res.render('middle-eastern', { 
      recipes,
      selectedCategory // Pass the selected category back to Pug to persist the selection
    });
  } catch (err) {
    console.error("Error fetching Middle Eastern recipes:", err);
    res.status(500).send("Internal Server Error");
  }
});

// North American Page
app.get('/north-america', async (req, res) => {
  const selectedCategory = req.query.dietary_category || ''; // Default is empty if no filter is selected
  let query = 'SELECT r.*, c.name as category_name FROM recipes r JOIN categories c ON r.category_id = c.category_id WHERE c.name = "North American"';

  // If a dietary category is selected, filter the recipes based on that
  if (selectedCategory) {
    query += ' AND r.dietary_category = ?';
  }

  try {
    const [recipes] = await db.query(query, [selectedCategory]);

    res.render('north-america', { 
      recipes,
      selectedCategory // Pass the selected category back to Pug to persist the selection
    });
  } catch (err) {
    console.error("Error fetching North American recipes:", err);
    res.status(500).send("Internal Server Error");
  }
});

// South American Page
app.get('/south-america', async (req, res) => {
  const selectedCategory = req.query.dietary_category || ''; // Default is empty if no filter is selected
  let query = 'SELECT r.*, c.name as category_name FROM recipes r JOIN categories c ON r.category_id = c.category_id WHERE c.name = "South American"';

  // If a dietary category is selected, filter the recipes based on that
  if (selectedCategory) {
    query += ' AND r.dietary_category = ?';
  }

  try {
    const [recipes] = await db.query(query, [selectedCategory]);

    res.render('south-america', { 
      recipes,
      selectedCategory // Pass the selected category back to Pug to persist the selection
    });
  } catch (err) {
    console.error("Error fetching South American recipes:", err);
    res.status(500).send("Internal Server Error");
  }
});





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



// 404 Fallback
app.use((req, res) => {
  res.status(404).send('Page Not Found');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
