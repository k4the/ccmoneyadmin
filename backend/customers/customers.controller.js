const Customer = require('./customer.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Product = require('../products/product.model');
const Page = require('../pages/page.model');

exports.getCustomerByIdWithProducts = (req, res, next) => {
  try {
    Customer.findById(req.params.id)
      .populate('product')
      .then(customer => {
        if (customer) {
          Product.find()
            .populate('company')
            .sort({ yearlyCost: -1 })
            .then(products => {
              Page.findOne({name: req.params.page})
              .then(page => {
                res.status(200).json({
                  message: 'Customer with products fetched successfully',
                  customer: customer,
                  products: products,
                  page: page
                });
              })
            });
        } else {
          res.status(404).json({ message: 'Customer not found!' });
        }
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

exports.getCustomers = (req, res, next) => {
  try {
    Customer.find()
      .populate('product')
      .sort({ lastName: -1 })
      .then(documents => {
        res.status(200).json({
          message: 'Customers fetched successfully',
          customers: documents
        });
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

exports.getCustomerById = (req, res, next) => {
  try {
    Customer.findById(req.params.id)
      .populate('product')
      .then(customer => {
        if (customer) {
          res.status(200).json(customer);
        } else {
          res.status(404).json({ message: 'Customer not found!' });
        }
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

exports.addCustomer = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const customer = new Customer({
      firstName: req.sanitize(req.body.firstName),
      lastName: req.sanitize(req.body.lastName),
      email: req.sanitize(req.body.email),
      password: hash,
      paying: {
        currentlyPaying: {
          monthly: req.sanitize(req.body.paying.currentlyPaying.monthly),
          yearly: req.sanitize(req.body.paying.currentlyPaying.yearly)
        },
        couldBePaying: {
          monthly: req.sanitize(req.body.paying.couldBePaying.monthly),
          yearly: req.sanitize(req.body.paying.couldBePaying.yearly)
        },
        saving: {
          monthly: req.sanitize(req.body.paying.saving.monthly),
          yearly: req.sanitize(req.body.paying.saving.yearly)
        }
      },
      product: req.body.product
    });
    customer
      .save()
      .then(result => {
        res.status(201).json({
          message: 'Customer created!',
          result: result
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  });
};

exports.login = (req, res, next) => {
  let fetchedCustomer;
  Customer.findOne({ email: req.body.email })
    .populate('product')
    .then(customer => {
      if (!customer) {
        return res.status(401).json({
          message: 'Auth failed'
        });
      }
      fetchedCustomer = customer;
      return bcrypt.compare(req.body.password, customer.password);
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: 'Auth failed'
        });
      }

      const returnedCustomer = {
        email: fetchedCustomer.email,
        customerId: fetchedCustomer._id,
        firstName: fetchedCustomer.firstName,
        lastName: fetchedCustomer.lastName,
        paying: {
          currentlyPaying: {
            monthly: fetchedCustomer.paying.currentlyPaying.monthly,
            yearly: fetchedCustomer.paying.currentlyPaying.yearly
          },
          couldBePaying: {
            monthly: fetchedCustomer.paying.couldBePaying.monthly,
            yearly: fetchedCustomer.paying.couldBePaying.yearly
          },
          saving: {
            monthly: fetchedCustomer.paying.saving.monthly,
            yearly: fetchedCustomer.paying.saving.yearly
          }
        },
        product: fetchedCustomer.product
      };

      const token = jwt.sign(
        { email: fetchedCustomer.email, userId: fetchedCustomer._id },
        process.env.JWT_KEY,
        { expiresIn: '1h' }
      );
      res
        .status(200)
        .json({ token: token, expiresIn: 3600, customer: returnedCustomer });
    })
    .catch(err => {
      return res.status(401).json({
        message: 'Auth failed'
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
        yearly: req.sanitize(req.body.paying.currentlyPaying.yearly)
      },
      couldBePaying: {
        monthly: req.sanitize(req.body.paying.couldBePaying.monthly),
        yearly: req.sanitize(req.body.paying.couldBePaying.yearly)
      },
      saving: {
        monthly: req.sanitize(req.body.paying.saving.monthly),
        yearly: req.sanitize(req.body.paying.saving.yearly)
      }
    },
    product: req.body.product
  });
  Customer.updateOne({ _id: req.params.id }, customer).then(result => {
    if (result) {
      res.status(200).json({
        message: 'Update successful'
      });
    }
  });
};
