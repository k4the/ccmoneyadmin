const mongoose = require('mongoose');

const companySchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  logoUrl: { type: String, required: true },
  message: { type: String, default: null },
  warningMessage: { type: String, default: null },
  regions: { type: [String], required: true },
  isBig: { type: Boolean, default: false },
  pollRating: {
    greatPercentage: { type: Number, default: 0 },
    okPercentage: { type: Number, default: 0 },
    poorPercentage: { type: Number, default: 0 },
    totalVotes: { type: Number, default: 0 },
    feedbackMessage: { type: String, default: null },
    limitedFeedbackMessage: { type: String, default: null }
  }
});
module.exports = mongoose.model('Company', companySchema);


