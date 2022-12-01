const express = require('express');
const { join } = require('path');

const router = express.Router();

const userRoutes = require('./user');

const productRoutes = require('./product');

router.use('/user', userRoutes);

router.use('/products', productRoutes);

router.use('/images', express.static(join(__dirname, '..', 'images/')));

module.exports = router;