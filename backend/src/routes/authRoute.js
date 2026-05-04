const express = require('express');
const router = express.Router();
const { protect, requireAdmin } = require('../middlewares/auth');
const { register, getInfo, login, logout, updatePwd, sendResetCode, resetPwd } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.post('/logout', protect, logout);
router.post('/sendResetCode', sendResetCode);
router.post('/resetPwd', resetPwd);

router.get('/info', protect, getInfo);
router.put('/:id/updatePwd', protect, requireAdmin, updatePwd);
module.exports = router;
