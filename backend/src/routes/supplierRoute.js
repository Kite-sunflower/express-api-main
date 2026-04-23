const express = require('express');
const router = express.Router();

const { getAll, getOne, create, update, deleteSupplier, deleteMany, updateStatus } = require('../controllers/supplierController');
const { protect, requireSalesperson, requireAdmin } = require('../middlewares/auth');

router.get('/', protect, requireSalesperson, getAll);
router.get('/:id', protect, requireSalesperson, getOne);
router.post('/', protect, requireSalesperson, create);
router.put('/:id', protect, requireSalesperson, update);
router.delete('/:id', protect, requireAdmin, deleteSupplier);
router.delete('/batch', protect, requireAdmin, deleteMany);

router.put('/:id/status', protect, requireAdmin, updateStatus);

module.exports = router;
