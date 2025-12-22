const Customer = require('../../models/customers/customer');
const Order = require('../../models/orders/orders');
const Ouvrier = require('../../models/members/Ouvriers');

module.exports = {
  getInsight: async (req, res) => {
    try {
      const customers = await Customer.find({}).countDocuments();
      const orders = await Order.find({}).countDocuments();
      const ouvriers = await Ouvrier.find({}).countDocuments();
      const insights = {
        customers,
        orders,
        ouvriers,
      };
      res.status(200).json({ success: true, data: insights });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },
};
