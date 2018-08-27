const mongoose = require('mongoose');
const Company = require('../companies/company.model');

const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  endDate: { type: Date, required: false, default: null },
  isDual: { type: Boolean, required: true, default: false },
  hasGas: { type: Boolean, required: true, default: false },
  hasElectricity: { type: Boolean, required: true, default: false },
  isGreen: { type: Boolean, required: true, default: false },
  isTopPick: { type: Boolean, required: true, default: false },
  cashback: { type: Number, required: true, default: 0 },
  earlyExitFee: { type: Number, required: true, default: 0 },
  message: { type: String, required: true, default: null },
  rateType: { type: String, required: true, default: null },
  fixedFor: { type: Number, required: true, default: 0 },
  paymentMethod: { type: String, required: true, default: null },
  // company: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
  company: { type: Schema.Types.ObjectId, ref: Company, required: true },
  gas: {
      yearlyCost: { type: Number, required: true, default: 0 },
      economy7: { type: Number, required: true, default: 0 },
      standingCharge: { type: Number, required: true, default: 0 },
      unitRate: { type: Number, required: true, default: 0 },
      discountRate: { type: Number, required: true, default: 0 }
  },
  electricity: {
      yearlyCost: { type: Number, required: true, default: 0 },
      economy7: { type: Number, required: true, default: 0 },
      standingCharge: { type: Number, required: true, default: 0 },
      unitRate: { type: Number, required: true, default: 0 },
      discountRate: { type: Number, default: null, default: 0 }
  }
});
module.exports = mongoose.model('Product', productSchema);
