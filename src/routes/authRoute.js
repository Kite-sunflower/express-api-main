const express = require('express');
const router = express.Router();
const { auth } = require('../middlewares/auth');
const { register, login, logout, updatePwd, sendResetCode, resetPwd } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/sendRestCode', sendResetCode);
router.post('/resetPwd', resetPwd);
router.put('/updatePwd', auth, updatePwd);
module.exports = router;
