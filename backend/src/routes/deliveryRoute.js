const express = require('express');
const router = express.Router();

const { getAll, getOne, create, update, deleteDelivery, deleteMany, updateStatus } = require('../controllers/deliveryController');
const { protect, requireAdmin, requireSalesperson } = require('../middlewares/auth');

router.delete('/batch/delete', protect, requireAdmin, deleteMany);

router.get('/', protect, requireSalesperson, getAll);
router.get('/:id', protect, requireSalesperson, getOne);
router.post('/create', protect, requireSalesperson, create);
router.put('/:id/update', protect, requireSalesperson, update);
router.delete('/:id/delete', protect, requireAdmin, deleteDelivery);

router.put('/:id/status', protect, requireSalesperson, updateStatus);

module.exports = router;
