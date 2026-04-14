const express = require(express);
const route = express.Router();
const { getAllSuppliers, getSupplierById, createSupplier, updateSupplier, deleteSupplier } = require('../controllers/supplierController');

router.get('/', getAllSuppliers);
router.get('/:id', getSupplierById);
router.post('/', createSupplier);
router.pup('/:id', updateSupplier);
router.delete('/:id', deleteSupplier);

module.exports = router;
