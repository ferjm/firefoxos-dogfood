var async = require('async');

var apiUser = require('../models/apiUser.js'),
    apiFeedback = require('../models/apiFeedback.js'),
    apiUpdates = require('../models/apiUpdates.js');

exports.getAll = function(req, res) {
  apiUser.getAllUsersPartial(function(error, users) {
    if (error) {
      res.send(500);
      return;
    }
    return res.render('userall', { users: users, active: 'admin' });
  });
};

exports.createNew = function(req, res) {
  res.render('usernew', { active: 'admin' });
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
  userData.imei = req.body.imei;

  //If we have SIM, we need to store the phone number
  //and carrier for that SIM
  if (userData.sim) {
    userData.phone_number = req.body.phone_number;
  }

  apiUser.newUser(userData, function(error, user) {
    if(error) {
      res.send(500);
      return;
    }
    res.redirect('/user/all');
  });
};

exports.get = function(req, res) {
  async.parallel([
    function(callback) {
      apiUser.getUser(req.params.email, function(error, user) {
        if (error) {
          callback(error);
          return;
        }
        callback(null, user);
      });
    },
    function(callback) {
      apiFeedback.getAllForEmail(req.params.email, function(error, feedback) {
        if (error) {
          callback(error);
          return;
        }
        callback(null, feedback);
      });
    },
    function(callback) {
      apiUpdates.getAllForEmail(req.params.email, function(error, updates) {
        if (error) {
          callback(error);
          return;
        }
        callback(null, updates);
      });
    }
  ],
  function(error, results) {
    if (error) {
      res.send(500);
      return;
    }
    res.render('user', { user: results[0],
                         feedback: results[1],
                         updates: results[2],
                         active: 'admin' });
  });
};

exports.getForImei = function(req, res) {
  apiUser.getForImei(req.params.imei, function(error, user) {
    if (error) {
      res.send(500);
      return;
    }
    res.render('user', { user: user, active: 'admin' });
  });
};

exports.getComments = function(req, res) {
  apiUser.getCommentsForUser(req.params.email, function(error, comments) {
    if (error) {
      res.send(500);
      return;
    }
    res.render('usercomments', { comments: comments,
                                 user: req.params.email,
                                 active: 'admin' });
  });
};

exports.getUpdates = function(req, res) {
  apiUser.getUser(req.params.email, function(error, user) {
    if (error) {
      res.send(500);
      return;
    }
    apiUser.getDevice(function(error, device) {
      if (error) {
        res.send(500);
        return;
      }
      res.send(JSON.stringify(user) + " -- " + JSON.stringify(device));
      //res.render('userDevice', { device: device, user: user });
    });
  });
};

exports.edit = function(req, res) {
  apiUser.getUser(req.params.email, function(error, user) {
    if (error) {
      res.send(500);
      return;
    }
    res.render('useredit', { user: user, active: 'admin' });
  });
};

exports.update = function(req, res) {
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

  apiUser.update(req.params.email, userData, function(error) {
    if (error) {
      res.send(500);
      return;
    }
    res.redirect('/user/' + req.params.email);
  });
};

exports.remove = function(req, res) {
  apiUser.remove(req.params.email, function(error) {
    if (error) {
      res.send(500);
      return;
    }
    res.redirect('/user/all');
  });
};

