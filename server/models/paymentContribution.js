const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    contribution: {
      amount: { type: Number },
      currency: {
        type: String,
        default: 'EUR'
      }
    },
    payment: { type: String },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    supporting: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project'
    }
  },
  {
    timestamps: {
      createdAt: 'dateCreated',
      updatedAt: 'dateUpdated'
    }
  }
);

module.exports = mongoose.model('PaymentContribution', schema);
