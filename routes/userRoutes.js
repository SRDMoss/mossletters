// userRoutes.js: Manages all user-related routes and authentication.

const express  = require('express');
const displayUserByUser  = require('./userRoutes/displayUserByUser');
const updateUserByUser = require('./userRoutes/updateUserByUser');
const deleteUserByUser = require('./userRoutes/deleteUserByUser');
const userXML = require('./userRoutes/userXML');
const userJSON  = require('./userRoutes/userJSON');
const checkAuthentication  = require('./checkAuthentication');

// Set up router and authentication middleware
const router = express.Router();
router.use(checkAuthentication); // Ensure the user is authenticated

// User-related routes
router.get('/', displayUserByUser); // Display user information
router.post('/', updateUserByUser); // Update user information
router.delete('/', deleteUserByUser); // Delete user information
router.get('/xml', userXML); // Retrieve user information in XML format
router.get('/json', userJSON); // Retrieve user information in JSON format

module.exports = router;