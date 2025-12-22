const { HttpStatusCode } = require('axios');
const Order = require('../../models/orders/orders');
const Customer = require('../../models/customers/customer');
const NotificationAdminSchema = require('../../models/notifications/admin');
const { generateReference } = require('../../utils');
const { sendMail } = require('../../utils/transporter');

exports.orderRoutes = (socket) => {
  // CREATE ORDER
  socket.on('order:create', async (data) => {
    try {
      console.log('bODY customer', data.customer);
      let customer = null;
      // body validation
      if (!data) {
        return res.status(HttpStatusCode.BadRequest).json({
          success: false,
          message: 'Request body is missing',
        });
      }
      // find customer
      const customerFound = await Customer.findOne({
        phoneNumber: data.customer.phoneNumber,
      });
      console.log('🚀 ~ createOrder: ~ customerFound:', customerFound);

      if (!customerFound) {
        const newCustomer = new Customer(data.customer);

        newCustomer.reference = generateReference('CLT', 5);
        newCustomer.email = 'samuel1.louis1@gmail.com';
        customer = newCustomer;
        await newCustomer.save();
      }

      customer = customerFound;

      const order = new Order({
        ...data,
        reference: generateReference('TCK', 8),
        customer: customer._id,
      });
      console.log('🚀 ~ createOrder: ~ order:', order);
      // await order.save();

      // Enregistrement de la notification dans le model notificationAdmin
      const adminNotification = new NotificationAdminSchema({
        message: `${
          data.customer.firstName + ' ' + data.customer.lastName
        } vient de passer une demande d'ouvrier pour un service qui concerne ${
          data.profession
        } précisement ${data.speciality} dans la ville de ${
          data.customer.address.city
        } commune ${data.customer.address.municipality}`,
        order: order._id,
      });
      // await adminNotification.save();

      // Envoyer un mail au client
      await sendMail({
        email: 'konenonwa1998@gmail.com',
        subject: 'Bienvenue dans notre aventure',
        html: `
          <div>
            <h1>Bonjour ${data.customer.firstName} ${data.customer.lastName}</h1>
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
      console.log('🚀 ~ createOrder: ~ order start socket:', order);
      await socket.emit('order:create:response', {
        success: true,
        message: 'Votre a été prise en compte',
        data: order,
      });
      await socket.broadcast.emit('order:create:response', {
        success: true,
        message: 'Nouvelle commande reçue!',
        data: order,
      });
      console.log('🚀 ~ createOrder: ~ order end socket:', order);
    } catch (error) {
      console.error('Error creating order:', error);
      await socket.broadcast.emit('order:create:error', {
        success: false,
        message: 'An error occurred while creating order.',
        data: error,
      });
    }
  });
  //OTHER DATA
  //READ
};
