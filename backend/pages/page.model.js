const mongoose = require('mongoose');

const pageSchema = mongoose.Schema({
  name: { type: String },
  heading: { type: String, required: true },
  subHeading: { type: String },
  hasPersonalProjection: { type: Boolean, default: false },
  personalProjectionMessage: { type: String },
  fullRangeMessage: { type: String },
  imageFilterCurrentCompany: {
    heading: { type: String },
    subHeading: { type: String },
    message: { type: String },
    filter: { type: String },
    showSubHeading: { type: Boolean },
    isActive: { type: Boolean }
  },
  imageFilterBigCompany: {
    heading: { type: String },
    subHeading: { type: String },
    message: { type: String },
    filter: { type: String },
    showSubHeading: { type: Boolean },
    isActive: { type: Boolean }
  },
  imageFilterNone: {
    heading: { type: String },
    subHeading: { type: String },
    message: { type: String },
    filter: { type: String },
    showSubHeading: { type: Boolean },
    isActive: { type: Boolean }
  }
});
module.exports = mongoose.model('Page', pageSchema);
