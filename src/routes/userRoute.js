const express = require('express');
const router = express.Router();

const { getAllUsers, getUserById, createUser, updateUserById, deleteUserById, deleteManyUser } = require('../controllers/userController');

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUserById);
router.delete('/:id', deleteUserById);
router.delete('/deleteManyUser', deleteManyUser);

module.exports = router;
