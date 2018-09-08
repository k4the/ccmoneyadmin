const Customer = require('./customer.model');

exports.getCustomers = (req, res, next) => {
  Customer.find().then(documents => {
    res.status(200).json({
      message: 'Customer fetched successfully',
      customers: documents
    });
  });
};

exports.getCustomerById = (req, res, next) => {
  Customer.findById(req.params.id).then(customer => {
    if (customer) {
      res.status(200).json(customer);
      console.log(customer);
    } else {
      res.status(404).json({ message: 'Customer not found!' });
    }
  });
};

exports.addCustomer = (req, res, next) => {
  const customer = new Customer({
    firstName: req.sanitize(req.body.firstName),
    lastName: req.sanitize(req.body.lastName),
    email: req.sanitize(req.body.email),
    paying: {
      currentlyPaying: {
        monthly: req.sanitize(req.body.paying.currentlyPaying.monthly),
        yearly: req.sanitize(req.body.paying.currentlyPaying.yearly),
      },
      couldBePaying: {
        monthly: req.sanitize(req.body.paying.couldBePaying.monthly),
        yearly: req.sanitize(req.body.paying.couldBePaying.yearly),
      },
      saving: {
        monthly: req.sanitize(req.body.paying.saving.monthly),
        yearly: req.sanitize(req.body.paying.saving.yearly),
      }
    },
    company: req.body.company
  });
  customer.save().then(createdCustomer => {
    res.status(201).json({
      message: 'Customer added successfully',
      customerId: createdCustomer._id
    });
  });
};

exports.deleteCustomer = (req, res, next) => {
  Customer.deleteOne({ _id: req.params.id }).then(result => {
    res.status(200).json({ message: 'Customer deleted!' });
  });
};

exports.modifyCustomer = (req, res, next) => {
  const customer = new Customer({
    _id: req.params.id,
    firstName: req.sanitize(req.body.firstName),
    lastName: req.sanitize(req.body.lastName),
    email: req.sanitize(req.body.email),
    paying: {
      currentlyPaying: {
        monthly: req.sanitize(req.body.paying.currentlyPaying.monthly),
        yearly: req.sanitize(req.body.paying.currentlyPaying.yearly),
      },
      couldBePaying: {
        monthly: req.sanitize(req.body.paying.couldBePaying.monthly),
        yearly: req.sanitize(req.body.paying.couldBePaying.yearly),
      },
      saving: {
        monthly: req.sanitize(req.body.paying.saving.monthly),
        yearly: req.sanitize(req.body.paying.saving.yearly),
      }
    },
    company: req.body.company
  });
  Customer.updateOne({ _id: req.params.id }, customer).then(result => {
    if (result) {
      res.status(200).json({
        message: 'Update successful'
      });
    }
  });
};
