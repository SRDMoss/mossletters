// userJSON.js: JSON endpoint for user's record
const User = require('../../models/DBsetup').getUserMainModel();

// Define an async function to handle the request
module.exports = async (req, res) => {
  // Retrieve the user ID from the session
  const userID = req.session.userID;

  // If the user ID is found in the session
  if (userID) {
    // Find the user in the database using the user ID
    const user = await User.findOne({'_id': userID});
    
    // If the user is found
    if (user) {
      // Send the user data as JSON
      res.json({ user });
    }
  } else {
    // If the user ID is not found in the session, render the user view with an error message
    res.render('userView', { title: "User Preferences", message: "No user found." });
  }
};
