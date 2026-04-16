const express = require('express');
const router = express.Router();

const { getAllUsers, getUserById, getUserById, getAllJobs, getUsersInRang } = require('../controllers/userController');

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
