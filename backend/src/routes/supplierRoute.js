const express = require('express');
const router = express.Router();

const { getAll, getOne, create, update, deleteSupplier, deleteMany, updateStatus } = require('../controllers/supplierController');
const { protect, requireSalesperson, requireAdmin } = require('../middlewares/auth');

router.delete('/batch/delete', protect, requireAdmin, deleteMany);

router.get('/', protect, requireSalesperson, getAll);
router.get('/:id', protect, requireSalesperson, getOne);
router.post('/create', protect, requireSalesperson, create);
router.put('/:id/update', protect, requireSalesperson, update);
router.delete('/:id/delete', protect, requireAdmin, deleteSupplier);

router.put('/:id/status', protect, requireAdmin, updateStatus);

module.exports = router;
