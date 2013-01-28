var api = require('../models/api.js');

exports.home = function(req, res) {
  res.render('home', { title: 'Firefox OS Dogfooding' });
};

exports.form = function(req, res) {
  res.render('feedback', { title: 'Firefox OS Dogfooding - Feedback form' });
};

exports.formHandler = function(req, res) {
  // Temporary processing of feedback info received via POST
  var imei = req.param('imei');
  var comment = req.param('comment');
  var build_id = req.param('build_id');
  var contact = req.param('contact');
  console.log('imei = ' + imei);
  console.log('comment = ' + comment);
  console.log('build_id = ' + build_id);
  console.log('contact = ' + contact);

  res.redirect('feedback');
};