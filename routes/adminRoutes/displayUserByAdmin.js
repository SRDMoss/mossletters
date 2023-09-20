// displayUserByAdmin.js: Displays user details by admin based on email
const User = require('../../models/DBsetup').getUserMainModel();

module.exports = async (req, res) => {
  // Get email from the submitted form data
  const userEmail = req.body['edit-email'];

  // If email is provided, fetch user data and display the details
  if (userEmail) {
    // Find the user based on the provided email
    let user = await User.findOne({'email': userEmail});

    // Create checkbox and radio configurations for user projects and frequency
    const checkboxes = {};
    const radios = {};

    if (user.projects) {
      for (const projectName of user.projects) {
        checkboxes[projectName] = true;
      }
    }

    radios[user.frequency] = true;

    // Convert the user document to an object
    user = user.toObject();

    // Render the admin view with the user details and configurations
    res.render('adminView', {
      currentTab: 'admin',
      title:"User Preferences",
      user: user,
      checkboxes,
      radios,
      toolChoice: true,   
      filterOptions: false, 
      showTable: false,
      filterButtons: false,
      enterUser: false, 
      displayUser: true,
      editButtons: true
    });
  } else {
    // If email not provided, render admin view with an error message
    res.render('adminView', {
      currentTab: 'admin',
      title: "Admin Tools - Edit User", 
      message: 'No subscriber with that email',
      toolChoice: true,   
      filterOptions: false, 
      showTable: false,
      filterButtons: false,
      enterUser: false, 
      displayUser: false,
      editButtons: false 
    });
  }       
};
