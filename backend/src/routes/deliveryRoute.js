const express = require('express');
const router = express.Router();

const { getAll, getOne, create, update, deleteDelivery, deleteMany, updateStatus } = require('../controllers/deliveryController');
const { protect, requireAdmin, requireSalesperson } = require('../middlewares/auth');

router.get('/', protect, requireSalesperson, getAll);
router.get('/:id', protect, requireSalesperson, getOne);
router.post('/', protect, requireSalesperson, create);
router.put('/:id', protect, requireSalesperson, update);
router.delete('/:id', protect, requireAdmin, deleteDelivery);
router.delete('/batch', protect, requireAdmin, deleteMany);

router.put('/:id/status', protect, requireSalesperson, updateStatus);

module.exports = router;
