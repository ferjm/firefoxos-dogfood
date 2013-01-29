var api = require('../models/apiComments.js');

exports.getAll = function(req, res) {
  api.getAll(function(error, comments) {
    if (error) {
      res.send(500);
      return;
    }
    console.log(JSON.stringify(comments));
    res.render('commentall', { comments: comments,
                               isLogged: req.isAuthenticated() });
  });
};
