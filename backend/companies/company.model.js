const mongoose = require('mongoose');
const PollRating = require('./pollRating.model');

const companySchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  logoUrl: { type: String, required: true },
  message: { type: String, default: null },
  warningMessage: { type: String, default: null },
  regions: { type: [String], required: true },
  isBig: { type: Boolean, default: false },
  pollRating: PollRating.schema
});
module.exports = mongoose.model('Company', companySchema);


