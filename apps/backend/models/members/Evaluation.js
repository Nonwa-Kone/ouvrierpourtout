const mongoose = require('mongoose');

const evaluationSchema = new mongoose.Schema(
  {
    reference: {
      type: String,
      required: true,
      minLength: [8, 'la référence doit contenir 8 caractères'],
      maxLength: [8, 'la référence doit contenir 8 caractères'],
      unique: true,
      upper: true,
    },
    username: {
      type: String,
      required: [true, "Le nom d'utilisateur est obligatoire"],
    },
    note: {
      type: Number,
      required: [true, 'La note est obligatoire'],
    },
    comment: {
      type: String,
      required: [true, 'Le commentaire est obligatoire'],
    },
    ouvrier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ouvriers',
      required: true,
    },
  },
  { timestamps: true, collection: 'evaluations' }
);

module.exports = mongoose.model('evaluation', evaluationSchema);
