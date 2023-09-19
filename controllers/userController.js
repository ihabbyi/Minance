const User = require('./../models/userModel');

exports.getAllUsers = (req, res) => {
  const users = {};
  res.status(200).json({
    status: 'success',
    data: {
      users,
    },
  });
};

exports.createUser = (req, res) => {
  const user = {};
  res.status(204).json({
    status: 'success',
    data: {
      user,
    },
  });
};

exports.getUser = (req, res) => {
  const user = {};
  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
};

exports.updateUser = (req, res) => {
  const user = {};
  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
};

exports.deleteUser = (req, res) => {
  const user = {};
  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
};
