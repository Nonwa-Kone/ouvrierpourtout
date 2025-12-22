const express = require('express');
const router = express.Router();
const {
  createOrder,
  findAllOrders,
  AssignTicketSpecialist,
  findOrderByAssignedTo,
  AssignTradeBody,
  orderFromProfileOuvrier,
  editStatusOrderByTicketId,
  findByIdOrder,
} = require('../../controllers/members/orders');

router.post('/', createOrder);
router.post('/assign-ticket-specialist', AssignTicketSpecialist);
router.post('/assign-trade-body', AssignTradeBody);
router.post('/order-from-profile-ouvrier/:id', orderFromProfileOuvrier);
router.get('/', findAllOrders);
router.get('/:id', findByIdOrder);
router.get('/find-order-by-assigned-to/:assignedTo', findOrderByAssignedTo);
router.put('/edit-statu-ticket-by/:idTicket', editStatusOrderByTicketId);

module.exports = router;
