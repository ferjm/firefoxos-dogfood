var api = require('../models/apiUpdates.js');

exports.createNew = function(req, res) {
  var updateData = {};
  updateData.imei = req.param('imei');
  updateData.channel = req.param('channel');
  updateData.from_build_id = req.param('from_build_id');
  updateData.to_build_id = req.param('to_build_id');
  updateData.from_version = req.param('from_version');
  updateData.to_version = req.param('to_version');
	api.newUpdate(updateData, function(error, data) {
		if (error) {
			res.send(500);
			return;
		}
    console.log("Successfully registered update " + JSON.stringify(updateData));
		res.send(200);
		return;
	});
};

exports.remove = function(req, res) {
  api.remove(req.params._id, function(error) {
    if (error) {
      res.send(500);
      return;
    }
    res.redirect('/user/all');
  });
};
