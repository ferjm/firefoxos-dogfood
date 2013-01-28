var user = require('./userScheme.js');

//Check if we should rely on email or imei
exports.newUpdate = function(updateData, cb) {
  // updateData should have the form:
  // {ip, channel, from_build_id, to_build_id, from_version, date_added }
  user.findOneAndUpdate(
    { email: updateData.email }, //FIXME??
    { $push:
      {
        "device.updates": updateData
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