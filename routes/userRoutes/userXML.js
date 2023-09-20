// Import the user model
const User = require('../../models/DBsetup').getUserMainModel();

// Define an async function to handle the request
module.exports = async (req , res) => {
  // Retrieve the user ID from the session
  const userID = req.session.userID;
    
  // If the user ID is found in the session
  if (userID) {
    // Find the user in the database using the user ID
    const user = await User.findOne({'_id': userID});  
    
    // If the user is found
    if (user) {
      // Construct the XML representation of the user
      const userXML = `
      <user>
        <created>${user.created}</created>
        <firstName>${user.firstName}</firstName>
        <lastName>${user.lastName}</lastName>
        <email>${user.email}</email>
        <projects>${user.projects}</projects>
        <frequency>${user.frequency}</frequency>
      </user>
      `
      
      // Set the Content-Type header to 'application/xml'
      res.setHeader('Content-Type', 'application/xml');

      // Send the XML data in the response
      res.send(userXML);
    }
  } else {
    // If the user ID is not found in the session, render the user view with an error message
    res.render('userView', { currentTab: 'user', title: "User Preferences", message: "No user found."});
  }        
};
