const express = require('express');
const router = express.Router();

const { getAllorders, getOrderById, createOrder, updateOrderById, payOrder, shipOrder, completeOrder, cancelOrder, deleteOrderById, deleteManyOrder } = require('../controllers/orderController');
const { protect, onlySelf, requireAdmin } = require('../middlewares/auth');

router.get('/', protect, requireAdmin, getAllorders);
router.get('/:id', protect, onlySelf, getOrderById);
router.post('/', protect, createOrder);
router.put('/:id', protect, requireAdmin, updateOrderById);
router.delete('/:id', protect, requireAdmin, deleteOrderById);
router.delete('/deleteManyOrder', protect, requireAdmin, deleteManyOrder);

router.post('/:id/pay', protect, requireAdmin, payOrder);
router.post('/:id/ship', protect, requireAdmin, shipOrder);
router.post('/:id/complete', protect, requireAdmin, completeOrder);
router.post('/:id/cancel', protect, onlySelf, cancelOrder);

module.exports = router;
