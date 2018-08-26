const Product = require('./product.model');

exports.getProducts = (req, res, next) => {
  Product.find().then(documents => {
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
      console.log(product);
    } else {
      res.status(404).json({ message: 'Product not found!' });
    }
  });
};

exports.addProduct = (req, res, next) => {
  const product = new Product({
    name: req.body.name,
    isDual: req.body.isDual,
    hasGas: req.body.hasGas,
    hasElectricity: req.body.hasElectricity,
    isGreen: req.body.isGreen,
    isTopPick: req.body.isTopPick,
    cashback: req.body.cashback,
    earlyExitFee: req.body.earlyExitFee,
    discountRate: req.body.discountRate,
    message: req.body.message,
    rateType: req.body.rateType
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
    _id: req.params.id,
    name: req.body.name,
    isDual: req.body.isDual,
    hasGas: req.body.hasGas,
    hasElectricity: req.body.hasElectricity,
    isGreen: req.body.isGreen,
    isTopPick: req.body.isTopPick,
    cashback: req.body.cashback,
    earlyExitFee: req.body.earlyExitFee,
    discountRate: req.body.discountRate,
    message: req.body.message,
    rateType: req.body.rateType
  });
  Product.updateOne({ _id: req.params.id }, product).then(result => {
    if (result) {
      res.status(200).json({
        message: 'Update successful'
      });
    }
  });
};
