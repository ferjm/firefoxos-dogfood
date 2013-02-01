var user = require('./userScheme.js');

exports.newDevice = function(aEmail, aImei, aCb) {
  user.findOneAndUpdate({
    email: aEmail
  },{
    $set: {
        "device.imei": aImei,
        "device.date_added": new Date()
    }
  }, function(error, user) {
    if(error) {
      aCb(error);
      return;
    }
    aCb(null, user);
  });
};

exports.getAllWithDevice = function(aCb) {
  user.find({
    "device.imei": {
      $exists: true
    }
  }, {
    _id: false,
    email: true,
    device: true
  }, function(error, devices) {
    console.log("Devices " + JSON.stringify(devices));
    if (error) {
      aCb(error);
      return;
    }
    aCb(null, devices);
  });
};

exports.getAll = function(aCb) {
  user.find({}, {
    _id: false,
    email: true,
    device: true
  }, function(error, devices) {
    console.log(JSON.stringify(devices));
    if (error) {
      aCb(error);
      return;
    }
    aCb(null, devices);
  });
};

exports.remove = function(aImei, aCb) {
  user.findOneAndUpdate({
    "device.imei": aImei
  }, {
    $unset: {
      device: null
    }
  },function (error) {
    console.log(error);
    if (error) {
      aCb(error);
      return;
    }
    aCb(null);
  });
};
