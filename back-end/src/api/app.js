const express = require('express');
const cors = require('cors');
const ErrorHandler = require('../middlewares/ErrorHandler.js');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/coffee', (_req, res) => res.status(418).end());

app.use(ErrorHandler);

module.exports = app;
