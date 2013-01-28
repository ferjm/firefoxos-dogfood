var api = require('../models/apiUpdates.js');

exports.createNew = function(req, res) {
	api.newUpdate(updateData, function(error, data) {
		if (error) {
			res.send(500);
			return;
		}
		res.send(200);
		return;
	});
};