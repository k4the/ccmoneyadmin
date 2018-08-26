const mongoose = require('mongoose');

const pollRatingSchema = mongoose.Schema({
  great: { type: Number, default: 0 },
  ok: { type: Number, default: 0 },
  poor: { type: Number, default: 0 },
  total: { type: Number, default: 0 },
  feedbackMessage: { type: String, default: null },
  limitedFeedbackMessage: { type: String, default: null }
});
module.exports = mongoose.model('PollRating', pollRatingSchema);
