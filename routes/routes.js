// routes.js: Manages all application routes, including user, admin, and login-related endpoints.
const express = require('express');
const userRouter = require('./userRoutes');
const adminRouter = require('./adminRoutes');
const displayLogin = require('./loginRoutes/displayLogin');
const submitRegistration = require('./loginRoutes/submitRegistration');
const authenticateLogin = require('./loginRoutes/authenticateLogin');

// Create main router
const router = express.Router();

// Include sub-routers for different concerns
router.use('/user', userRouter);
router.use('/admin', adminRouter);

// Login-related routes
router.get('/', (req, res) => res.redirect('/mossletters/login')); // Redirect root to login page
router.get('/login', displayLogin); // Display login page
router.post('/login/authenticate', authenticateLogin); // Handle login authentication
router.post('/login/register', submitRegistration); // Handle user registration

// Export router for use in main application
module.exports = router;
