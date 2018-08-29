const mongoose = require('mongoose');
const Company = require('../companies/company.model');

const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  totalYearlyCost: { type: Number, default: 0 },
  totalMonthlyCost: { type: Number, default: 0 },
  endDate: { type: Date, required: false, default: null },
  fuelType: { type: String, required: false, default: 'both' },
  isGreen: { type: Boolean, required: false, default: false },
  isTopPick: { type: Boolean, required: false, default: false },
  cashback: { type: Number, required: false, default: 0 },
  earlyExitFee: { type: Number, required: false, default: 0 },
  message: { type: String, required: false, default: null },
  rateType: { type: String, required: true, default: null },
  fixedFor: { type: Number, required: false, default: 0 },
  paymentMethod: { type: String, required: true, default: null },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true
  },
  gas: {
    yearlyCost: { type: Number, required: false, default: 0 },
    monthlyCost: { type: Number, required: false, default: 0 },
    economy7: { type: Number, required: false, default: 0 },
    standingCharge: { type: Number, required: false, default: 0 },
    unitRate: { type: Number, required: true, default: 0 },
    discountRate: { type: Number, required: false, default: 0 }
  },
  electricity: {
    yearlyCost: { type: Number, required: false, default: 0 },
    monthlyCost: { type: Number, required: false, default: 0 },
    economy7: { type: Number, required: true, default: 0 },
    standingCharge: { type: Number, required: true, default: 0 },
    unitRate: { type: Number, required: true, default: 0 },
    discountRate: { type: Number, default: null, default: 0 }
  }
});
module.exports = mongoose.model('Product', productSchema);
