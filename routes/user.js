var api = require('../models/apiUser.js');

exports.getAll = function(req, res) {
  api.getAllUsersPartial(function(error, users) {
    if (error) {
      res.send(500);
      return;
    }
    return res.render('userall', { users: users });
  });
};

exports.createNew = function(req, res) {
  res.render('usernew');
};

exports.createNewProcess = function(req, res) {
  var userData = {};
  userData.first_name = req.body.first_name;
  userData.last_name = req.body.last_name;
  userData.email = req.body.email;
  userData.location = req.body.location;
  userData.primary_phone = req.body.primary_phone;
  userData.carrier = req.body.carrier;
  userData.sim = req.body.sim;

  //If we have SIM, we need to store the phone number
  //and carrier for that SIM
  if (userData.sim) {
    userData.phone_number = req.body.phone_number;
  }

  api.newUser(userData, function(error, user) {
    if(error) {
      res.send(500);
      return;
    }
    res.render('usernew', { user: user });
  });
};

exports.get = function(req, res) {
  api.getUser(req.params.email, function(error, user) {
    if (error) {
      res.send(500);
      return;
    }
    res.send(JSON.stringify(user));
    //res.render('user', { user: user });
  });
};

exports.getComments = function(req, res) {
  api.getCommentsForUser(req.params.email, function(error, comments) {
    if (error) {
      res.send(500);
      return;
    }
    res.render('usercomments', { comments: comments, user: req.params.email });
  });
};

exports.getUpdates = function(req, res) {
  api.getUser(req.params.email, function(error, user) {
    if (error) {
      res.send(500);
      return;
    }
    user.getDevice(function(error, device) {
      if (error) {
        res.send(500);
        return;
      }
      res.send(JSON.stringify(user) + " -- " + JSON.stringify(device));
      //res.render('userDevice', { device: device, user: user });
    });
  });
};

exports.remove = function(req, res) {
  res.send('TODO: Remove user');
};

