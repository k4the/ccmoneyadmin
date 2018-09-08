const mongoose = require('mongoose');

const imageFilterSchema = mongoose.Schema({
  heading: { type: String, required: true },
  subHeading: { type: String },
  message: { type: String },
  filter: { type: String },
  showSubHeading: { type: Boolean },
  isActive: { type: Boolean },
});

module.exports = ('ImageFilterSchema', imageFilterSchema);
