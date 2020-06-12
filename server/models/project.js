'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    coverPictureUrl: {
      type: String
    },
    bodyPicturesUrl: [
      {
        type: String
      }
    ],
    location: {
      type: String
    },
    shortDescription: {
      type: String
    },
    longDescription: {
      type: String
    },
    category: {
      type: String,
      enum: ['Food', 'Education', 'Sanitation', 'Environment', 'Human Rights', 'Donation', 'Other']
    },
    backers: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
        }
      }
    ],
    needs: {
      money: {
        total: {
          type: Number
        },
        backed: {
          type: Number,
          default: 0
        }
      },
      resources: [
        {
          quantity: {
            type: Number
          },
          backed: {
            type: Number
          },
          name: {
            type: String
          }
        }
      ],
      volunteer: [
        {
          name: {
            type: String
          },
          backed: {
            type: Number
          },
          quantity: {
            type: Number
          }
        }
      ]
    }
  },
  {
    timestamps: {
      createdAt: 'createdDate',
      updatedAt: 'updatedDate'
    }
  }
);

schema.index({ title: 'text' });

module.exports = mongoose.model('Project', schema);
