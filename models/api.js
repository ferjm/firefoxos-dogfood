var user = require('./scheme.js'),
    helpers = require('../common/helpers.js');

exports.newUser = function(req, res) {
  new user(
    {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      company: req.body.company,
      phone_number: req.body.phone_number,
      location: req.body.location,
      primary_phone: req.body.primary_phone,
      sim: req.body.sim,
      carrier: req.body.carrier,
      device: {
        imei: req.body.imei
      }
    }
  ).save(function(err, user) {
    if (err) {
      res.send([{err: err}]);
      return;
    }
    res.send([{user: user}]);
  });
};

/**
 * Input: req.params.email
 */
exports.getUser = function(req, res) {
  user.findOne(
    { email: req.params.email },
    { _id: false, email: true, device: true },
    function(err, user) {
      res.send({user: user});
    }
  );
};

/**
 * Input: req.params.email
 */
exports.getCommentsForUser = function(req, res) {
  user.findOne(
    { email: req.params.email },
    function(err, user) {
      user.getComments(function(error, comments) {
        res.send({comments: comments});
      });
    }
  );
};

/**
 * Input: req.params.email
 */
exports.getUpdatesForUser = function(req, res) {
  user.findOne(
    { email: req.params.email },
    function(err, user) {
      user.getUpdates(function(error, updates) {
        res.send({updates: updates});
      });
    }
  );
};

exports.getAllComments = function(req, res) {
  user.find(
    {}, //all
    { _id: false, email: true, "device.comments": true },
    function(error, comments) {
      res.send({comments: comments});
    }
  );
};

exports.getAllDevices = function(req, res) {
  user.find(
    {},
    { _id: false, email: true, device: true },
    function(error, devices) {
      res.send({devices: devices});
    }
  );
};