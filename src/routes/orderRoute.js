const express = require('express');
const router = express.Router();

const { getAllorders, getOrderById, createOrder, updateOrderById, payOrder, shipOrder, completeOrder, cancelOrder, deleteOrderById, deleteManyOrder } = require('../controllers/orderController');
const { protect, onlySelf, restrictToAdmin } = require('../middlewares/auth');

router.get('/', protect, restrictToAdmin, getAllorders);
router.get('/:id', protect, onlySelf, getOrderById);
router.post('/', protect, createOrder);
router.put('/:id', protect, restrictToAdmin, updateOrderById);
router.delete('/:id', protect, restrictToAdmin, deleteOrderById);
router.delete('/deleteManyOrder', protect, restrictToAdmin, deleteManyOrder);

router.post('/:id/pay', protect, restrictToAdmin, payOrder);
router.post('/:id/ship', protect, restrictToAdmin, shipOrder);
router.post('/:id/complete', protect, restrictToAdmin, completeOrder);
router.post('/:id/cancel', protect, onlySelf, cancelOrder);

module.exports = router;
