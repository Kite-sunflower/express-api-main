const express = require(express);
const router = express.Router();
const { getAllorders, getOrderById, createOrder, updateOrderById, payOrder, shipOrder, completeOrder, cancelOrder, deleteOrderById, deleteManyOrder } = require('../controllers/orderController');

router.get('/', getAllorders);
router.get('/:id', getOrderById);
router.post('/', createOrder);

router.pup('/:id', updateOrderById);
router.post('/:id/pay', payOrder);
router.post('/:id/ship', shipOrder);
router.post('/:id/complete', completeOrder);
router.post('/:id/camcel', cancelOrder);

router.delete('/:id', deleteOrderById);
router.delete('/deleteManyOrder', deleteManyOrder);

module.exports = router;
