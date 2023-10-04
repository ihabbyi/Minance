const express = require('express');
const morgan = require('morgan');

const AppError = require('./utils/appError');
const ErrorHandler = require('./controllers/errorController');
const userRoute = require('./routes/userRoute');

const app = express();

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(`${__dirname}/public/`));

app.use('/api/v1/users', userRoute);

app.all('*', (req, res, next) => {
  next(new AppError(`page ${req.originalUrl} not found`, 404));
});

app.use(ErrorHandler);

module.exports = app;
