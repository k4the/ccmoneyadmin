const mongoose = require('mongoose');
const Pricing = require('./pricing.model');

const fuelSchema = mongoose.Schema({
  name: { type: String, required: true },
  pricing: Pricing.schema
});
module.exports = mongoose.model('Fuel', fuelSchema);
