const express = require('express');
const {
  getQueue,
  validetedQueueByCustomer,
} = require('../../controllers/queue');
const router = express.Router();

router.get('/', getQueue);
router.post(
  '/valideted-queue-by-customer/:queueId/:ouvrierId',
  validetedQueueByCustomer
);

module.exports = router;
