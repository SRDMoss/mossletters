// adminRoutes.js: Manages all admin-related routes and authentication.
const express = require('express');
const displayAdminMain = require('./adminRoutes/displayAdminMain');
const displayFilterOptions = require('./adminRoutes/displayFilterOptions');
const displayFilteredUsers = require('./adminRoutes/displayFilteredUsers');
const filterXML = require('./adminRoutes/filterXML');
const filterJSON = require('./adminRoutes/filterJSON');
const displayUserLookup = require('./adminRoutes/displayUserLookup');
const displayUserByAdmin = require('./adminRoutes/displayUserByAdmin');
const updateUserByAdmin = require('./adminRoutes/updateUserByAdmin');
const deleteUserByAdmin = require('./adminRoutes/deleteUserByAdmin');
const checkAuthentication = require('./checkAuthentication');

// Set up router and authentication middleware
const router = express.Router();
router.use(checkAuthentication);

// Main admin dashboard route
router.get('/', displayAdminMain); // Display main admin dashboard

// Routes for filtering tool
router.get('/filterUsers', displayFilterOptions); // Display filter options
router.get('/filterUsers/show', displayFilteredUsers); // Display filtered users
router.get('/filterUsers/xml', filterXML); // Retrieve filtered users in XML format
router.get('/filterUsers/json', filterJSON); // Retrieve filtered users in JSON format

// Routes for user editing tool
router.get('/user', displayUserLookup); // Display user lookup form
router.post('/user/show', displayUserByAdmin); // Display user by admin
router.post('/user', updateUserByAdmin); // Update user by admin
router.delete('/user/', deleteUserByAdmin); // Delete user by admin

module.exports = router;
