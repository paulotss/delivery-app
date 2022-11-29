const express = require('express');
const userModel = require('../models/user');
const UserService = require('../services/user.service');
const UserController = require('../controllers/user.controller');

const service = new UserService(userModel);
const router = express.Router();

routes.get('/', (req, res, next) => new UserController(service, req, res, next).findAll());

module.exports = router;