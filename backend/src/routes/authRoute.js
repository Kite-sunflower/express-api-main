const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/auth');
const { register, login, logout, updatePwd, sendResetCode, resetPwd } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/sendResetCode', sendResetCode);
router.post('/resetPwd', resetPwd);
router.put('/updatePwd', protect, updatePwd);
module.exports = router;
