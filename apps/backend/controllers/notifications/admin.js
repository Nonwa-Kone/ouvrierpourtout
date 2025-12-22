const { HttpStatusCode } = require('axios');
const notificationAdminSchema = require('../../models/notifications/admin');
const { default: mongoose } = require('mongoose');

module.exports = {
  //Read
  getAdminNotification: async (req, res) => {
    try {
      const countNotificationNotOpenned = await notificationAdminSchema
        .find({ isOpenned: false })
        .countDocuments();
      const notificationAdmins = await notificationAdminSchema
        .find({})
        .populate({
          path: 'order',
          populate: 'customer',
        })
        .sort({ createdAt: -1 });
      res.status(HttpStatusCode.Ok).json({
        message: 'La liste des notifcations a bien été reccupérer avec succès',
        data: notificationAdmins,
        success: true,
        count: countNotificationNotOpenned,
      });
    } catch (error) {
      res
        .status(HttpStatusCode.BadRequest)
        .json({ success: false, message: error?.message, data: error });
    }
  },
  getAdminNotificationById: async (req, res) => {
    try {
      if (!mongoose.isValidObjectId) {
        return res.status(HttpStatusCode.BadRequest).json({
          message:
            "L'identifiant de la notification n'est pas un ID valide mongoose",
          success: true,
          data: null,
        });
      }
      const notificationAdmin = await notificationAdminSchema
        .findById(req.params.id)
        .populate({
          path: 'order',
          populate: 'customer',
        })
        .sort({ createdAt: -1 });
      notificationAdmin.isOpenned = true;
      await notificationAdmin.save();
      res.status(HttpStatusCode.Ok).json({
        message: 'La notification a bien été reccupérer avec succès',
        data: notificationAdmin,
        success: true,
      });
    } catch (error) {
      res
        .status(HttpStatusCode.BadRequest)
        .json({ message: error.messa, data: error, success: false });
    }
  },
};
