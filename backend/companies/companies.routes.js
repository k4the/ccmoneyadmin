const express = require('express');
const router = express.Router();
const CompaniesController = require('./companies.controller');
const checkAuth = require('../shared/check-auth');

router.get('', checkAuth, CompaniesController.getCompanies);
router.get('/:id', checkAuth, CompaniesController.getCompanyById);
router.post('', checkAuth, CompaniesController.addCompany);
router.delete('/:id', checkAuth, CompaniesController.deleteCompany);
router.put('/:id', checkAuth, CompaniesController.modifyCompany);

module.exports = router;
