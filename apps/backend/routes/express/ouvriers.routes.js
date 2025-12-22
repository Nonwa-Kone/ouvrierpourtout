const express = require('express');

const controller = require('../../controllers/members/index');
const { authAdmin } = require('../../middleware/authAdmin');
const { authOuvrier } = require('../../middleware/authOuvrier');
const multerConfig = require('../../middleware/multer-config');

const router = express.Router();

// AUTH
router.post('/login-partner', controller.ouvriers.login);
router.post('/findByToken', controller.ouvriers.findByToken);

// CRUD
router.get('/', controller.ouvriers.getOuvriers);
router.get('/:id', controller.ouvriers.getOuvrier);
router.post('/', authAdmin, controller.ouvriers.createOuvrier);
router.put('/:id', controller.ouvriers.updateOuvrier);
router.put(
  '/:id/profFile',
  // authAdmin,
  multerConfig,
  controller.ouvriers.updateOuvrierProfFile
);
router.put(
  '/:id/img-realisation',
  controller.ouvriers.updateOuvrierImgRealisation
);
router.delete('/:id', authAdmin, controller.ouvriers.deleteOuvrier);

module.exports = router;
