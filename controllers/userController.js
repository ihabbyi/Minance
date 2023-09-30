const User = require('./../models/userModel');
const tryCatch = require('./../utils/tryCatch');

exports.getAllUsers = tryCatch(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    status: 'success',
    data: {
      users,
    },
  });
});

exports.createUser = tryCatch(async (req, res, next) => {
  const user = await User.create(req.body);
  res.status(204).json({
    status: 'success',
    data: {
      user,
    },
  });
});

exports.getUser = tryCatch(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

exports.updateUser = tryCatch(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

exports.deleteUser = tryCatch(async (req, res, next) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: 'success',
    data: null,
  });
});
