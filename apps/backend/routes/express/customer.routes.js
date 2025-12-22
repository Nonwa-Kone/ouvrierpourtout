const {
  createCustomer,
  // getCustomers,
  findAllCustomers,
  findCustomerByEmail,
  findCustomerByPhoneNumber,
  deleteCustomer,
} = require('../../controllers/members/Customer');

const router = require('express').Router();

router.post('/create', createCustomer);
router.get('/', findAllCustomers);
// router.get('/:id', getCustomers);
router.get('/findByEmail', findCustomerByEmail);
router.get('/findByPhoneNumber', findCustomerByPhoneNumber);
router.delete('/:id', deleteCustomer);

module.exports = router;
