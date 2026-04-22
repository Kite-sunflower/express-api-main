const express = require('express');
const router = express.Router();

const { getAllUsers, getUserById, createUser, updateUserById, deleteUserById, deleteManyUser, statusSetup, roleSetup } = require('../controllers/userController');
const { protect, requireAdmin, onlySelf } = require('../middlewares/auth');

router.get('/', protect.requireAdmin, getAllUsers);
router.get('/:id', protect, onlySelf, getUserById);
router.post('/', protect, requireAdmin, createUser);
router.put('/:id', protect, onlySelf, updateUserById);
router.delete('/:id', protect, requireAdmin, deleteUserById);
router.delete('/deleteManyUser', protect, requireAdmin, deleteManyUser);

router.post('/:id/status', protect, requireAdmin, statusSetup);

router.post('/:id/role', protect, requireAdmin, roleSetup);

module.exports = router;
