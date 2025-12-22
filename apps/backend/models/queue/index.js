const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const queueSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    profession: {
      type: String,
      required: false,
    },
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ['in_progress', 'done', 'canceled'],
      default: 'in_progress',
    },
  },
  { timestamps: true, collection: 'queue' }
);

module.exports = mongoose.model('Queue', queueSchema);
