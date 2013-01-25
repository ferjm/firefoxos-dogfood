var config = require('../config.js');

exports.isLogged = function(req, res, next) {
  //req.session = null;
  if (req.isAuthenticated()) {
    return next();
  }
  else {
    res.redirect('/login');
  }
};

exports.checkLogin = function(username, password) {
  if (username === config.adminUser &&
      password === config.adminPwd) {
    return true;
  }
  return false;
};