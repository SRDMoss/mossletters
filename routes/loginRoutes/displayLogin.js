// displayLogin.js: Renders the login view, setting the current tab and title for the page.

module.exports = (req, res) => {
  res.render('loginView', {
    currentTab: 'login',
    title: "Login or Register",
  });
};
