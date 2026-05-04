const express = require('express');
const router = express.Router();

const { getAll, getOne, create, update, deleteOrder, deleteMany, updateStatus } = require('../controllers/orderController');
const { protect, onlySelf, requireSalesperson, requireAdmin } = require('../middlewares/auth');

router.delete('/batch/delete', protect, requireAdmin, deleteMany);

router.get('/', protect, requireSalesperson, getAll);
router.get('/:id', protect, onlySelf, getOne);
router.post('/create', protect, requireSalesperson, create);
router.put('/:id/update', protect, requireSalesperson, update);
router.delete('/:id/delete', protect, requireAdmin, deleteOrder);

router.put('/:id/status', protect, requireSalesperson, updateStatus);

module.exports = router;
