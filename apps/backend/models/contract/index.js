const mongoose = require('mongoose');
const { generateReference, refArray } = require('../../utils');
const Schema = mongoose.Schema;

const contractSchema = new Schema(
  {
    reference: {
      type: String,
      required: true,
      default: generateReference(),
    },
    typeContract: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    ouvrier: refArray('ouvriers'),
  },
  { timestamps: true, collection: 'contract' }
);

module.exports = mongoose.model('contract', contractSchema);
