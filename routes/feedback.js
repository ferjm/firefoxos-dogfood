exports.process = function process(req, res) {
  var imei = req.param('imei');
  var comment = req.param('comment');
  var build_id = req.param('build_id');
  var contact = req.param('contact');
  console.log('imei = ' + imei);
  console.log('comment = ' + comment);
  console.log('build_id = ' + build_id);
  console.log('contact = ' + contact);
};
