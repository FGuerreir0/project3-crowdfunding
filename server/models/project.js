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
      enum: [
        'food',
        'education',
        'fashion',
        'sanitation',
        'environment',
        'recycling',
        'donation',
        'others'
      ]
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
          type: Number
        }
      },
      resources: [
        {
          total: {
            type: Number
          },
          backed: {
            type: Number
          },
          description: {
            type: String
          }
        }
      ],
      volunteer: [
        {
          total: {
            type: Number
          },
          backed: {
            type: Number
          },
          description: {
            type: String
          }
        }
      ]
    }
  },
  {
    Timestamps: {
      createdAt: 'createdDate',
      updatedAt: 'updatedDate'
    }
  }
);

module.exports = mongoose.model('Project', schema);
