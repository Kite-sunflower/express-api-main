const express = require(express);
const router = express.Router();
const { getAllSuppliers, getSupplierById, createSupplier, updateSupplierById, deleteSupplierById, deleteManySupplier } = require('../controllers/supplierController');

router.get('/', getAllSuppliers);
router.get('/:id', getSupplierById);
router.post('/', createSupplier);
router.pup('/:id', updateSupplierById);
router.delete('/:id', deleteSupplierById);
router.delete('/deleteManySupplier', deleteManySupplier);

module.exports = router;
