const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ModelOuvriers = require('../../models/members/Ouvriers.js');
const ModelDocuments = require('../../models/document/index.js');
const { generateReference } = require('../../utils/index.js');
const { createDocument } = require('../../api/document.api.js');
const { sendMail } = require('../../utils/transporter.js');
const documents = require('../../constant/document.js');
// const { sendMail } = require('../../config/nodemailer.config.js');

module.exports = {
  // GET /ouvriers
  getOuvriers: async (req, res) => {
    try {
      const {
        page = 1,
        limit = 10,
        jobs,
        speciality,
        municipality,
        city,
        searchTerm,
        experience,
      } = req.query;
      let query = {};
      if (jobs) {
        query['profession.jobs'] = jobs;
      }
      if (speciality) {
        query['profession.speciality'] = speciality;
      }
      if (experience) {
        query['profession.experience'] = experience;
      }
      if (municipality) {
        query['adress.municipality'] = municipality;
      }
      if (city) {
        query['address.city'] = city;
      }

      if (searchTerm) {
        query.$or = [
          { 'personalInfos.reference': { $regex: searchTerm, $options: 'i' } },
          { 'personalInfos.firstName': { $regex: searchTerm, $options: 'i' } },
          { 'personalInfos.lastName': { $regex: searchTerm, $options: 'i' } },
          { 'personalInfos.email': { $regex: searchTerm, $options: 'i' } },
          {
            'personalInfos.phoneNumber': { $regex: searchTerm, $options: 'i' },
          },
          { 'profession.jobs': { $regex: searchTerm, $options: 'i' } },
          { nationality: { $regex: searchTerm, $options: 'i' } },
          { contract: { $regex: searchTerm, $options: 'i' } },
          { 'address.city': { $regex: searchTerm, $options: 'i' } },
          { 'address.country': { $regex: searchTerm, $options: 'i' } },
        ];
      }
      const count = await ModelOuvriers.countDocuments(query);
      const skip = (page - 1) * limit;
      const nextPage =
        Math.ceil(count / Number(limit)) > Number(page)
          ? Number(page) + 1
          : null;
      const prevPage = Number(page) > 1 ? Number(page) - 1 : null;
      const totalPages = Math.ceil(count / Number(limit));

      const ouvriers = await ModelOuvriers.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
      res.status(200).json({
        success: true,
        data: ouvriers,
        count,
        currentPage: Number(page),
        totalPages: totalPages,
        nextPage: nextPage,
        prevPage: prevPage,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  // GET /ouvriers/:id
  getOuvrier: async (req, res) => {
    try {
      if (!req.params.id) {
        return res.status(400).json({ sucess: false, message: 'Missing id' });
      }
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ sucess: false, message: 'Invalid id' });
      }
      const ouvrier = await ModelOuvriers.findById(req.params.id);
      res
        .status(200)
        .json({ success: true, message: 'Ouvrier found', data: ouvrier });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  // POST /ouvriers
  createOuvrier: async (req, res) => {
    // const session = await mongoose.startSession();
    // session.startTransaction();
    try {
      console.log('🚀 ~ createOuvrier: ~ req.body:', req.body);
      if (!req.body) {
        return res.status(400).json({ message: 'Missing body' });
      }

      const gentSalt = await bcrypt.genSalt(10);
      const bcryptPassword = await bcrypt.hash('000000', gentSalt);

      const ouvrier = new ModelOuvriers(req.body);
      ouvrier.reference = generateReference('OUV', 5);
      ouvrier.password = bcryptPassword;
      ouvrier.contract.referenceContract = generateReference('CTR', 5);
      console.log('🚀 ~ createOuvrier: ~ ouvrier:', ouvrier);
      // await ouvrier.save();

      const arrayIdDocumentForPartner = [];
      await Promise.all(
        documents.map(async (document) => {
          const documents = new ModelDocuments({
            ...document,
            ownerId: ouvrier._id,
            status: 'pending',
          });
          arrayIdDocumentForPartner.push(documents._id);
          await documents.save();
        })
      );

      console.log(
        '🚀 ~ createOuvrier: ~ arrayIdDocumentForPartner:',
        arrayIdDocumentForPartner
      );
      if (Array.isArray(arrayIdDocumentForPartner)) {
        arrayIdDocumentForPartner.forEach((id) => {
          ouvrier.document.push(id);
        });
      }

      // const { data } = await createDocument(ouvrier._id);
      // console.log('🚀 ~ createOuvrier: ~ data:', data);

      // if (Array.isArray(data?.data)) {
      //   data.data.forEach((document) => {
      //     ouvrier.document.push(document._id);
      //   });
      // }

      await ouvrier.save();
      // await session.commitTransaction();
      // session.endSession();

      await sendMail({
        email: 'konenonwa1998@gmail.com',
        subject: 'Bienvenue dans notre aventure',
        html: `
          <div>
            <h1>Bonjour ${ouvrier.personalInfos.firstName} ${ouvrier.personalInfos.lastName}</h1>
            <p>Nous sommes très ravie de vous avoir dans notre aventure, nous espérons que vous serez heureux et satisfait de votre expérience.</p>
            <p>Votre mot de passe par défaut est : 000000, veuillez le changer dès que possible.</p>
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

      const message = `${ouvrier.personalInfos.firstName} ${ouvrier.personalInfos.lastName} has been created`;
      res.status(201).json({ success: true, message, data: ouvrier });
    } catch (error) {
      // await session.abortTransaction();
      // session.endSession();
      res.status(500).json({ message: error.message });
    }
  },
  // PUT /ouvriers/:id
  updateOuvrier: async (req, res) => {
    try {
      const ouvrier = await ModelOuvriers.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );
      res.status(200).json(ouvrier);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  // DELETE /ouvriers/:id
  deleteOuvrier: async (req, res) => {
    try {
      const ouvrier = await ModelOuvriers.findByIdAndDelete(req.params.id);
      res.status(200).json(ouvrier);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  // GET /ouvriers/login
  loginOuvrier: async (req, res) => {
    try {
      if (!req.body) {
        res.status(400).json({ message: 'Missing body' });
      }
      const { email, password } = req.body;
      const ouvrier = await ModelOuvriers.findOne({
        'personalInfos.email': email,
      });
      if (!ouvrier) {
        res.status(401).json({ message: 'Invalid email or password' });
      }
      const bcryptPassword = await bcrypt.compare(password, ouvrier.password);
      if (!bcryptPassword) {
        res.status(401).json({ message: 'Invalid email or password' });
      }
      const token = jwt.sign(
        { id: ouvrier._id },
        process.env.SECRET_TOKEN_ADMIN_LOGIN,
        { expiresIn: '24h' }
      );
      // On enregistre le token dans la base de données
      ouvrier.token = token;
      // On met isLogged à true pour indiquer que l'utilisateur est connecté
      ouvrier.isLogged = true;
      // on fait la mise à jour de la base de données
      await ouvrier.save();
      res
        .status(200)
        .json({ success: true, message: 'Logged in', data: ouvrier, token });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  // POST /ouvriers/findByToken
  findByTokens: async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      const token = authHeader && authHeader.split(' ')[1];

      if (!token)
        return res
          .status(404)
          .json({ success: false, message: 'token introuvable' });
      const admin = jwt.verify(
        token,
        process.env.SECRET_TOKEN_ADMIN_LOGIN,
        (err, decoded) => {
          if (err) {
            return res.status(401).json({ message: 'Token invalide' });
          }
          req.ouvrier = decoded;
        }
      );
      // req.admin = admin;
      // const ouvrier = await ouvriers.findById(admin.id);
      res.status(200).json({ success: true, data: ouvrier, message: 'OK' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  login: async (req, res) => {
    try {
      // console.log('🚀 ~ login: ~ req.body:', req.body);
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ message: 'Missing body' });
      }
      const user = await ModelOuvriers.findOne({
        'personalInfos.email': email,
      });
      console.log('🚀 ~ login: ~ user:', user);
      if (!user) {
        return res.status(401).json({ message: 'Invalid email' });
      }
      // const bcryptPassword = await bcrypt.compare(password, user.password);
      // if (!bcryptPassword) {
      //   return res.status(401).json({ message: 'Invalid password' });
      // }
      const token = jwt.sign(
        { id: user._id },
        process.env.SECRET_TOKEN_PARTNER_LOGIN,
        { expiresIn: '24h' }
      );
      // On enregistre le token dans la base de données
      user.token = token;
      // On met isLogged à true pour indiquer que l'utilisateur est connecté
      user.isLogged = true;
      // on fait la mise à jour de la base de données
      await user.save();
      res
        .status(200)
        .json({ success: true, message: 'Logged in', data: user, token });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  findByToken: async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      console.log('🚀 ~ findByToken: ~ authHeader:', authHeader);
      const token = authHeader && authHeader.split(' ')[1];
      if (!token) {
        return res
          .status(404)
          .json({ success: false, message: 'Token introuvable' });
      }
      console.log('🚀 ~ findByToken: ~ token:', token);
      const user = jwt.verify(token, process.env.SECRET_TOKEN_PARTNER_LOGIN);
      if (!user) {
        return res
          .status(401)
          .json({ success: false, message: 'Token invalide' });
      }
      console.log('🚀 ~ findByToken: ~ user:', user);
      const findUser = await ModelOuvriers.findById(user.id);
      if (!findUser) {
        return res
          .status(401)
          .json({ success: false, message: 'Token invalide' });
      }
      res
        .status(200)
        .json({ success: true, message: 'Token valide', data: findUser });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
  //PUT profFile
  updateOuvrierProfFile: async (req, res) => {
    try {
      console.log('🚀 ~ updateOuvrierProfFile: ~ req.body:', req.file);
      const ouvrier = await ModelOuvriers.findByIdAndUpdate(
        req.params.id,
        {
          ...req.body,
          profFile: req.body.profFile,
        },
        {
          new: true,
        }
      );
      res.status(200).json({
        success: true,
        message: 'Fichier uploadé avec succès',
        data: ouvrier,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  updateOuvrierImgRealisation: async (req, res) => {
    try {
      console.log('🚀 ~ updateOuvrierImgRealisation ~ req.body:', req.body);

      // Verifier si id est un string
      // if (typeof req.params.id !== 'string') {
      //   return res.status(400).json({
      //     success: false,
      //     message: 'id doit être un string',
      //   });
      // }
      // Verifier si le payload contient une propriété realization
      // if (!req.body.realization) {
      //   return res.status(400).json({
      //     success: false,
      //     message: 'Le payload doit contenir une propriété realization',
      //   });
      // }

      // if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      //   return res.status(400).json({
      //     success: false,
      //     message: 'id doit être un string',
      //   });
      // }

      // Vérification si l'ouvrier existe
      // const ouvrier = await ModelOuvriers.findById(req.params.id);
      // if (!ouvrier) {
      //   return res.status(404).json({
      //     success: false,
      //     message: 'Ouvrier non trouvé',
      //   });
      // }

      // Mise à jour avec $push pour ajouter une image dans le tableau realization
      const updatedOuvrier = await ModelOuvriers.findByIdAndUpdate(
        req.params.id,
        {
          $addToSet: {
            realization: req.body.realization, // Assurez-vous que realization contient une chaîne valide (ex: URL ou chemin du fichier)
          },
        },
        { new: true } // Retourne le document mis à jour
      );

      res.status(200).json({
        success: true,
        message: 'Image ajoutée au tableau de réalisations',
        data: updatedOuvrier,
      });
    } catch (error) {
      console.error('🚀 ~ updateOuvrierImgRealisation ~ error:', error.message);
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
};
