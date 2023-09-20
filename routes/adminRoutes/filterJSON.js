// filterJSON.js: Endpoint to return users selected by admin as JSON

const Main = require('../../models/DBsetup').getUserMainModel();

module.exports = async (req, res) => {
  // Retrieve the frequency and projects filter parameters from the request
  const freq = req.query['admin-frequency'];
  const proj = req.query['admin-projects'];

  // Query the database for users that match the provided frequency and projects filters
  const userList = await Main.find({frequency: freq, projects: { $in: proj }});

  // Check if the userList is not empty
  if (userList) {
    // Send the user list as a JSON response
    res.json({ userList });
  } else {
    // If no users found, render the user view with an appropriate message
    res.render('userView', { currentTab: 'user', title: "User Preferences", message: "No user found." });
  }
};
