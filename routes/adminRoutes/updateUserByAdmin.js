// updateUserByAdmin.js: Updates user details by admin based on email

const User = require('../../models/DBsetup').getUserMainModel();

module.exports = async (req, res) => {
  // Get email from the submitted form data
  const email = req.body.email;

  // If email is provided, fetch user data and update the details
  if (email) {
    // Find the user based on the provided email
    const user = await User.findOne({'email': email});

    // Update the user's details with the data from the request
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.email = req.body.email;
    user.frequency = req.body.frequency;
    user.projects = req.body.projects;

    // Save the updated user document
    await user.save();

    // Render the admin view with a success message
    res.render('adminView', { 
      currentTab: 'admin',
      title: "Admin Tools - Edit User",  
      message: 'User updated.',
      toolChoice: true,   
      filterOptions: false, 
      showTable: false,
      filterButtons: false,
      enterUser: false, 
      displayUser: false,
      editButtons: false
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
