const express = require('express');

const controller = require('../../controllers/members/insight');
const router = express.Router();

router.get('/admin', controller.getInsight);

module.exports = router;
