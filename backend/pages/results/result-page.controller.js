const ResultPage = require('./result-page.model');

exports.getResultPages = (req, res, next) => {
  ResultPage.find().then(documents => {
    res.status(200).json({
      message: 'Result page fetched successfully',
      resultPages: documents
    });
  });
};

exports.getResultPageById = (req, res, next) => {
  ResultPage.findById(req.params.id).then(resultPage => {
    if (resultPage) {
      res.status(200).json(resultPage);
      console.log(resultPage);
    } else {
      res.status(404).json({ message: 'Result page not found!' });
    }
  });
};

exports.addResultPage = (req, res, next) => {
  const resultPage = new ResultPage({
    hurray: req.sanitize(req.body.hurray),
    youCanSave: req.sanitize(req.body.youCanSave),
    sorted: req.sanitize(req.body.sorted)
  });
  resultPage.save().then(createdResultPage => {
    res.status(201).json({
      message: 'Result page added successfully',
      resultPageId: createdResultPage._id
    });
  });
};

exports.deleteResultPage = (req, res, next) => {
  ResultPage.deleteOne({ _id: req.params.id }).then(result => {
    res.status(200).json({ message: 'Result page deleted!' });
  });
};

exports.modifyResultPage = (req, res, next) => {
  const resultPage = new ResultPage({
    _id: req.params.id,
    hurray: req.sanitize(req.body.hurray),
    youCanSave: req.sanitize(req.body.youCanSave),
    sorted: req.sanitize(req.body.sorted)
  });
  ResultPage.updateOne({ _id: req.params.id }, resultPage).then(result => {
    if (result) {
      res.status(200).json({
        message: 'Update successful'
      });
    }
  });
};
