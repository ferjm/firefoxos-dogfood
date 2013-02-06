var api  = require('../models/apiFeedback.js'),
    user = require('../models/apiUser.js');

exports.getAll = function(req, res) {
  api.getAll(function(error, feedback) {
    if (error) {
      res.send(500);
      return;
    }
    res.render('feedbackall', { feedback: feedback,
                                isLogged: req.isAuthenticated(),
                                active: 'feedbackall' });
  });
};

exports.getAllForDevice = function(req, res) {
  api.getAllForDevice(req.params.imei, function(error, feedback) {
    if (error) {
      res.send(500);
      return;
    }
    res.render('feedbackall', { feedback: feedback,
                                isLogged: req.isAuthenticated(),
                                active: 'feedbackall' });
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
  res.render('feedbacknew', { title: 'Firefox OS Dogfooding - Feedback form',
                              active: 'feedbacknew' });
};

function processFeedback(req, res, redirect) {
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
      feedbackData.user = user.email;
    }
    api.newFeedback(feedbackData, function(error, feedback) {
      if (error) {
        console.log(error);
        res.send(500);
        return;
      }
      console.log("Successfully registered feedback " + JSON.stringify(feedbackData));
      if (redirect) {
        res.redirect('/feedback/all');
      } else {
        res.send(200);
      }
    });
  });
};

exports.deviceFormHandler = function(req, res) {
  processFeedback(req, res, false);
};

exports.formHandler = function(req, res) {
  processFeedback(req, res; true);
};

exports.edit = function(req, res) {
  api.get(req.params._id, function(error, feedback) {
    if (error) {
      res.send(500);
      return;
    }
    res.render('feedbackedit', { feedback: feedback });
  });
}

exports.update = function(req, res) {
  var feedbackData = {};
  if (req.body.imei)
    feedbackData.imei = req.body.imei;
  feedbackData.comment = req.body.comment;
  feedbackData.build_id = req.body.build_id;
  feedbackData.contact = req.body.contact;
  feedbackData.associated_bug = req.body.associated_bug;
  feedbackData.severity = req.body.severity;
  feedbackData.additional_info = req.body.additional_info;

  console.log("update " + JSON.stringify(feedbackData));
  api.update(req.params._id, feedbackData, function(error) {
    if (error) {
      res.send(500);
      return;
    }
    res.redirect('/feedback/all');
  });
};
