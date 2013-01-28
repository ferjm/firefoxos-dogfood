var api = require('../models/apiComments.js');

exports.getAll = function(req, res) {
  api.getAll(function(error, comments) {
    if (error) {
      res.send(500);
      return;
    }
    res.send(JSON.stringify(comments));
    //res.render('allComments', { comments: comments });
  });
};