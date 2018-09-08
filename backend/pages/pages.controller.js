const Page = require('./page.model');

function getMenuFilters(imageFilters) {
  var sanitizedImageFilters = [];
  if(imageFilters && imageFilters.length) {
    sanitizedImageFilters.push({currentCompany: getMenuFilter(imageFilter[0])});
    sanitizedImageFilters.push({bigCompany: getMenuFilter(imageFilter[1])});
    sanitizedImageFilters.push({none: getMenuFilter(imageFilter[2])});
  }
  return sanitizedImageFilters;
}

function getMenuFilter(imageFilter) {
  var sanitizedImageFilter = null;
      var item = {
        heading: imageFilter.heading ? sanitize(imageFilter.heading) : null,
        subHeading: imageFilter.subHeading ? sanitize(imageFilter.subHeading) : null,
        filter: imageFilter.filter ? sanitize(imageFilter.filter) : null,
        message: imageFilter.message ? sanitize(imageFilter.message) : null,
        showSubHeading: imageFilter.showSubHeading ? sanitize(imageFilter.showSubHeading) : false,
        isActive: imageFilter.isActive ? sanitize(imageFilter.isActive) : false,
      }
  return sanitizedImageFilter;
}

exports.getPages = (req, res, next) => {
  try {
    Page.find()
      .populate('imageFilters')
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

exports.getPageById = (req, res, next) => {
  try {
    Page.findById(req.params.id)
      .populate('imageFilters')
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
    subHeading: req.sanitize(req.body.subHeading),
    hasPersonalProjection: req.sanitize(req.body.hasPersonalProjection),
    personalProjectionMessage: req.sanitize(req.body.personalProjectionMessage),
    fullRangeMessage: req.sanitize(req.body.fullRangeMessage),
    imageFilters: getMenuFilters(req.body.imageFilters)
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
      subHeading: req.sanitize(req.body.subHeading),
      hasPersonalProjection: req.sanitize(req.body.hasPersonalProjection),
      personalProjectionMessage: req.sanitize(req.body.personalProjectionMessage),
      fullRangeMessage: req.sanitize(req.body.fullRangeMessage),
      imageFilters: getMenuFilters(req.body.imageFilters)
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
