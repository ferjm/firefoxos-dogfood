var api = require('../models/apiFeedback.js');

exports.getAll = function(req, res) {
  api.getAll(function(error, feedback) {
    if (error) {
      res.send(500);
      return;
    }
    console.log(JSON.stringify(feedback));
    res.render('feedbackall', { feedback: feedback,
                               isLogged: req.isAuthenticated() });
  });
};

exports.form = function(req, res) {
  res.render('feedbacknew', { title: 'Firefox OS Dogfooding - Feedback form' });
};

exports.formHandler = function(req, res) {
  var feedbackData = {};
  feedbackData.imei = req.param('imei');
  feedbackData.comment = req.param('comment');
  feedbackData.build_id = req.param('build_id');
  feedbackData.contact = req.param('contact');

  api.newFeedback(feedbackData, function(error, feedback) {
    if (error) {
      res.send(500);
      return;
    }
    res.render('feedbacknew', { feedback: feedback });
  });
};
