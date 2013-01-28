var api = require('../models/api.js');

exports.getAll = function(req, res) {
  api.getAllUsers(function(error, users) {
    if (error) {
      res.send(500);
      return;
    }
    return res.render('devicenew', { users: users });
  });
};

exports.createNew = function(req, res) {
  res.render('usernew');
};

exports.get = function(req, res) {
  res.send('this gets a req.params.email user');
};

exports.getComments = function(req, res) {
  res.send('this shows all comments for req.params.body user');
};

exports.getUpdates = function(req, res) {
  res.send('this shows all updates for req.params.body user');
};