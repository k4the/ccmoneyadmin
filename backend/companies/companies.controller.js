const Company = require('./company.model');

exports.getCompanies = (req, res, next) => {
  Company.find().then(documents => {
    res.status(200).json({
      message: 'Companies fetched successfully',
      companies: documents
    });
  });
};

exports.getCompanyById = (req, res, next) => {
  Company.findById(req.params.id).then(company => {
    if (company) {
      res.status(200).json(company);
      console.log(company);
    } else {
      res.status(404).json({ message: 'Company not found!' });
    }
  });
};

exports.addCompany = (req, res, next) => {
  const company = new Company({
    name: req.body.name,
    logoUrl: req.body.logoUrl,
    message: req.body.message,
    warningMessage: req.body.warningMessage,
    regions: req.body.regions,
    isBig: req.body.isBig,
    pollRating: req.body.pollRating
  });
  company.save().then(createdCompany => {
    res.status(201).json({
      message: 'Company added successfully',
      companyId: createdCompany._id
    });
  });
};

exports.deleteCompany = (req, res, next) => {
  Company.deleteOne({ _id: req.params.id }).then(result => {
    res.status(200).json({ message: 'Company deleted!' });
  });
};

exports.modifyCompany = (req, res, next) => {
  const company = new Company({
    _id: req.params.id,
    name: req.body.name,
    logoUrl: req.body.logoUrl,
    message: req.body.message,
    warningMessage: req.body.warningMessage,
    regions: req.body.regions,
    isBig: req.body.isBig,
    pollRating: req.body.pollRating
  });
  Company.updateOne({ _id: req.params.id }, company).then(result => {
    if (result) {
      res.status(200).json({
        message: 'Update successful'
      });
    }
  });
};
