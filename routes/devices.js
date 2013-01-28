var api = require('../models/apiDevices.js');

exports.getAll = function(req, res) {
  api.getAll(function(error, devices) {
    if (error) {
      res.send(500);
      return;
    }
    //res.render('alldevices', { devices: devices });
    res.send(JSON.stringify(devices));
  });
};

exports.createNew = function(req, res) {
  api.getAll(function(error, users) {
    if (error) {
      res.send(500);
      return;
    }
    res.render('devicenew', { users: users });
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