const mongoose = require('mongoose');

const resultPageSchema = mongoose.Schema({
  hurray: { type: String, required: true },
  youCanSave: { type: String, required: true },
  sorted: { type: String, required: true }
});
module.exports = mongoose.model('ResultPage', resultPageSchema);


