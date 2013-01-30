var user = require('./userScheme.js');

exports.newDevice = function(email, imei, cb) {
  user.findOneAndUpdate(
    { email: email },
    { $set:
      {
        "device.imei": imei,
        "device.date_added": new Date()
      }
    },
    function(error, user) {
      if(error) {
        cb(error);
        return;
      }
      cb(null, user);
    }
  );
};

exports.getAll = function(cb) {
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
