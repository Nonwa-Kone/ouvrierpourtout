const { HttpStatusCode } = require('axios');
const Order = require('../../models/orders/orders');
const Customer = require('../../models/customers/customer');
const NotificationAdminSchema = require('../../models/notifications/admin');
// const { createCustomer } = require('./Customer');

const { generateReference } = require('../../utils');
const { default: mongoose } = require('mongoose');
const { sendMail } = require('../../utils/transporter');
const Ouvriers = require('../../models/members/Ouvriers');
const Queue = require('../../models/queue/index');

module.exports = {
  //Create
  createOrder: async (req, res) => {
    try {
      let customer = null;
      // body validation
      if (!req.body) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: 'Request body is missing',
        });
      }
      // find customer
      const customerFound = await Customer.findOne({
        phoneNumber: req.body.customer.phoneNumber,
      });

      if (!customerFound) {
        const newCustomer = new Customer(req.body.customer);
        newCustomer.reference = generateReference('CLT', 5);
        newCustomer.email = 'samuel1.louis12@gmail.com';
        customer = newCustomer;
        await newCustomer.save();
      }

      customer = customerFound;

      const order = new Order({
        ...req.body,
        reference: generateReference('TCK', 8),
        customer: customer._id,
      });
      await order.save();

      // Enregistrement de la notification dans le model notificationAdmin
      const adminNotification = new NotificationAdminSchema({
        message: `${
          customer.firstName + ' ' + customer.lastName
        } vient de passer une demande d'ouvrier pour un service qui concerne ${
          order.profession
        } précisement ${order.speciality} dans la ville de ${
          customer.address.city
        } commune ${customer.address.municipality}`,
        order: order._id,
      });
      await adminNotification.save();

      // Envoyer un mail au client
      await sendMail({
        email: 'konenonwa1998@gmail.com',
        subject: 'Bienvenue dans notre aventure',
        html: `
          <div>
            <h1>Bonjour ${req.body.customer.firstName} ${req.body.customer.lastName}</h1>
            <p>Nous avons bien reçu votre demande, nous vous remercions pour votre confiance.</p>
          </div>
        `,
        // text: 'Mail of test sendmail ',
        // attachments: [
        //   {
        //     filename: 'test.pdf',
        //     path: 'test.pdf',
        //     contentType: 'application/pdf',
        //   },
        // ],
      });
      // Envoyer un mail au l'admin
      await sendMail({
        email: 'konenonwa1998@gmail.com',
        subject: 'Bienvenue dans notre aventure',
        html: `
          <div>
            <h1>Bonjour</h1>
            <p>Vous venez de recevoir une demande de travail</p>
          </div>
        `,
        // text: 'Mail of test sendmail ',
        // attachments: [
        //   {
        //     filename: 'test.pdf',
        //     path: 'test.pdf',
        //     contentType: 'application/pdf',
        //   },
        // ],
      });

      return res.status(HttpStatusCode.Created).json({
        success: true,
        message: 'Votre demande a bien été prise en compte',
        data: order,
      });
    } catch (error) {
      res.status(HttpStatusCode.BadRequest).json({
        success: false,
        message: error.message,
      });
    }
  },
  assignTicket: async (req, res) => {
    try {
      const { orderId, ticketId } = req.body;
      const order = await Order.findById(orderId);
      if (!order) {
        return res.status(HttpStatusCode.NotFound).json({
          success: false,
          message: 'Order not found',
        });
      }
      order.ticketId = ticketId;
      await order.save();
      return res.status(HttpStatusCode.Ok).json({
        success: true,
        message: 'Ticket assigned successfully',
        data: order,
      });
    } catch (error) {
      return res.status(HttpStatusCode.InternalServerError).json({
        success: false,
        message: error.message,
      });
    }
  },
  AssignTicketSpecialist: async (req, res) => {
    try {
      const { ouvrierId, orderId } = req.body;
      console.log(
        '🚀 ~ AssignTicketSpecialist: ~ ouvrierId, orderId:',
        ouvrierId,
        orderId
      );
      const ouvrier = await Ouvriers.findById(ouvrierId);
      if (!ouvrier) {
        return res.status(HttpStatusCode.NotFound).json({
          success: false,
          message: 'Order not found',
        });
      }
      const order = await Order.findById(orderId);
      if (!order) {
        return res.status(HttpStatusCode.NotFound).json({
          success: false,
          message: 'Order not found',
        });
      }
      order.assignTo = ouvrier._id;
      ouvrier.assignTo.push(order._id);
      await order.save();
      return res.status(HttpStatusCode.Ok).json({
        success: true,
        message: 'Ticket assigned successfully',
        data: order,
      });
    } catch (error) {
      return res.status(HttpStatusCode.InternalServerError).json({
        success: false,
        message: error.message,
      });
    }
  },
  AssignTradeBody: async (req, res) => {
    try {
      const { orderId, profession } = req.body;
      if (!orderId || !profession) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: 'Request body is missing',
        });
      }
      if (
        orderId === '' &&
        orderId !== undefined &&
        orderId !== null &&
        typeof orderId !== 'string'
      ) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: 'La valeur de la propriété orderId est incorrecte',
        });
      }
      if (!mongoose.Types.ObjectId.isValid(orderId)) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: 'OrderId is not a valid id',
        });
      }
      const order = await Order.findById(orderId);
      if (!order) {
        return res.status(HttpStatusCode.NotFound).json({
          success: false,
          message: 'Order not found',
        });
      }
      const queue = new Queue({
        name: 'assignTradeBody',
        order: order._id,
        profession: profession,
      });
      await queue.save();
      // Enregistrement de la notification dans le model notificationAdmin
      const adminNotification = new NotificationAdminSchema({
        message: `Vous avez assignez la commande ${order.reference} à l'ensemble des ouvriers ${order.profession} attendez à ce qu'un ouvrier accepte la commande merci!`,
        order: order._id,
      });
      await adminNotification.save();
      return res.status(HttpStatusCode.Ok).json({
        success: true,
        message: 'Ticket assigned successfully',
        data: queue,
      });
    } catch (error) {
      return res.status(HttpStatusCode.InternalServerError).json({
        success: false,
        message: error.message,
      });
    }
  },
  //Read
  findAllOrders: async (req, res) => {
    try {
      const {
        page = 1,
        limit = 10,
        searchTerm,
        status,
        period,
        jobs,
      } = req.query;
      console.log('🚀 ~ findAllOrders: ~ req.query:', status);

      let query = {};

      const isValidValue = (value) => {
        return value !== undefined && value !== null && value !== '';
      };

      if (isValidValue(status)) {
        query.status = status;
      }

      if (isValidValue(jobs)) {
        query.profession = jobs;
      }

      if (isValidValue(period?.from) && isValidValue(period?.to)) {
        query.createdAt = {
          $gte: new Date(period.from),
          $lte: new Date(period.to),
        };
      }

      if (isValidValue(searchTerm)) {
        query.$or = [
          { reference: { $regex: searchTerm, $options: 'i' } },
          { profession: { $regex: searchTerm, $options: 'i' } },
          { status: { $regex: searchTerm, $options: 'i' } },
        ];
      }

      const count = await Order.countDocuments();
      const totalPages = Math.ceil(count / limit);
      const nextPage =
        Math.ceil(count / Number(limit)) > Number(page)
          ? Number(page) + 1
          : null;
      const prevPage = Number(page) > 1 ? Number(page) - 1 : null;
      const skip = (page - 1) * limit;
      const orders = await Order.find(query)
        .populate({
          path: 'customer',
          model: 'Customer',
        })
        .populate({
          path: 'assignTo',
          model: 'ouvriers',
        })
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });

      // Log the populated orders to verify the results
      console.log('🚀 ~ findAllOrders: ~ orders:', orders);

      res.status(HttpStatusCode.Ok).json({
        success: true,
        data: orders,
        message: 'Tickets found',
        currentPage: page,
        count,
        totalPages,
        nextPage,
        prevPage,
      });
    } catch (error) {
      return res.status(HttpStatusCode.InternalServerError).json({
        success: false,
        message: error.message,
      });
    }
  },
  findByIdOrder: async (req, res) => {
    try {
      if (mongoose.isValidObjectId(req.params.id)) {
        return res.status(HttpStatusCode.BadRequest).json({
          message: "L'identifiant de votre commande n'est pas un ID mongoose",
        });
      }
      const orderFound = await Order.findById(req.params.id)
        .populate({
          path: 'customer',
          model: 'Customer',
        })
        .populate({
          path: 'assignTo',
          model: 'ouvriers',
        });
      res.status(HttpStatusCode.Ok).json({
        success: true,
        data: orderFound,
        message: 'Tickets found',
      });
    } catch (error) {
      res
        .status(HttpStatusCode.BadRequest)
        .json({ success: false, data: error, message: error.message });
    }
  },
  findOrderByAssignedTo: async (req, res) => {
    try {
      const { assignedTo } = req.params;
      // query params
      const { limit = 10, page = 1, searchTerm, status } = req.query;

      let query = {};

      if (!mongoose.Types.ObjectId.isValid(assignedTo)) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: 'assignedTo is not a valid id',
        });
      }

      if (searchTerm) {
        query.$or = [
          { reference: { $regex: searchTerm, $options: 'i' } },
          {
            'customer.personalInfos.firstName': {
              $regex: searchTerm,
              $options: 'i',
            },
          },
          {
            'customer.personalInfos.lastName': {
              $regex: searchTerm,
              $options: 'i',
            },
          },
          {
            'customer.personalInfos.email': {
              $regex: searchTerm,
              $options: 'i',
            },
          },
          { 'profession.jobs': { $regex: searchTerm, $options: 'i' } },
          { nationality: { $regex: searchTerm, $options: 'i' } },
          { contract: { $regex: searchTerm, $options: 'i' } },
          { 'address.city': { $regex: searchTerm, $options: 'i' } },
          { 'address.country': { $regex: searchTerm, $options: 'i' } },
        ];
      }

      if (status) {
        query['status'] = status;
      }

      query['assignTo'] = assignedTo;

      const count = await Order.countDocuments({ assignTo: assignedTo });
      const totalPages = Math.ceil(count / limit);
      const nextPage =
        Math.ceil(count / Number(limit)) > Number(page)
          ? Number(page) + 1
          : null;
      const prevPage = Number(page) > 1 ? Number(page) - 1 : null;
      const skip = (page - 1) * limit;

      const orders = await Order.find(query)
        .populate([
          {
            path: 'customer',
            model: 'Customer',
          },
        ])
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

      res.status(HttpStatusCode.Ok).json({
        success: true,
        data: orders,
        message: 'Tickets found',
        currentPage: page,
        count,
        totalPages,
        nextPage,
        prevPage,
      });
    } catch (error) {
      return res.status(HttpStatusCode.InternalServerError).json({
        success: false,
        data: null,
        message: error.message,
      });
    }
  },
  orderFromProfileOuvrier: async (req, res) => {
    try {
      const { id } = req.params;
      console.log('bODY customer', req.body.customer);
      let customer = null;
      // body validation
      if (!req.body) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: 'Request body is missing',
        });
      }
      // find customer
      const customerFound = await Customer.findOne({
        phoneNumber: req.body.customer.phoneNumber,
      });
      console.log('🚀 ~ createOrder: ~ customerFound:', customerFound);

      if (!customerFound) {
        const newCustomer = new Customer(req.body.customer);
        newCustomer.reference = generateReference('CLT', 5);
        customer = newCustomer;
        await newCustomer.save();
      } else {
        customer = customerFound;
      }

      const order = new Order({
        ...req.body,
        reference: generateReference('TCK', 8),
        customer: customer._id,
        assignTo: id,
      });
      await order.save();
      // Envoyer un mail au client
      await sendMail({
        email: req.body.customer.email,
        subject: 'Bienvenue dans notre aventure',
        html: `
          <div>
            <h1>Bonjour ${req.body.customer.firstName} ${req.body.customer.lastName}</h1>
            <p>Nous avons bien reçu votre demande, nous vous remercions pour votre confiance.</p>
          </div>
        `,
        // text: 'Mail of test sendmail ',
        attachments: [
          {
            filename: 'test.pdf',
            path: 'test.pdf',
            contentType: 'application/pdf',
          },
        ],
      });
      // Envoyer un mail au l'admin
      await sendMail({
        email: 'konenonwa1998@gmail.com',
        subject: 'Bienvenue dans notre aventure',
        html: `
          <div>
            <h1>Bonjour</h1>
            <p>Vous venez de recevoir une demande de travail</p>
          </div>
        `,
        // text: 'Mail of test sendmail ',
        attachments: [
          {
            filename: 'test.pdf',
            path: 'test.pdf',
            contentType: 'application/pdf',
          },
        ],
      });

      return res.status(HttpStatusCode.Created).json({
        success: true,
        message: 'Votre demande a bien été prise en compte',
        data: order,
      });
    } catch (error) {
      return res.status(HttpStatusCode.InternalServerError).json({
        success: false,
        data: null,
        message: error.message,
      });
    }
  },
  editStatusOrderByTicketId: async (req, res) => {
    const id = req.params.idTicket;
    try {
      if (!mongoose.isValidObjectId(id)) {
        return res.status(200).json({
          status: false,
          message: "L'identifiant de l'ouvrier est incorrect!",
        });
      }
      if (!req.body.status)
        return res
          .status(200)
          .json({ success: false, message: 'Le status est requis!' });
      const data = await Order.findByIdAndUpdate(
        id,
        { $set: { status: req.body.status, amount: req.body.amount } },
        { new: true }
      ).populate('customer');

      // Enregistrement de la notification dans le model notificationAdmin
      const adminNotification = new NotificationAdminSchema({
        message: `${
          data.customer.firstName + ' ' + data.customer.lastName
        } à modifier le statut de la commande ${data.reference} à ${
          data.status
        } 
        }`,
        order: data._id,
      });
      await adminNotification.save();

      res.status(200).json({
        success: true,
        message:
          'Le status de votre ticket a été mise à jours avec succès merci!',
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },
};
