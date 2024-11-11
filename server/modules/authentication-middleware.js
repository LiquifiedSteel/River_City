const rejectUnauthenticated = (req, res, next) => {
  // check if logged in
  if (req.isAuthenticated()) {
    // They are logged in! Now check if they are admin.
    if (req.user.isAdmin) {
      next();
    } else {
      res.sendStatus(403);
    }
  } else {
    // failure best handled on the server. do redirect here.
    res.sendStatus(403);
  }
};

module.exports = { rejectUnauthenticated };
