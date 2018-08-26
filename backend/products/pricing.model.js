const mongoose = require('mongoose');

const pricingSchema = mongoose.Schema({
  costYearly: { type: Number, required: true },
  economy7: { type: Number, default: null },
  standingCharge: { type: Number, required: true },
  unitRate: { type: Number, required: true },
  discountRate: { type: Number, default: null },
  paymentMethod: { type: String, required: true }
});
module.exports = mongoose.model('Pricing', pricingSchema);
