const { default: mongoose } = require('mongoose');
const Customer = require('../../models/customers/customer');
const { generateReference } = require('../../utils');

module.exports = {
  //Create
  createCustomer: async (req, res) => {
    try {
      console.log('🚀 ~ createCustomer: ~ req.body:', req.body);
      if (!req.body) {
        return res
          .status(400)
          .json({ success: false, message: 'Body required' });
      }
      const newCustomer = new Customer(req.body);
      newCustomer.reference = generateReference('CLT', 5);
      console.log('🚀 ~ createCustomer: ~ newCustomer:', newCustomer);
      await newCustomer.save();
      res.status(200).json({
        success: true,
        message: 'Customer created successfully',
        data: newCustomer,
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },
  //Read
  findAllCustomers: async (req, res) => {
    try {
      const { page = 1, limit = 10, searchTerm, gender, period } = req.query;
      const query = {};

      if (gender) {
        query.gender = gender;
      }

      if (searchTerm) {
        query.$or = [
          { firstName: { $regex: searchTerm, $options: 'i' } },
          { lastName: { $regex: searchTerm, $options: 'i' } },
          { phoneNumber: { $regex: searchTerm, $options: 'i' } },
          { 'address.city': { $regex: searchTerm, $options: 'i' } },
          { 'address.country': { $regex: searchTerm, $options: 'i' } },
          { 'address.street': { $regex: searchTerm, $options: 'i' } },
          { 'address.zipCode': { $regex: searchTerm, $options: 'i' } },
          { 'address.municipality': { $regex: searchTerm, $options: 'i' } },
        ];
      }

      if (period) {
        query.createdAt = {
          $gte: new Date(period.from),
          $lte: new Date(period.to),
        };
      }

      const count = await Customer.countDocuments();
      const totalPages = Math.ceil(count / limit);
      const nextPage =
        Math.ceil(count / Number(limit)) > Number(page)
          ? Number(page) + 1
          : null;
      const prevPage = Number(page) > 1 ? Number(page) - 1 : null;
      const skip = (page - 1) * limit;
      const customers = await Customer.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit));
      res.status(200).json({
        success: true,
        data: customers,
        totalPages,
        nextPage,
        prevPage,
        currentPage: page,
        count,
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },
  //Update
  updateCustomer: async (req, res) => {
    try {
      console.log('🚀 ~ updateCustomer: ~ req.body:', req.body);
      if (!req.body) {
        return res
          .status(400)
          .json({ success: false, message: 'Body required' });
      }
      const customer = await Customer.findById(req.params.id);
      if (!customer) {
        return res.status(404).json({
          success: false,
          message: 'Customer not found',
        });
      }
      customer.nom = req.body.nom;
      customer.prenom = req.body.prenom;
      customer.phoneNumber = req.body.phoneNumber;
      customer.adresse = req.body.adresse;
      customer.description = req.body.description;
      await customer.save();
      res.status(200).json({
        success: true,
        message: 'Customer updated successfully',
        data: customer,
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },
  //Delete
  deleteCustomer: async (req, res) => {
    try {
      const customer = await Customer.findById(req.params.id);
      if (!customer) {
        return res.status(404).json({
          success: false,
          message: 'Customer not found',
        });
      }
      await customer.remove();
      res.status(200).json({
        success: true,
        message: 'Customer deleted successfully',
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },
  //FindById
  findCustomerById: async (req, res) => {
    try {
      const customer = await Customer.findById(req.params.id);
      if (!customer) {
        return res.status(404).json({
          success: false,
          message: 'Customer not found',
        });
      }
      res.status(200).json({
        success: true,
        message: 'Customer found successfully',
        data: customer,
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },
  //FindByEmail
  findCustomerByEmail: async (req, res) => {
    try {
      const { email } = req.body;

      if (!email) {
        return res
          .status(400)
          .json({ success: false, message: 'Email is required' });
      }

      const customer = await Customer.findOne({
        email,
      });
      if (!customer) {
        return res.status(404).json({
          success: false,
          message: 'Customer not found',
        });
      }
      res.status(200).json({
        success: true,
        message: 'Customer found successfully',
        data: customer,
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },
  //FindByName
  findCustomerByName: async (req, res) => {
    try {
      const { nom, prenom } = req.query;

      if (!nom || !prenom) {
        return res
          .status(400)
          .json({ success: false, message: 'Nom and prenom are required' });
      }

      const customer = await Customer.findOne({
        nom,
        prenom,
      });
      if (!customer) {
        return res.status(404).json({
          success: false,
          message: 'Customer not found',
        });
      }
      res.status(200).json({
        success: true,
        message: 'Customer found successfully',
        data: customer,
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },
  //FindByPhoneNumber
  findCustomerByPhoneNumber: async (req, res) => {
    try {
      const { phoneNumber } = req.query;
      console.log(
        '🚀 ~ findCustomerByPhoneNumber: ~ phoneNumber:',
        phoneNumber
      );

      if (!phoneNumber) {
        return res
          .status(400)
          .json({ success: false, message: 'Phone number is required' });
      }

      const customer = await Customer.findOne({
        phoneNumber,
      });
      console.log('🚀 ~ findCustomerByPhoneNumber: ~ customer:', customer);
      if (!customer) {
        return res.status(404).json({
          success: false,
          message: 'Customer not found',
        });
      }
      res.status(200).json({
        success: true,
        message: 'Customer found successfully',
        data: customer,
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },
  //FindByAdresse
  findCustomerByAdresse: async (req, res) => {
    try {
      const { city, commune, street } = req.query;

      if (!city || !commune || !street) {
        return res.status(400).json({
          success: false,
          message: 'City, commune and street are required',
        });
      }

      const customer = await Customer.findOne({
        adresse: {
          city,
          commune,
          street,
        },
      });
      if (!customer) {
        return res.status(404).json({
          success: false,
          message: 'Customer not found',
        });
      }
      res.status(200).json({
        success: true,
        message: 'Customer found successfully',
        data: customer,
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },
  deleteCustomer: async (req, res) => {
    const { id } = req.params;
    try {
      if (!id) {
        return res.status(400).json({ success: false, message: 'Missing id' });
      }
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: 'Invalid id' });
      }
      const customer = await Customer.findByIdAndDelete(id);
      res
        .status(200)
        .json({ success: true, message: 'Customer deleted successfully' });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
};
