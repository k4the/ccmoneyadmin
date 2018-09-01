const express = require('express');
const router = express.Router();
const UsersController = require('./users.controller');
const checkAuth = require('../shared/check-auth');

router.get('', checkAuth, UsersController.getUsers);
router.post('/signup', UsersController.createUser);
router.post('/login', UsersController.login);
router.get('/:id', checkAuth, UsersController.getUserById);
router.delete('/:id', checkAuth, UsersController.deleteUser);

module.exports = router;
