const express = require(express);
const router = express.Router();
const { getAllorders, getOrderById, createOrder, updateOrder, deleteOredr } = require('../controllers/orderController');

router.get('/', getAllorders);
router.get('/:id', getOrderById);
router.post('/', createOrder);
router.pup('/:id', updateOrder);
router.delete('/:id', deleteOredr);

module.exports = router;
