const Product = require('./product.model');

// exports.getProducts = (req, res, next) => {
//   Product.find().then(documents => {
//     res.status(200).json({
//       message: 'Products fetched successfully',
//       products: documents
//     });
//   });
// };

exports.getProducts = (req, res, next) => {
  Product.find()
  .populate('company')
  .then(documents => {
    res.status(200).json({
      message: 'Products fetched successfully',
      products: documents
    });
  });
};

exports.getProductById = (req, res, next) => {
  Product.findById(req.params.id).then(product => {
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: 'Product not found!' });
    }
  });
};

exports.addProduct = (req, res, next) => {
  const product = new Product({
    name: req.sanitize(req.body.name),
    isDual: req.sanitize(req.body.isDual),
    hasGas: req.sanitize(req.body.hasGas),
    hasElectricity: req.sanitize(req.body.hasElectricity),
    isGreen: req.sanitize(req.body.isGreen),
    isTopPick: req.sanitize(req.body.isTopPick),
    cashback: req.sanitize(req.body.cashback),
    earlyExitFee: req.sanitize(req.body.earlyExitFee),
    discountRate: req.sanitize(req.body.discountRate),
    paymentMethod: req.sanitize(req.body.paymentMethod),
    message: req.sanitize(req.body.message),
    rateType: req.sanitize(req.body.rateType),
    fixedFor: req.sanitize(req.body.fixedFor)
    // company: Company.schema,
    // gas: Fuel.schema,
    // electricity: Fuel.schema
  });
  product.save().then(createdProduct => {
    res.status(201).json({
      message: 'Product added successfully',
      productId: createdProduct._id
    });
  });
};

exports.deleteProduct = (req, res, next) => {
  Product.deleteOne({ _id: req.params.id }).then(result => {
    res.status(200).json({ message: 'Product deleted!' });
  });
};

exports.modifyProduct = (req, res, next) => {
  const product = new Product({
    _id: req.sanitize(req.params.id),
    name: req.sanitize(req.body.name),
    isDual: req.sanitize(req.body.isDual),
    hasGas: req.sanitize(req.body.hasGas),
    hasElectricity: req.sanitize(req.body.hasElectricity),
    isGreen: req.sanitize(req.body.isGreen),
    isTopPick: req.sanitize(req.body.isTopPick),
    cashback: req.sanitize(req.body.cashback),
    earlyExitFee: req.sanitize(req.body.earlyExitFee),
    paymentMethod: req.sanitize(req.body.paymentMethod),
    message: req.sanitize(req.body.message),
    rateType: req.sanitize(req.body.rateType),
    fixedFor: req.sanitize(req.body.fixedFor),
  });
  Product.updateOne({ _id: req.params.id }, product).then(result => {
    if (result) {
      res.status(200).json({
        message: 'Update successful'
      });
    }
  });
};
