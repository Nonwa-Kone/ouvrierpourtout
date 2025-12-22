const QueueSchema = require('../models/queue');
const OuvrierSchema = require('../models/members/Ouvriers');
const OrderSchema = require('../models/orders/orders');
const NotificationAdminSchema = require('../models/notifications/admin');
const { default: mongoose } = require('mongoose');

module.exports = {
  getQueue: async (req, res) => {
    try {
      const profession = req.query.profession;
      let query = {};
      if (profession) {
        query.profession = profession;
      }
      query.status = 'in_progress';
      const queue = await QueueSchema.find(query).populate({
        path: 'order',
        model: 'Order',
        populate: {
          path: 'customer',
          model: 'Customer',
        },
      });
      if (!queue) {
        return res.status(404).json({
          success: false,
          message: 'Queue not found',
        });
      }
      res
        .status(200)
        .json({ success: true, data: queue, message: 'queue found' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  // Valideted queue by customer
  validetedQueueByCustomer: async (req, res) => {
    try {
      const { queueId, ouvrierId } = req.params;
      if (
        (typeof queueId !== 'string' &&
          queueId !== undefined &&
          queueId !== null &&
          queueId !== '') ||
        (typeof ouvrierId !== 'string' &&
          ouvrierId !== undefined &&
          ouvrierId !== null &&
          ouvrierId !== '')
      ) {
        return res.status(400).json({
          success: false,
          message:
            "id de l'ouvrier et de la file d'attente doivent être une chaîne",
        });
      }
      if (!mongoose.Types.ObjectId.isValid(ouvrierId)) {
        return res.status(400).json({
          success: false,
          message: "id de l'ouvrier n'est pas id mongo valide",
        });
      }
      if (!mongoose.Types.ObjectId.isValid(queueId)) {
        return res.status(400).json({
          success: false,
          message: "id de la file d'attente n'est pas id mongo valide",
        });
      }
      const ouvrier = await OuvrierSchema.findById(ouvrierId);
      if (!ouvrier) {
        return res.status(404).json({
          success: false,
          message: 'Ouvrier non trouvé',
        });
      }
      const queue = await QueueSchema.findById(queueId);
      if (!queue) {
        return res.status(404).json({
          success: false,
          message: "File d'attente non trouvée",
        });
      }
      const order = await OrderSchema.findById(queue.order);
      if (!order) {
        return res.status(404).json({
          success: false,
          message: 'Demande non trouvée',
        });
      }
      ouvrier.assignTo.push(queue.order);
      queue.status = 'done';
      order.status = 'valided';
      order.assignTo = ouvrier._id;
      // await QueueSchema.findByIdAndDelete(queueId);
      await ouvrier.save();
      await queue.save();
      await order.save();

      // Enregistrement de la notification dans le model notificationAdmin
      const adminNotification = new NotificationAdminSchema({
        message: `La commande ${order.reference} vient d'être accepté par l'ouvrier ${ouvrier.personalInfos.firstName} ${ouvrier.personalInfos.lastName}!`,
        order: order._id,
      });
      await adminNotification.save();

      res
        .status(200)
        .json({ success: true, data: queue, message: 'Demande validée' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  // getQueueByCustomer: async (req, res) => {
  //   try {
  //     const profession = req.query.profession;
  //     const queue = await QueueSchema.find({ profession }).populate({
  //       path: 'order',
  //       model: 'Order',
  //       populate: {
  //         path: 'customer',
  //         model: 'Customer',
  //       },
  //     });
  //     if (!queue) {
  //       return res.status(404).json({
  //         success: false,
  //         message: 'Queue not found',
  //       });
  //     }

  //     res
  //       .status(200)
  //       .json({ success: true, data: queue, message: 'queue found' });
  //   } catch (error) {
  //     res.status(500).json({ message: error.message });
  //   }
  // },
};
