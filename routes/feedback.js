var api = require('../models/apiFeedback.js');

exports.home = function(req, res) {
  res.render('home', { title: 'Firefox OS Dogfooding' });
};

exports.form = function(req, res) {
  res.render('feedback', { title: 'Firefox OS Dogfooding - Feedback form' });
};

exports.formHandler = function(req, res) {
  var feedbackData = {};
  feedbackData.imei = req.param('imei') || "0000";
  feedbackData.comment = req.param('comment');
  feedbackData.build_id = req.param('build_id');
  feedbackData.contact = req.param('contact');

  api.newFeedback(feedbackData, function(error, feedback) {
    if (error) {
      res.send(500);
      return;
    }
    res.render('feedbackThanks', { feedback: feedback});
  });
};