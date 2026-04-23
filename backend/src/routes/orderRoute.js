const express = require('express');
const router = express.Router();

const { getAll, getOne, create, update, deleteOrder, deleteMany, updateStatus } = require('../controllers/orderController');
const { protect, onlySelf, requireSalesperson, requireAdmin } = require('../middlewares/auth');

router.get('/', protect, requireSalesperson, getAll);
router.get('/:id', protect, onlySelf, getOne);
router.post('/', protect, requireSalesperson, create);
router.put('/:id', protect, requireSalesperson, update);
router.delete('/:id', protect, requireAdmin, deleteOrder);
router.delete('/batch', protect, requireAdmin, deleteMany);

router.put('/:id/status', protect, requireSalesperson, updateStatus);

module.exports = router;
