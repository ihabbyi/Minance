const mongoose = require('mongoose');
const validator = require('validator');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter your name'],
    maxlength: [30, 'Your name must be at most 30 characters'],
  },
  username: {
    type: String,
    required: [true, 'Please enter your username'],
    unique: [true, 'The username is already taken'],
    maxlength: [16, 'The username must be at most 16 characters'],
    minlength: [3, 'The username must be at least 3 characters'],
    validate: {
      validator: validator.isAlphanumeric,
      message:
        'The username must contain only alphabetic and numeric characters.',
    },
  },
  email: {
    type: String,
    required: [true, 'Please enter your email address'],
    unique: [true, 'The email address is already taken'],
    validate: {
      validator: validator.isEmail,
      message: 'Please enter a valid email address',
    },
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: [8, 'The password must be at least 8 characters'],
    select: false,
  },
  pin: {
    type: String,
    required: [true, 'Please enter a pin code'],
    minlength: [4, 'The pin code must be 4 digits'],
    maxlength: [4, 'The pin code must be 4 digits'],
  },
  pin_secured: {
    type: String,
    select: false,
  },
  photo: String,
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await argon2.hash(this.password, {
      type: argon2.argon2id,
      memoryCost: 2 ** 16,
      hashLength: 50,
      time: 20,
      parallelism: 5,
    });
  }

  if (this.isModified('pin')) {
    this.pin_secured = await argon2.hash(this.pin, {
      type: argon2.argon2id,
      memoryCost: 2 ** 16,
      hashLength: 50,
      time: 20,
      parallelism: 5,
    });

    this.pin = undefined;
  }

  next();
});

userSchema.methods.verifyPassword = async (userPassword, inputPassword) => {
  return await argon2.verify(userPassword, inputPassword);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
