'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true
  },
  passwordHash: {
    type: String
  },
  location: {
    type: String
  },
  pictureUrl: {
    type: String,
    default:
      'https://res.cloudinary.com/fguerreir0/image/upload/v1591445011/Sample/defaultuser_kvhkdf.png'
  },
  bio: {
    type: String,
    maxlength: 150
  }
});

module.exports = mongoose.model('User', schema);
