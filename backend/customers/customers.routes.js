const express = require('express');
const router = express.Router();
const CustomersController = require('./customers.controller');
const checkAuth = require('../shared/check-auth');

router.get('', CustomersController.getCustomers);
router.get('/:id', checkAuth, CustomersController.getCustomerById);
router.get('/products/:id/:page', CustomersController.getCustomerByIdWithProducts);
router.post('', checkAuth, CustomersController.addCustomer);
router.delete('/:id', checkAuth, CustomersController.deleteCustomer);
router.put('/:id', checkAuth, CustomersController.modifyCustomer);

module.exports = router;
