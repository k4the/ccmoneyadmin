const mongoose = require('mongoose');

const fuelSchema = mongoose.Schema({
  pricing: {
    yearlyCost: { type: Number, required: true },
    economy7: { type: Number, default: null },
    standingCharge: { type: Number, required: true },
    unitRate: { type: Number, required: true },
    discountRate: { type: Number, default: null }
  }
});
module.exports = mongoose.model('Fuel', fuelSchema);
