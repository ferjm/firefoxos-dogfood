var feedback = require('./feedbackScheme.js');

exports.newFeedback = function(aFeedbackData, aCb) {
  new feedback({
    imei: aFeedbackData.imei,
    contact: aFeedbackData.contact,
    build_id: aFeedbackData.build_id,
    comment: aFeedbackData.comment,
    associated_bug: aFeedbackData.associatedBug
  }).save(function(error, feedback) {
    if (error) {
      aCb(error);
      return;
    }
    aCb(null, feedback);
  });
};

exports.getAll = function(aCb) {
  feedback.find({}, {}, function(error, feedback) {
    if (error) {
      aCb(error);
      return;
    }
    aCb(null, feedback);
  });
};

exports.getAllForDevice = function(aImei, aCb) {
  feedback.find({
    imei: aImei
  }, function(error, feedback){
    if (error) {
      aCb(error);
      return;
    }
    aCb(null, feedback);
  });
};
