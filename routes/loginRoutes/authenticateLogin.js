const LoginUser = require('../../models/DBsetup').getUserLoginsModel();
const MainUser = require('../../models/DBsetup').getUserMainModel();
const bcrypt = require('bcrypt');

module.exports = async function authenticateLogin(req, res) {
  try {
    // Find the user based on the provided email address
    const user = await LoginUser.findOne({email: req.body['current-email']});

    if (user) {
      // Compare the provided password with the stored hashed password
      const match = await bcrypt.compare(req.body['current-password'], user.password);
      if (match) {
        // Retrieve the main user object using the login ID
        const thisUser = await MainUser.findOne({loginID: user._id});
        // Enter ID into session memory for checking authorization later.
        req.session.userID = thisUser._id;
        const userObject = thisUser.toObject();      
        const savedUser = await thisUser.save();

        // Prepare checkbox and radio data for rendering
        const checkboxes = {};
        const radios = {};
        for (const projectName of savedUser.projects) {
          checkboxes[projectName] = true;
        }
        radios[savedUser.frequency] = true;

        // Successful login: Render the user view
        res.status(200).render('userView', {
          currentTab: 'user',
          title: 'User Settings',
          message: 'Login Successful',
          user: userObject,
          checkboxes,
          radios,
        });
        return;
      }
    }

    // Invalid credentials: Render the login view with an error message
    res.status(401).render('loginView', {
      currentTab: 'login',
      title: 'Login or Register',
      message: 'Invalid credentials'
    });
  } catch (err) {
    // Log and handle any unexpected errors
    console.error(err);
    res.status(500).send('An error occurred while processing your request');
  }
}
