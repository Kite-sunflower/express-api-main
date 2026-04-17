const express = require(express);
const router = express.Router();
const { getAllSuppliers, getSupplierById, createSupplier, updateSupplierById, deleteSupplierById, deleteManySupplier, activeSupplier, inactiveSupplier } = require('../controllers/supplierController');

router.get('/', getAllSuppliers);
router.get('/:id', getSupplierById);
router.post('/', createSupplier);
router.pup('/:id', updateSupplierById);
router.delete('/:id', deleteSupplierById);
router.delete('/deleteManySupplier', deleteManySupplier);

router.post('/:id/activated', activeSupplier);
router.post('/:id/deactivated', inactiveSupplier);

module.exports = router;
