var api = require('../models/apiDevices.js');

exports.getAll = function(req, res) {
  console.log("getALl");
  api.getAllWithDevice(function(error, devices) {
    if (error) {
      res.send(500);
      return;
    }
    res.render('deviceall', { devices: devices, active: 'admin' });
  });
};

exports.createNew = function(req, res) {
  api.getAll(function(error, users) {
    if (error) {
      res.send(500);
      return;
    }
    console.log(JSON.stringify(users));
    res.render('devicenew', { users: users, active: 'admin' });
  });
};

exports.createNewProcess = function(req, res) {
  api.newDevice(req.body.email, req.body.imei, function(error) {
    if (error) {
      res.send(500);
      return;
    }
    res.redirect('/user/' + req.body.email);
  });
};

exports.remove = function(req, res) {
  api.remove(req.params.imei, function(error) {
    if (error) {
      res.send(500);
      return;
    }
    res.redirect('/device/all');
  });
};
