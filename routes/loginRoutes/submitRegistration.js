// submitRegistration.js: Create new user document in login and main databases
const LoginUser = require('../../models/DBsetup').getUserLoginsModel();
const MainUser = require('../../models/DBsetup').getUserMainModel();
const bcrypt = require('bcrypt');

module.exports = async function submitRegistration(req, res) {
  // Delete any existing session userID
  delete req.session.userID;

  // Hash the new password
  const hashedPassword = await bcrypt.hash(req.body['new-password'], 10);

  // Create and save a new login document
  const login = new LoginUser({
    email: req.body['email'],
    password: hashedPassword,
  });
  const savedLogin = await login.save();

  // Create and save a new main user document
  let user = new MainUser({
    created: Date(),
    firstName: req.body['first-name'],
    lastName: req.body['last-name'],
    email: req.body['email'],
    loginID: savedLogin._id,
  });
  const savedUser = await user.save();
  req.session.userID = savedUser._id;

  // Prepare checkbox and radio data for rendering: this SHOULD be empty, but just in case! 
  const checkboxes = {};
  const radios = {};
  for (const projectName of user.projects) {
    checkboxes[projectName] = true;
  }        
  radios[user.frequency] = true;

  // Render the user view with a success message
  const savedUserObject = savedUser.toObject();
  res.status(201).render('userView', {
    currentTab: 'user',
    title: 'User Settings',
    message: 'User Added Successfully.',
    user: savedUserObject,
    checkboxes, 
    radios,
  });
}
