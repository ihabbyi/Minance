const jwt = require('jsonwebtoken');

const User = require('./../models/userModel');
const tryCatch = require('./../utils/tryCatch');
const AppError = require('./../utils/appError');

const createToken = async (id) =>
  await jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

exports.signup = tryCatch(async (req, res, next) => {
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    pin: req.body.pin,
  });
  const token = await createToken(user.id);

  res.status(200).json({
    status: 'success',
    token,
  });
});

exports.login = tryCatch(async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password)
    return next(new AppError('Please enter your username and password', 400));

  const user = await User.findOne({ username }).select('+password');
  const verification = await user.verifyPassword(user.password, password);

  if (!user || !verification) {
    return next(new AppError('Incorrect username or password', 401));
  }

  const token = await createToken(user.id);

  res.status(200).json({ status: 'success', token });
});
