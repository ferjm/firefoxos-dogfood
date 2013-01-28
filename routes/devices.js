var api = require('../models/api.js');

exports.getAll = function(req, res) {
  res.send('this gets all devices');
};

exports.createNew = function(req, res) {
  api.getAllUsers(function(error, users) {
    if (error) {
      res.send(500);
      return;
    }
    res.render('devicenew', { users: users });
  });
};