// updateUserbyUser.js: Updates user preferences in the database and renders the user view.

const Main = require('../../models/DBsetup').getUserMainModel();

module.exports = async (req , res) => {
    // Retrieve the user's ID from the session
    let userID = req.session.userID;

    // Find the user by ID
    let user = await Main.findById(userID);

    if (user) {
        // Update user fields with the data from the request body
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.email = req.body.email;
        user.frequency = req.body.frequency;
        user.projects = req.body.projects;
        
        // Save the updated user information
        const updatedUser = await user.save(); 
        const thisUser = updatedUser.toObject();

        // Prepare checkbox data for rendering
        const checkboxes = {};
        for (const projectName of updatedUser.projects) {
          checkboxes[projectName] = true;
        }

        // Prepare radio data for rendering
        const radios = { [req.body.frequency]: true };

        // Render the user's view with the updated preferences
        res.render('userView', {
            currentTab: 'user',
            title: 'User Preferences', 
            message: 'Preferences Updated Successfully.',
            user: thisUser,
            checkboxes,
            radios
        }); 
    } else {
        // If user not found, redirect to login view with an error message
        res.status(404).render('loginView', { currentTab: 'login', title: "Log in or Sign Up", message: "No user found, please log-in again." });
    }          
};
