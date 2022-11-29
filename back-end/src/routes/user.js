const express = require('express');
const {User} = require('../database/models');

console.log(User);
const UserService = require('../services/user.service');
const UserController = require('../controllers/user.controller');



const service = new UserService(User);
const router = express.Router();

router.get('/', (req, res, next) => new UserController(service, req, res, next).findAll());

module.exports = router;