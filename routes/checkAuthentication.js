// Middleware used to check if user is logged in on routes that require it.

function checkAuthentication(req, res, next) {
  if (req.session.userID) {
    next(); // User is logged in, proceed to the next route handler
  } else {
    // User is not logged in, send 401 status and render login view with a message
    res.status(401).render('loginView', {message: "Please log-in to use the Mossletters application."});
  }
}
module.exports = checkAuthentication;
