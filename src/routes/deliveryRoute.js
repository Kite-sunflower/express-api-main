const express = require(express);
const router = express.Router();
const { getAllDeliveries, getDeliveryById, createDelivery, updateDeliveryById, startShipping, completeDelivery, cancelDelivery, deleteDeliveryById, deleteManyDelivery } = require('../controllers/deliveryController');

router.get('/', getAllDeliveries);
router.get('/:id', getDeliveryById);
router.post('/', createDelivery);

router.pup('/:id', updateDeliveryById);
router.post('/:id/start', startShipping);
router.post('/:id/complete', completeDelivery);
router.post('/:id/cancel', cancelDelivery);

router.delete('/:id', deleteDeliveryById);
router.delete('/deleteManyDelivery', deleteManyDelivery);

module.exports = router;
