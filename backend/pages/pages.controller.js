const Page = require('./page.model');

exports.getPages = (req, res, next) => {
  try {
    Page.find()
      // .sort({ yearlyCost: -1 })
      .then(documents => {
        res.status(200).json({
          message: 'Pages fetched successfully',
          pages: documents
        });
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

exports.getPageByName = (req, res, next) => {
  try {
    Page.findOne({name: req.params.name})
      .then(page => {
        if (page) {
          res.status(200).json(page);
        } else {
          res.status(404).json({ message: 'Page not found!' });
        }
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

exports.addPage = (req, res, next) => {
  const page = new Page({
    name: req.sanitize(req.body.name),
    heading: req.sanitize(req.body.heading),
    subHeading: req.body.subHeading ? req.sanitize(req.body.subHeading) : null,
    hasPersonalProjection: req.body.hasPersonalProjection ? true : false,
    personalProjectionMessage: req.body.personalProjectionMessage ? req.sanitize(req.body.personalProjectionMessage) : null,
    fullRangeMessage: req.body.fullRangeMessage ? req.sanitize(req.body.fullRangeMessage) : null,
    imageFilterCurrentCompany: {
      heading: req.body.imageFilterCurrentCompany.heading ? req.sanitize(req.body.imageFilterCurrentCompany.heading) : null,
      subHeading: req.body.imageFilterCurrentCompany.subHeading ? req.sanitize(req.body.imageFilterCurrentCompany.subHeading) : null,
      message: req.body.imageFilterCurrentCompany.message ? req.sanitize(req.body.imageFilterCurrentCompany.message) : null,
      filter: req.body.imageFilterCurrentCompany.filter ? req.sanitize(req.body.imageFilterCurrentCompany.filter) : null,
      showSubHeading: req.body.imageFilterCurrentCompany.showSubHeading ? true : null,
      isActive: req.body.imageFilterCurrentCompany.isActive ? true : false
    },
    imageFilterBigCompany: {
      heading: req.body.imageFilterBigCompany.heading ? req.sanitize(req.body.imageFilterBigCompany.heading) : null,
      subHeading: req.body.imageFilterBigCompany.subHeading ? req.sanitize(req.body.imageFilterBigCompany.subHeading) : null,
      message: req.body.imageFilterBigCompany.message ? req.sanitize(req.body.imageFilterBigCompany.message) : null,
      filter: req.body.imageFilterBigCompany.filter ? req.sanitize(req.body.imageFilterBigCompany.filter) : null,
      showSubHeading: req.body.imageFilterBigCompany.showSubHeading ? true : null,
      isActive: req.body.imageFilterBigCompany.isActive ? true : false
    },
    imageFilterNone: {
      heading: req.body.imageFilterNone.heading ? req.sanitize(req.body.imageFilterNone.heading) : null,
      subHeading: req.body.imageFilterNone.subHeading ? req.sanitize(req.body.imageFilterNone.subHeading) : null,
      message: req.body.imageFilterNone.message ? req.sanitize(req.body.imageFilterNone.message) : null,
      filter: req.body.imageFilterNone.filter ? req.sanitize(req.body.imageFilterNone.filter) : null,
      showSubHeading: req.body.imageFilterNone.showSubHeading ? true : null,
      isActive: req.body.imageFilterNone.isActive ? true : false
    }
  });
  try {
    page.save().then(createdPage => {
      res.status(201).json({
        message: 'Page added successfully',
        pageId: createdPage._id
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

exports.deletePage = (req, res, next) => {
  try {
    Page.deleteOne({ _id: req.params.id }).then(result => {
      res.status(200).json({ message: 'Page deleted!' });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

exports.modifyPage = (req, res, next) => {
  try {
    const page = new Page({
      _id: req.sanitize(req.params.id),
      name: req.sanitize(req.body.name),
    heading: req.sanitize(req.body.heading),
    subHeading: req.body.subHeading ? req.sanitize(req.body.subHeading) : null,
    hasPersonalProjection: req.body.hasPersonalProjection ? true : false,
    personalProjectionMessage: req.body.personalProjectionMessage ? req.sanitize(req.body.personalProjectionMessage) : null,
    fullRangeMessage: req.body.fullRangeMessage ? req.sanitize(req.body.fullRangeMessage) : null,
    imageFilterCurrentCompany: {
      heading: req.body.imageFilterCurrentCompany.heading ? req.sanitize(req.body.imageFilterCurrentCompany.heading) : null,
      subHeading: req.body.imageFilterCurrentCompany.subHeading ? req.sanitize(req.body.imageFilterCurrentCompany.subHeading) : null,
      message: req.body.imageFilterCurrentCompany.message ? req.sanitize(req.body.imageFilterCurrentCompany.message) : null,
      filter: req.body.imageFilterCurrentCompany.filter ? req.sanitize(req.body.imageFilterCurrentCompany.filter) : null,
      showSubHeading: req.body.imageFilterCurrentCompany.showSubHeading ? true : null,
      isActive: req.body.imageFilterCurrentCompany.isActive ? true : false
    },
    imageFilterBigCompany: {
      heading: req.body.imageFilterBigCompany.heading ? req.sanitize(req.body.imageFilterBigCompany.heading) : null,
      subHeading: req.body.imageFilterBigCompany.subHeading ? req.sanitize(req.body.imageFilterBigCompany.subHeading) : null,
      message: req.body.imageFilterBigCompany.message ? req.sanitize(req.body.imageFilterBigCompany.message) : null,
      filter: req.body.imageFilterBigCompany.filter ? req.sanitize(req.body.imageFilterBigCompany.filter) : null,
      showSubHeading: req.body.imageFilterBigCompany.showSubHeading ? true : null,
      isActive: req.body.imageFilterBigCompany.isActive ? true : false
    },
    imageFilterNone: {
      heading: req.body.imageFilterNone.heading ? req.sanitize(req.body.imageFilterNone.heading) : null,
      subHeading: req.body.imageFilterNone.subHeading ? req.sanitize(req.body.imageFilterNone.subHeading) : null,
      message: req.body.imageFilterNone.message ? req.sanitize(req.body.imageFilterNone.message) : null,
      filter: req.body.imageFilterNone.filter ? req.sanitize(req.body.imageFilterNone.filter) : null,
      showSubHeading: req.body.imageFilterNone.showSubHeading ? true : null,
      isActive: req.body.imageFilterNone.isActive ? true : false
    }
    });
    Page.updateOne({ _id: req.params.id }, page).then(result => {
      if (result) {
        res.status(200).json({
          message: 'Update successful'
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};
