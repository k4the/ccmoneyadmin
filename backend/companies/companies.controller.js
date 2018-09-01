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
    name: req.sanitize(req.body.name),
    logoUrl: req.sanitize(req.body.logoUrl),
    message: req.sanitize(req.body.message),
    warningMessage: req.sanitize(req.body.warningMessage),
    regions: req.sanitize(req.body.regions),
    isBig: req.sanitize(req.body.isBig),
    pollRating: {
      great: req.sanitize(req.body.pollRating.great),
      ok: req.sanitize(req.body.pollRating.ok),
      poor: req.sanitize(req.body.pollRating.poor),
      greatPercentage: req.sanitize(req.body.pollRating.greatPercentage),
      okPercentage: req.sanitize(req.body.pollRating.okPercentage),
      poorPercentage: req.sanitize(req.body.pollRating.poorPercentage),
      totalVotes: req.sanitize(req.body.pollRating.totalVotes),
      starClass: req.sanitize(req.body.pollRating.starClass),
      feedbackMessage: req.sanitize(req.body.pollRating.feedbackMessage),
      limitedFeedbackMessage: req.sanitize(req.body.pollRating.limitedFeedbackMessage)
    }
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
    name: req.sanitize(req.body.name),
    logoUrl: req.sanitize(req.body.logoUrl),
    message: req.sanitize(req.body.message),
    warningMessage: req.sanitize(req.body.warningMessage),
    regions: req.sanitize(req.body.regions),
    isBig: req.sanitize(req.body.isBig),
    pollRating: {
      great: req.sanitize(req.body.pollRating.great),
      ok: req.sanitize(req.body.pollRating.ok),
      poor: req.sanitize(req.body.pollRating.poor),
      greatPercentage: req.sanitize(req.body.pollRating.greatPercentage),
      okPercentage: req.sanitize(req.body.pollRating.okPercentage),
      poorPercentage: req.sanitize(req.body.pollRating.poorPercentage),
      totalVotes: req.sanitize(req.body.pollRating.totalVotes),
      starClass: req.sanitize(req.body.pollRating.starClass),
      feedbackMessage: req.sanitize(req.body.pollRating.feedbackMessage),
      limitedFeedbackMessage: req.sanitize(req.body.pollRating.limitedFeedbackMessage)
    }
  });
  Company.updateOne({ _id: req.params.id }, company).then(result => {
    if (result) {
      res.status(200).json({
        message: 'Update successful'
      });
    }
  });
};
