const express = require('express');
const { Sale } = require('../database/models');
const SaleService = require('../services/sales.service');
const SaleController = require('../controllers/sales.controller');

const service = new SaleService(Sale);
const router = express.Router();

// router.get('/', (req, res, next) => new SaleController(service, req, res, next).findAll());

// router.post('/', (req, res, next) => 
// new SaleController(service, req, res, next).findByLoginCredentials());

// router.get('/seller', (req, res, next) => 
// new SaleController(service, req, res, next).findByRole());


router.post('/', (req, res, next) => 
new SaleController(service, req, res, next).create());

module.exports = router;