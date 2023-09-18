const express = require('express');
const morgan = require('morgan');

const userRoute = require('./routes/userRoute');

const app = express();

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(`${__dirname}/public/`));

app.get('/', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Welcome to minance',
    });
});
app.use('/api/v1/users', userRoute);

module.exports = app;
