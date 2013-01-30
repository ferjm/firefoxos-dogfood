var api  = require('../models/apiFeedback.js'),
    user = require('../models/apiUser.js');

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

exports.getAllForDevice = function(req, res) {
  api.getAllForDevice(req.params.imei, function(error, feedback) {
    if (error) {
      res.send(500);
      return;
    }
    res.render('feedbackall', { feedback: feedback,
                                isLogged: req.isAuthenticated() });
  });
};

exports.deleteComment = function(req, res) {
  api.remove(req.params._id, function(error) {
    if (error) {
      res.send(500);
      return;
    }
    res.redirect('/feedback/all');
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

  user.getForImei(feedbackData.imei, function(error, user) {
    if (error) {
      res.send(500);
      return;
    }
    if (user) {
      feedbackData.email = user.email;
    }
    api.newFeedback(feedbackData, function(error, feedback) {
      if (error) {
        res.send(500);
        return;
      }
      res.redirect('/feedback/all');
    });
  });

};
