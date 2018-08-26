const express = require('express');
const router = express.Router();
const ProductsController = require('./products.controller');
const checkAuth = require('../shared/check-auth');

router.get('', checkAuth, ProductsController.getCompanies);
router.get('/:id', checkAuth, ProductsController.getCompanyById);
router.post('', checkAuth, ProductsController.addCompany);
router.delete('/:id', checkAuth, ProductsController.deleteCompany);
router.put('/:id', checkAuth, ProductsController.modifyCompany);

module.exports = router;
