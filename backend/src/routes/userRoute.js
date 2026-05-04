const express = require('express');
const router = express.Router();

const { getAll, getOne, create, update, deleteUser, deleteMany, updateStatus, updateRole, updatePassword } = require('../controllers/userController');
const { protect, requireAdmin, onlySelf } = require('../middlewares/auth');

router.delete('/batch/delete', protect, requireAdmin, deleteMany);

router.get('/', protect, requireAdmin, getAll);
router.get('/:id', protect, onlySelf, getOne);
router.post('/create', protect, requireAdmin, create);
router.put('/:id/update', protect, onlySelf, update);
router.put('/:id/updatePwd', protect, onlySelf, updatePassword);
router.delete('/:id/delete', protect, requireAdmin, deleteUser);

router.put('/:id/status', protect, requireAdmin, updateStatus);

router.put('/:id/role', protect, requireAdmin, updateRole);

module.exports = router;
