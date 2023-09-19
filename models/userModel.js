const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'you must enter a username'],
    unique: [true, 'username is used'],
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'you must enter a password'],
    trim: true,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
