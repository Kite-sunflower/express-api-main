const express = require(express);
const router = express.Router();
const { getAllorders, getOrderById, createOrder, updateOrderById, deleteOrderById, deleteManyOrder } = require('../controllers/orderController');

router.get('/', getAllorders);
router.get('/:id', getOrderById);
router.post('/', createOrder);
router.pup('/:id', updateOrderById);
router.delete('/:id', deleteOrderById);
router.delete('/deleteManyOrder', deleteManyOrder);

module.exports = router;
