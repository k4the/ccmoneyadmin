const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const customerSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: {type: String, required: true},
  paying: {
    currentlyPaying: {
      monthly: { type: Number, default: 0 },
      yearly: { type: Number, default: 0 }
    },
    couldBePaying: {
      monthly: { type: Number, default: 0 },
      yearly: { type: Number, default: 0 }
    },
    saving: {
      monthly: { type: Number, default: 0 },
      yearly: { type: Number, default: 0 }
    }
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  }
});
customerSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Customer', customerSchema);
