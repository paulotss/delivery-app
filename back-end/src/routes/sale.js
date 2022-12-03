const express = require('express');
const { Sale } = require('../database/models');
const SaleService = require('../services/sales.service');
const SaleController = require('../controllers/sales.controller');

const validateSale = require('../middlewares/validateSale');

const validateToken = require('../middlewares/validateToken');

const service = new SaleService(Sale);
const router = express.Router();

router.get('/:id', (req, res, next) => new SaleController(service, req, res, next).findById());

// router.post('/', (req, res, next) => 
// new SaleController(service, req, res, next).findByLoginCredentials());

// router.get('/seller', (req, res, next) => 
// new SaleController(service, req, res, next).findByRole());

router.post('/', validateToken, validateSale, (req, res, next) => 
new SaleController(service, req, res, next).create());

module.exports = router;