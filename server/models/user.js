'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  username: {
    type: String,
    trim: true
  },
  email: {
    type: String,
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
    type: String
  },
  birthday: {
    type: String
  }
});

module.exports = mongoose.model('User', schema);
