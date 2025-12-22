const mongoose = require('mongoose');
const documents = require('../constant/document.js');
const ModelDocument = require('../models/document/index.js');

module.exports = {
  // GET /document
  getDocuments: async (req, res) => {
    try {
      const documents = await ModelDocument.find();
      res.status(200).json({ success: true, data: documents });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  // GET /document/:ownerId
  getDocumentByOwnerId: async (req, res, next) => {
    try {
      const { ownerId } = req.params;
      console.log('🚀 ~ getDocumentByOwnerId: ~ ownerId:', ownerId);
      if (!ownerId) {
        res.status(400).json({ sucess: false, message: 'Missing ownerId' });
      }
      if (!mongoose.Types.ObjectId.isValid(ownerId)) {
        res.status(400).json({ sucess: false, message: 'Invalid ownerId' });
      }
      const document = await ModelDocument.find({ ownerId: ownerId });
      res
        .status(200)
        .json({ success: true, message: 'Document found', data: document });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getDocument: async (req, res) => {
    try {
      if (!req.params.id) {
        res.status(400).json({ sucess: false, message: 'Missing id' });
      }
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400).json({ sucess: false, message: 'Invalid id' });
      }
      const document = await ModelDocument.findById(req.params.id);
      res
        .status(200)
        .json({ success: true, message: 'Document found', data: document });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  // POST /document
  createDocument: async (req, res) => {
    try {
      console.log('🚀 ~ createDocument: ~ req.body:', req.params);
      const { ownerId } = req.params;
      if (!ownerId) {
        res.status(400).json({ message: 'Missing ownerId' });
      }
      if (!mongoose.Types.ObjectId.isValid(ownerId)) {
        res.status(400).json({ message: "Ceci n'est pas un id valide" });
      }
      const documentFound = await ModelDocument.findOne({ ownerId: ownerId });
      if (documentFound) {
        res.status(400).json({ message: 'Document déjà existant' });
      }
      console.log('🚀 ~ documentUploaded ~ documents:', documents);
      const documentUploaded = documents.map((document) => {
        console.log('🚀 ~ documentUploaded ~ documentUploaded:', document);
        return {
          name: document.name,
          fileUrl: document.fileUrl,
          ownerId: ownerId,
        };
      });
      const document = await ModelDocument.insertMany(documentUploaded);
      res.status(201).json({ success: true, data: document });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  // PUT /document/:id
  updateDocument: async (req, res) => {
    try {
      console.log('🚀 ~ updateDocument: ~ req.body:', req.body);
      if (!req.params.id) {
        res.status(400).json({ sucess: false, message: 'Missing id' });
      }
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400).json({ sucess: false, message: 'Invalid id' });
      }

      const document = await ModelDocument.findByIdAndUpdate(
        req.params.id,
        {
          ...req.body,
          fileUrl: {
            name: req.file.filename,
            url: `${req.protocol}://${req.get('host')}/images/${
              req.file.filename
            }`,
          },
        },
        {
          new: true,
        }
      );
      res.status(200).json({
        success: true,
        data: document,
        message: 'Le document a été mis à jour',
      });
    } catch (error) {
      res.status(500).json({ message: error.message, success: false });
    }
  },
  changeStatusDocument: async (req, res) => {
    try {
      if (!req.params.id) {
        res.status(400).json({ sucess: false, message: 'Missing id' });
      }
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400).json({ sucess: false, message: 'Invalid id' });
      }
      const document = await ModelDocument.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            status: req.body.status,
          },
        },
        {
          new: true,
        }
      );
      res.status(200).json({
        success: true,
        data: document,
        message: 'Le document a été mis à jour',
      });
    } catch (error) {
      res.status(500).json({ message: error.message, success: false });
    }
  },
  // DELETE /document/:id
  deleteDocument: async (req, res) => {
    try {
      const document = await ModelDocument.findByIdAndDelete(req.params.id);
      res.status(200).json(document);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
