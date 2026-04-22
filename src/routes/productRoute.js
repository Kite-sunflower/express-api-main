const express = require('express');
const router = express.Router();

const { getAllSuppliers, getSupplierById, createSupplier, updateSupplierById, deleteSupplierById, deleteManySupplier, activeSupplier, inactiveSupplier } = require('../controllers/supplierController');
const { protect, onlySelf, requireAdmin } = require('../middlewares/auth');

router.get('/', protect, requireAdmin, getAllSuppliers);
router.get('/:id', protect, requireAdmin, getSupplierById);
router.post('/', protect, requireAdmin, createSupplier);
router.put('/:id', protect, requireAdmin, updateSupplierById);
router.delete('/:id', protect, requireAdmin, deleteSupplierById);
router.delete('/deleteManySupplier', protect, requireAdmin, deleteManySupplier);

router.post('/:id/activated', protect, requireAdmin, activeSupplier);
router.post('/:id/deactivated', protect, requireAdmin, inactiveSupplier);

module.exports = router;
