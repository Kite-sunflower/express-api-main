const express = require('express');
const router = express.Router();

const { getAll, getOne, create, update, deleteUser, deleteMany, updateStatus, updateRole } = require('../controllers/userController');
const { protect, requireAdmin, onlySelf } = require('../middlewares/auth');

router.get('/', protect, requireAdmin, getAll);
router.get('/:id', protect, onlySelf, getOne);
router.post('/', protect, requireAdmin, create);
router.put('/:id', protect, onlySelf, update);
router.delete('/:id', protect, requireAdmin, deleteUser);
router.delete('/batch', protect, requireAdmin, deleteMany);

router.put('/:id/status', protect, requireAdmin, updateStatus);

router.put('/:id/role', protect, requireAdmin, updateRole);

module.exports = router;
