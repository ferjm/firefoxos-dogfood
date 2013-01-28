var user = require('./userScheme.js');

exports.getAll = function(cb) {
  user.find(
    { },
    {
      _id: false,
      email: true,
      "device.comments": true
    },
    function(error, comments) {
      if (error) {
        cb(error);
        return;
      }
      cb(null, comments);
    }
  );
};