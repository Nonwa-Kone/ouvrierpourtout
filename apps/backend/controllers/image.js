const { default: mongoose } = require('mongoose');
const OuvrierModel = require('../models/members/Ouvriers');
const DocumentModel = require('../models/document/index');

module.exports = {
  getProfFileImg: async (req, res) => {
    try {
      console.log('Params img ', req.params);
      const ownerId = req.params.ownerId;
      if (!req.params.ownerId)
        return res
          .status(200)
          .json({ success: false, message: 'Le ownerid est manquant' });
      if (!mongoose.Types.ObjectId(ownerId))
        return res
          .status(200)
          .json({ success: false, message: "Le ownerId n'est pas valide!" });

      const imgProfFileFound = await OuvrierModel.find({});
      return res.status(200).json({
        success: true,
        message: 'Image found',
        data: imgProfFileFound,
      });
    } catch (error) {}
  },
};
