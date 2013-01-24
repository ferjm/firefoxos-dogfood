var user = require('./scheme.js');

/**
 * Exports a newUser function that receives
 */
exports.newUser = function(req, res) {
  var user = new user(
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
        imei: req.body.device.imei
      }
    }, function);
};