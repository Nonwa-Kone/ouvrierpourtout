const mongoose = require('mongoose');

const notificationAdminSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: [true, 'Le message de la notification est obligatoire'],
    },
    order: {
      type: mongoose.Types.ObjectId,
      ref: 'Order',
    },
    isOpenned: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('NotificationAdmin', notificationAdminSchema);
