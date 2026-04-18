const express = require(express);
const router = express.Router();

const { getAllSuppliers, getSupplierById, createSupplier, updateSupplierById, deleteSupplierById, deleteManySupplier, activeSupplier, inactiveSupplier } = require('../controllers/supplierController');
const { protect, onlySelf, restrictToAdmin } = require('../middlewares/auth');

router.get('/', protect, restrictToAdmin, getAllSuppliers);
router.get('/:id', protect, restrictToAdmin, getSupplierById);
router.post('/', protect, restrictToAdmin, createSupplier);
router.put('/:id', protect, restrictToAdmin, updateSupplierById);
router.delete('/:id', protect, restrictToAdmin, deleteSupplierById);
router.delete('/deleteManySupplier', protect, restrictToAdmin, deleteManySupplier);

router.post('/:id/activated', protect, restrictToAdmin, activeSupplier);
router.post('/:id/deactivated', protect, restrictToAdmin, inactiveSupplier);

module.exports = router;
