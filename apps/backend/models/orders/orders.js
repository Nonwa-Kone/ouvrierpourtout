const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    reference: {
      type: String,
      required: true,
    },
    profession: {
      type: String,
      required: true,
    },
    speciality: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      default: 0,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
    },
    assignTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ouvrier',
    },
    payment_statu: {
      type: String,
      required: true,
      enum: ['paid', 'pending', 'refused'],
      default: 'pending',
    },
    status: {
      type: String,
      required: true,
      enum: [
        'draft',
        'waiting',
        'in_progress',
        'pending',
        'accepted',
        'rejected',
        'valided',
        'sending',
        'sent',
        'delivered',
        'occuped',
      ],
      default: 'in_progress',
    },
  },
  { timestamps: true, collection: 'orders' }
);

module.exports = mongoose.model('Order', orderSchema);
