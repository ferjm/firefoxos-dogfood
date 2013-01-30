var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var feedbackSchema = new Schema({
  imei: String,
  contact: String,
  build_id: String,
  comment: String,
  associated_bug: String,
  date_added: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Feedback', feedbackSchema);
