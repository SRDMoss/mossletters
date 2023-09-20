// deleteUserByUser.js: Deletes a user from both Main and Login collections and redirects to login view.

const Main = require('../../models/DBsetup').getUserMainModel();
const Login = require('../../models/DBsetup').getUserLoginsModel();

module.exports = async (req, res) => {      
  // Extract the user ID from the session
  let userID = req.session.userID;

  // Find the user in Main and Login collections by ID
  let user = await Main.findById(userID);

  // Send 404 if user or login not found.
  if (!user) {
    return res.status(404).send('No User found.'); // Or handle this case however you want
  }
  
  let login = await Login.findById(user.loginID);


  // Delete the user from Main collection if found
  if (user) { await Main.deleteOne({ _id: userID }); }
  // Delete the corresponding login from Login collection if found
  if (login) { await Login.deleteOne({ _id: login._id }); }

  // Sent JSON for async response
  return res.status(200).send("User and Login successfully deleted");
};
