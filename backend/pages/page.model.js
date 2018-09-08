const mongoose = require('mongoose');
const ImageFilter = require('./image-filter.schema');

const pageSchema = mongoose.Schema({
  name: { type: String },
  heading: { type: String, required: true },
  subHeading: { type: String, required: true },
  hasPersonalProjection: { type: Boolean, default: false },
  personalProjectionMessage: { type: String },
  fullRangeMessage: { type: String },
  imageFilters: [
    {
      currentCompany: ImageFilter
    },
    {
      bigCompany: ImageFilter
    },
    {
      none: ImageFilter
    }
  ]
});
module.exports = mongoose.model('Page', pageSchema);
