const Product = require('./product.model');

exports.getProducts = (req, res, next) => {
  try {
    Product.find()
      .populate('company')
      .sort({ yearlyCost: -1 })
      .then(documents => {
        res.status(200).json({
          message: 'Products fetched successfully',
          products: documents
        });
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

exports.getProductById = (req, res, next) => {
  try {
    Product.findById(req.params.id)
      .populate('company')
      .then(product => {
        if (product) {
          res.status(200).json(product);
        } else {
          res.status(404).json({ message: 'Product not found!' });
        }
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

exports.addProduct = (req, res, next) => {
  const product = new Product({
    name: req.sanitize(req.body.name),
    totalYearlyCost: req.sanitize(req.body.totalYearlyCost),
    hasBoth: req.sanitize(req.body.hasBoth),
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
    fixedFor: req.sanitize(req.body.fixedFor),
    company: req.body.company,
    gas: req.body.gas,
    electricity: req.body.electricity
  });
  try {
    product.save().then(createdProduct => {
      res.status(201).json({
        message: 'Product added successfully',
        productId: createdProduct._id
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

exports.deleteProduct = (req, res, next) => {
  try {
    Product.deleteOne({ _id: req.params.id }).then(result => {
      res.status(200).json({ message: 'Product deleted!' });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

exports.modifyProduct = (req, res, next) => {
  try {
    const product = new Product({
      _id: req.sanitize(req.params.id),
      name: req.sanitize(req.body.name),
      totalYearlyCost: req.sanitize(req.body.totalYearlyCost),
      hasBoth: req.sanitize(req.body.hasBoth),
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
      company: req.body.company,
      gas: req.body.gas,
      electricity: req.body.electricity
    });
    Product.updateOne({ _id: req.params.id }, product).then(result => {
      if (result) {
        res.status(200).json({
          message: 'Update successful'
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};
