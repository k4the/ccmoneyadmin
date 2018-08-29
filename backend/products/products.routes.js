const express = require('express');
const router = express.Router();
const ProductsController = require('./products.controller');
const checkAuth = require('../shared/check-auth');

router.get('', ProductsController.getProducts);
router.get('/:id', checkAuth, ProductsController.getProductById);
router.post('', checkAuth, ProductsController.addProduct);
router.delete('/:id', checkAuth, ProductsController.deleteProduct);
router.put('/:id', checkAuth, ProductsController.modifyProduct);

module.exports = router;
