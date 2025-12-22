const mongoose = require('mongoose');

const DocumentSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: ['true', 'Veuillez saisir le nom du document'],
      trim: true,
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ouvriers',
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ['pending', 'accepted', 'refused'],
    },
    fileUrl: [
      {
        name: {
          type: String,
          required: false,
        },
        url: {
          type: String,
          required: false,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Document', DocumentSchema);
