var user = require('./userScheme.js');

exports.newUser = function(userData, cb) {
  console.log("Saving " + JSON.stringify(userData));
  var userObj = {
    first_name: userData.first_name,
    last_name: userData.last_name,
    email: userData.email,
    company: userData.company,
    phone_number: userData.phone_number,
    location: userData.location,
    primary_phone: userData.primary_phone,
    sim: userData.sim,
    carrier: userData.carrier,
  };

  if (userData.imei) {
    userObj.device = {
      imei: userData.imei
    }
  }

  new user(userObj).save(function(error, user) {
    if (error) {
      cb(error);
      return;
    }
    cb(null, user);
  });
};

exports.getUser = function(email, cb) {
  user.findOne({
    email: email
  }, {
  }, function(error, user) {
    if (error) {
      cb(error);
      return;
    }
    cb(null, user);
  });
};

exports.getForImei = function(imei, cb) {
  user.findOne({
    "device.imei": imei
  }, {
  }, function(error, user) {
    if (error) {
      cb(error);
      return;
    }
    cb(null, user);
  });
};

exports.getUpdatesForUser = function(email, cb) {
  user.findOne({
    email: email
  }, function(error, user) {
    if (error) {
      cb(error);
      return;
    }
    cb(null, user.device.updates);
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

exports.getAllUsersPartial = function(cb) {
  user.find({ }, {
      _id: false,
      email: true,
      device: true
    }, function(error, users) {
    if (error) {
      cb(error);
      return;
    }
    cb(null, users);
  });
};

exports.update = function(email, updated, cb) {
  user.findOneAndUpdate({
    email: email
  }, updated, function(error) {
    if (error) {
      cb(error);
      return;
    }
    cb(null);
  });
};

exports.remove = function(email, cb) {
  user.findOneAndRemove(
    { email: email },
    function(error) {
      if (error) {
        cb(error);
        return;
      }
      cb(null);
    }
  );
};
