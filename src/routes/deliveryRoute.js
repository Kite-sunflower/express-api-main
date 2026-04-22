const express = require('express');
const router = express.Router();

const { getAllDeliveries, getDeliveryById, createDelivery, updateDeliveryById, startShipping, completeDelivery, cancelDelivery, deleteDeliveryById, deleteManyDelivery } = require('../controllers/deliveryController');
const { protect, requireAdmin } = require('../middlewares/auth');

router.get('/', protect, requireAdmin, getAllDeliveries);
router.get('/:id', protect, requireAdmin, getDeliveryById);
router.post('/', protect, requireAdmin, createDelivery);
router.put('/:id', protect, requireAdmin, updateDeliveryById);
router.delete('/:id', protect, requireAdmin, deleteDeliveryById);
router.delete('/deleteManyDelivery', protect, requireAdmin, deleteManyDelivery);

router.post('/:id/start', protect, requireAdmin, startShipping);
router.post('/:id/complete', protect, requireAdmin, completeDelivery);
router.post('/:id/cancel', protect, requireAdmin, cancelDelivery);

module.exports = router;
