const express = require('express');

const controller = require('../../controllers/members/admin');
const { authAdmin } = require('../../middleware/authAdmin');

const router = express.Router();

router.get('/', authAdmin, controller.getAdmins);
router.get('/:id', authAdmin, controller.getAdmin);
router.post('/', controller.createAdmin);
router.put('/:id', authAdmin, controller.updateAdmin);
router.delete('/:id', authAdmin, controller.deleteAdmin);
router.post('/login', controller.loginAdmin);
router.post('/findByToken', controller.findByTokens);
router.post('/logout/:userId', controller.logOutAdmin);
// router.post('/resetPassword', controller.resetPasswordAdmin);
// router.post('/changePassword', controller.changePasswordAdmin);
// router.post('/changeRole', controller.changeRoleAdmin);
// router.post('/changePassword', controller.changePasswordAdmin);
// router.post('/changeEmail', controller.changeEmailAdmin);

module.exports = router;
