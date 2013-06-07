var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var feedbackSchema = new Schema({
  user: String,
  imei: String,
  contact: String,
  build_id: String,
  comment: String,
  associated_bug: String,
  severity: Number,
  type_info: String,
  application: String,
  additional_info: String,
  date_added: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Feedback', feedbackSchema);
