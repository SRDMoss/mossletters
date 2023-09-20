// deleteUserByAdmin.js: Delete a user by admin based on email

const Main = require('../../models/DBsetup').getUserMainModel();
const Login = require('../../models/DBsetup').getUserLoginsModel();

module.exports = async (req, res) => {      
  // Extract the email from the request body
  let email = req.body.email;

  // Check if email is provided
  if (email) {
    // Find the user details based on the provided email
    const user = await Main.findOne({'email': email}); 

    // Check if the user exists
    if (user) {
      // Delete user and login records from the database
      await Main.deleteOne({email: email});
      await Login.deleteOne({email: email});

      // Render admin view with success message
      res.render('adminView', {
        currentTab: 'admin',
        title: "Delete User", 
        message: "User successfully deleted.",
        toolChoice: true,   
        filterOptions: false, 
        showTable: false,
        filterButtons: false,
        enterUser: false, 
        displayUser: false,
        editButtons: false
      });
    } 
  } else {
    // If email not provided, render admin view with error message
    res.render('adminView', {
      currentTab: 'admin',
      title: "Admin Tools - Delete User", 
      message: "No user with that email.",
      toolChoice: true,   
      filterOptions: false, 
      showTable: false,
      filterButtons: false,
      enterUser: true, 
      displayUser: false,
      editButtons: false
    }); 
  } 
};
