var user = require('./scheme.js'),
    helpers = require('../common/helpers.js');

exports.newUser = function(userData, cb) {
  new user({
    first_name: userData.first_name,
    last_name: userData.last_name,
    email: userData.email,
    company: userData.company,
    phone_number: userData.phone_number,
    location: userData.location,
    primary_phone: userData.primary_phone,
    sim: userData.sim,
    carrier: userData.carrier,
    device: {
      imei: userData.imei
    }
  }).save(function(error, user) {
    if (error) {
      cb(error);
      return;
    }
    cb(null, user);
  });
};

/**
 * Input: req.params.email
 */
exports.getUser = function(email, cb) {
  user.findOne({
    email: email
  }, {
    _id: false,
    email: true,
    device: true
  }, function(error, user) {
    if (error) {
      cb(error);
      return;
    }
    cb(null, user);
  });
};

/**
 * Input: req.params.email
 */
exports.getCommentsForUser = function(email, cb) {
  user.findOne({
    email: email
  }, function(error, user) {
    if (error) {
      cb(error);
      return;
    }
    user.getComments(function(error, comments) {
      cb(null, comments);
    });
  });
};

/**
 * Input: req.params.email
 */
exports.getUpdatesForUser = function(email, cb) {
  user.findOne({
    email: email
  }, function(error, user) {
    if (error) {
      cb(error);
      return;
    }
    user.getUpdates(function(error, updates) {
      if (error) {
        cb(error);
        return;
      }
      cb(null, updates);
    });
  });
};

exports.getAllComments = function(cb) {
  user.find({ }, {
    _id: false,
    email: true,
    "device.comments": true
  }, function(error, comments) {
    if (error) {
      cb(error);
      return;
    }
    cb(null, comments);
  });
};

exports.getAllDevices = function(cb) {
  user.find({ }, {
    _id: false,
    email: true,
    device: true
  }, function(error, devices) {
    if (error) {
      cb(error);
      return;
    }
    cb(null, devices);
  });
};

exports.getAllUsers = function(cb) {
  user.find({ },{
    _id: false,
    email: true
  }, function(error, users) {
    if (error) {
      cb(error);
      return;
    }
    cb(null, users);
  });
};
