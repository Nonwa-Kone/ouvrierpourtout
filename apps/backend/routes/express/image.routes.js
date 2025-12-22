const { getProfFileImg } = require('../../controllers/image');

const router = require('express').Router();

router.get('/profil/:ownerId', getProfFileImg);

module.exports = router;
