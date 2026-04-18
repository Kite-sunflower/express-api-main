const express = require('express');
const router = express.Router();

const { getAllDeliveries, getDeliveryById, createDelivery, updateDeliveryById, startShipping, completeDelivery, cancelDelivery, deleteDeliveryById, deleteManyDelivery } = require('../controllers/deliveryController');
const { protect, onlySelf, restrictToAdmin } = require('../middlewares/auth');

router.get('/', protect, restrictToAdmin, getAllDeliveries);
router.get('/:id', protect, restrictToAdmin, getDeliveryById);
router.post('/', protect, restrictToAdmin, createDelivery);
router.put('/:id', protect, restrictToAdmin, updateDeliveryById);
router.delete('/:id', protect, restrictToAdmin, deleteDeliveryById);
router.delete('/deleteManyDelivery', protect, restrictToAdmin, deleteManyDelivery);

router.post('/:id/start', protect, restrictToAdmin, startShipping);
router.post('/:id/complete', protect, restrictToAdmin, completeDelivery);
router.post('/:id/cancel', protect, restrictToAdmin, cancelDelivery);

module.exports = router;
