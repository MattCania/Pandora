function isAuthenticated(req, res, next) {
  if (req.session.userId) {
    next();
  } else {
    res.status(400).json({message: "No logged in accounts found"})
  }
}
module.exports = isAuthenticated;
