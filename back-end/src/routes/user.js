const express = require('express');
const { User } = require('../database/models');
const UserService = require('../services/user.service');
const UserController = require('../controllers/user.controller');

const service = new UserService(User);
const router = express.Router();

router.get('/', (req, res, next) => new UserController(service, req, res, next).findAll());
router.post('/', (req, res, next) => 
new UserController(service, req, res, next).findByLoginCredentials());

module.exports = router;