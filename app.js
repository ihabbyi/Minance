const express = require('express');
const morgan = require('morgan');

const mainRoute = require('./routes/mainRoute');

const app = express();

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(`${__dirname}/public/`));

app.use('', mainRoute);

module.exports = app;
