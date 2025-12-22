const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const ModelAdmin = require('../../models/admin/Admin.js');

module.exports = {
  // GET /admin
  getAdmins: async (req, res) => {
    try {
      const { page, limit, role, gender, searchTerm } = req.query;
      let query = {};
      if (role) {
        query['role.label'] = role;
      }
      if (gender) {
        query['personalInfos.gender'] = gender;
      }
      if (searchTerm) {
        query.$or = [
          { 'personalInfos.firstName': { $regex: searchTerm, $options: 'i' } },
          { 'personalInfos.lastName': { $regex: searchTerm, $options: 'i' } },
          { 'personalInfos.email': { $regex: searchTerm, $options: 'i' } },
          { profession: { $regex: searchTerm, $options: 'i' } },
          { nationality: { $regex: searchTerm, $options: 'i' } },
          { contract: { $regex: searchTerm, $options: 'i' } },
          { 'address.city': { $regex: searchTerm, $options: 'i' } },
          { 'address.country': { $regex: searchTerm, $options: 'i' } },
        ];
      }

      const count = await ModelAdmin.countDocuments(query);
      const skip = (page - 1) * limit;
      const nextPage =
        Math.ceil(count / Number(limit)) > Number(page)
          ? Number(page) + 1
          : null;
      const prevPage = Number(page) > 1 ? Number(page) - 1 : null;
      const totalPages = Math.ceil(count / Number(limit));
      const admin = await ModelAdmin.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
      res.status(200).json({
        success: true,
        data: admin,
        count,
        nextPage,
        prevPage,
        totalPages,
        currentPage: Number(page),
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  // GET /admin/:id
  getAdmin: async (req, res) => {
    try {
      console.log('🚀 ~ getAdmin: ~ req.params.id:', req.params.id);
      if (!req.params.id) {
        res.status(400).json({ sucess: false, message: 'Missing id' });
      }
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400).json({ sucess: false, message: 'Invalid id' });
      }
      const admin = await ModelAdmin.findById(req.params.id);
      res
        .status(200)
        .json({ success: true, message: 'Admin found', data: admin });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  // POST /admin
  createAdmin: async (req, res) => {
    try {
      console.log('🚀 ~ createAdmin: ~ req.body:', req.body);
      if (!req.body) {
        res.status(400).json({ message: 'Missing body' });
      }
      const gentSalt = await bcrypt.genSalt(10);
      const bcryptPassword = await bcrypt.hash(req.body.password, gentSalt);
      const payload = {
        personalInfos: {
          firstName: req.body.personalInfos.firstName,
          lastName: req.body.personalInfos.lastName,
          phoneNumber: req.body.personalInfos.phoneNumber,
          gender: req.body.personalInfos.gender,
          email: req.body.personalInfos.email,
        },
        address: {
          street: req.body.address.street,
          city: req.body.address.city,
          zipCode: req.body.address.zipCode,
          country: req.body.address.country,
        },
        role: {
          label: req.body.role.label,
          description: req.body.role.description,
          permissions: req.body.role.permissions,
        },
        password: bcryptPassword,
      };
      const admin = new ModelAdmin(payload);
      await admin.save();
      const message = `${admin.personalInfos.firstName} ${admin.personalInfos.lastName} has been created`;
      res.status(201).json({ success: true, message, data: admin });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  // PUT /admin/:id
  updateAdmin: async (req, res) => {
    try {
      const admin = await ModelAdmin.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );
      res.status(200).json(admin);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  // DELETE /admin/:id
  deleteAdmin: async (req, res) => {
    try {
      if (!req.params.id) {
        res
          .status(400)
          .json({ message: 'Impossible de supprimer un admin sans id' });
      }
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400).json({ message: "Ceci n'est pas un id valide" });
      }
      const admin = await ModelAdmin.findByIdAndDelete(req.params.id);
      res.status(200).json({
        message: 'Administrateur supprimé',
        data: admin,
        success: true,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // GET /admin/checkByToken
  // checkByToken: async (req, res) => {
  //   try {
  //     const token = req.headers.authorization;
  //     console.log('🚀 ~ checkByToken ~ token:', token);
  //     if (!token) {
  //       res.status(401).json({ message: 'Missing token' });
  //     }
  //     const decoded = jwt.verify(token, process.env.SECRET_TOKEN_ADMIN_LOGIN);
  //     req.admin = decoded;
  //     next();
  //   } catch (error) {
  //     res.status(401).json({ message: 'Invalid token' });
  //   }
  // },

  // POST /admin/login
  loginAdmin: async (req, res) => {
    try {
      if (!req.body) {
        res.status(400).json({ message: 'Missing body' });
      }
      console.log('🚀 ~ loginAdmin: ~ req.body:', req.body);
      const { email, password } = req.body;
      const admin = await ModelAdmin.findOne({ 'personalInfos.email': email });
      console.log('🚀 ~ loginAdmin: ~ admin:', admin);
      if (!admin) {
        return res.status(404).json({ message: 'Invalid email' });
      }
      const bcryptPassword = await bcrypt.compare(password, admin.password);
      if (!bcryptPassword) {
        return res.status(404).json({ message: 'Invalid password' });
      }
      const token = jwt.sign(
        {
          _id: admin._id,
          email: admin.personalInfos.email,
          role: admin.role.label,
        },
        process.env.SECRET_TOKEN_ADMIN_LOGIN,
        {
          expiresIn: '24h',
        }
      );
      admin.token = token;
      admin.isLogged = true;
      await admin.save();
      res.status(200).json({
        success: true,
        message: 'Logged in',
        data: admin,
        token: token,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  //TODO: à revoir
  findByTokens: async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      console.log('🚀 ~ findByTokens: ~ authHeader:', authHeader);
      const token = authHeader && authHeader.split(' ')[1];

      if (!token) {
        return res
          .status(404)
          .json({ success: false, message: 'Token introuvable' });
      }

      const admin = jwt.verify(token, process.env.SECRET_TOKEN_ADMIN_LOGIN);

      if (!admin) {
        return res.status(401).json({ message: 'Token invalide' });
      }

      const findAdmin = await ModelAdmin.findById(admin._id);

      req.admin = findAdmin; // Store decoded admin info in the request object
      console.log('🚀 ~ findByTokens: ~ admin:', admin);

      return res
        .status(200)
        .json({ success: true, message: 'OK', data: findAdmin });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  logOutAdmin: async (req, res, next) => {
    try {
      const { userId } = req.params;
      const admin = await ModelAdmin.findById(userId);

      if (!admin)
        return res.status(400).json({
          success: false,
          message: 'Membre introuvable !',
        });

      // admin.devices = admin.devices.map((_device) => ({
      //   ..._device,
      //   isLoggedIn: false,
      // }));

      // action management
      // const actionData = {platform: getPlatform(req)};
      req.admin = admin;
      // const newAction = IdentifyActions(req, endpointActions.LOGOUT, actionData);
      // await Promise.all([admin.save(), helperActionUpdate(newAction, actionsStatuses.SUCESS)]);

      return res.status(200).json({
        success: true,
        message: 'Vous êtes déconnecté !',
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
