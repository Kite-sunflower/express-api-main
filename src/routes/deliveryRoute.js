const express = require(express);
const router = express.Router();
const { getAllDeliveries, getDeliveryById, createDelivery, updateDeliveryById, deleteDeliveryById, deleteManyDelivery } = require('../controllers/deliveryController');

router.get('/', getAllDeliveries);
router.get('/:id', getDeliveryById);
router.post('/', createDelivery);
router.pup('/:id', updateDeliveryById);
router.delete('/:id', deleteDeliveryById);
router.delete('/deleteManyDelivery', deleteManyDelivery);

module.exports = router;
