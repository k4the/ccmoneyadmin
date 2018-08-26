const mongoose = require('mongoose');
// const Fuel = require('./fuel.model');
const Company = require('../companies/company.model');

const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  isDual: { type: Boolean, default: false },
  hasGas: { type: Boolean, default: false },
  hasElectricity: { type: Boolean, default: false },
  isGreen: { type: Boolean, default: false },
  isTopPick: { type: Boolean, default: false },
  cashback: { type: Number, default: 0 },
  earlyExitFee: { type: Number, default: 0 },
  discountRate: { type: Number, default: 0 },
  message: { type: String, default: null },
  rateType: { type: String, required: true },
  company: {type: Schema.Types.ObjectId, ref: 'Company', required: true}
});
module.exports = mongoose.model('Product', productSchema);
