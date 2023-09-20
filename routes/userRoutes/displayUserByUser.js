// displayUserByUser.js: Renders the view for a user's preferences.

const User = require('../../models/DBsetup').getUserMainModel();

module.exports = async (req , res) => {
  const userID = req.session.userID;

  // Check if the user is logged in (has userID)
  if (userID) {
    // Find the user in the database
    const user = await User.findOne({'_id': userID});
    if (user) {
      const userObject = user.toObject();

      // Prepare checkbox and radio data for rendering
      const checkboxes = {};
      const radios = {};
      for (const projectName of user.projects) {
        checkboxes[projectName] = true;
      }
      radios[user.frequency] = true;

      // Render the user's view with their preferences
      res.render('userView', {
        currentTab: 'user',
        title:"User Preferences",
        user: userObject,
        checkboxes,
        radios,
      });
    }
  } else {
    // Render the user view without preferences if not logged in
    res.render('userView', { title: "User Preferences" });
  }
};
