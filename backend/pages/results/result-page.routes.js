const express = require('express');
const router = express.Router();
const ResultPageController = require('./result-page.controller');
const checkAuth = require('../shared/check-auth');

router.get('', ResultPageController.getResultPages);
router.get('/:id', checkAuth, ResultPageController.getResultPageById);
router.post('', checkAuth, ResultPageController.addResultPage);
router.delete('/:id', checkAuth, ResultPageController.deleteResultPage);
router.put('/:id', checkAuth, ResultPageController.modifyResultPage);

module.exports = router;
