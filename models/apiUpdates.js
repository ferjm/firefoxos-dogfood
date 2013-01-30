var update = require('./updateScheme.js');

exports.newUpdate = function(aUpdateData, aCb) {
  new update({
    imei: aUpdateData.imei,
    ip: aUpdateData.email,
    channel: aUpdateData.contact,
    from_build_id: aUpdateData.build_id,
    to_build_id: aUpdateData.comment,
    from_version: aUpdateData.from_version
  }).save(function(error, update) {
    if (error) {
      aCb(error);
      return;
    }
    aCb(null, update);
  });
};

exports.getAll = function(aCb) {
  update.find(
    {},
    function(error, updates) {
      if (error) {
        aCb(error);
        return;
      }
      aCb(null, updates);
    }
  );
};

exports.getAllForDevice = function(aImei, aCb) {
  update.find({
    imei: aImei
  }, function(error, updates){
    if (error) {
      aCb(error);
      return;
    }
    aCb(null, updates);
  });
};

exports.getAllForEmail = function(aEmail, aCb) {
  update.find({
    user: aEmail
  }, function(error, updates){
    if (error) {
      aCb(error);
      return;
    }
    aCb(null, updates);
  });
};