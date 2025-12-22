const express = require('express');
const router = express.Router();

const {
  createContract,
  updateContract,
  deleteContract,
  getContract,
} = require('../../controllers/members/contract');
const { authAdmin } = require('../../middleware/authAdmin');

// router.get('/', authAdmin, getContracts);
router.get('/:id', authAdmin, getContract);
router.post('/', authAdmin, createContract);
router.put('/:id', authAdmin, updateContract);
router.delete('/:id', authAdmin, deleteContract);

module.exports = router;
