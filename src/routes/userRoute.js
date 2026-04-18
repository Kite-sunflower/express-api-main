const express = require('express');
const router = express.Router();

const { getAllUsers, getUserById, createUser, updateUserById, deleteUserById, deleteManyUser, activeUser, inactiveUser } = require('../controllers/userController');
const { protect, restrictToAdmin, onlySelf } = require('../middlewares/auth');

router.get('/', protect.restrictToAdmin, getAllUsers);
router.get('/:id', protect, onlySelf, getUserById);
router.post('/', protect, restrictToAdmin, createUser);
router.put('/:id', protect, onlySelf, updateUserById);
router.delete('/:id', protect, restrictToAdmin, deleteUserById);
router.delete('/deleteManyUser', protect, restrictToAdmin, deleteManyUser);

router.post('/:id/activated', protect, restrictToAdmin, activeUser);
router.post('/:id/deactivated', protect, restrictToAdmin, inactiveUser);

module.exports = router;
