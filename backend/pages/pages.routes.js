const express = require('express');
const router = express.Router();
const PagesController = require('./pages.controller');
const checkAuth = require('../shared/check-auth');

router.get('', PagesController.getPages);
router.get('/:id', checkAuth, PagesController.getPageById);
router.delete('/:id', checkAuth, PagesController.deletePage);
router.put('/:id', checkAuth, PagesController.modifyPage);
router.post('', checkAuth, PagesController.addPage);

module.exports = router;
