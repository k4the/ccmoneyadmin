const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('./user.model');

exports.getUsers = (req, res, next) => {
  User.find().then(documents => {
    res.status(200).json({
      message: 'Users fetched successfully',
      users: documents
    });
  });
};

exports.getUserById = (req, res, next) => {
  try {
    User.findById(req.params.id)
      .then(user => {
        if (user) {
          res.status(200).json({email: user.email, _id: user.id});
        } else {
          res.status(404).json({ message: 'User not found!' });
        }
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

exports.deleteUser = (req, res, next) => {
  try {
    User.deleteOne({ _id: req.params.id }).then(result => {
      res.status(200).json({ message: 'User deleted!' });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = new User({
      email: req.body.email,
      password: hash
    });
    user
      .save()
      .then(result => {
        res.status(201).json({
          message: 'User created!',
          result: result
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  });
};

exports.login = (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: 'Auth failed'
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: 'Auth failed'
        });
      }
      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id },
        process.env.JWT_KEY,
        { expiresIn: '1h' }
      );
      res.status(200).json({ token: token, expiresIn: 3600 });
    })
    .catch(err => {
      return res.status(401).json({
        message: 'Auth failed'
      });
    });
}
