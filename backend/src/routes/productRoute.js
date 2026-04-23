const express = require('express');
const router = express.Router();

const { getAll, getOne, create, update, deleteProduct, deleteMany, updateStatus } = require('../controllers/productControlller');
const { protect, onlySelf, requireAdmin } = require('../middlewares/auth');

router.get('/', protect, requireAdmin, getAll);
router.get('/:id', protect, requireAdmin, getOne);
router.post('/', protect, requireAdmin, create);
router.put('/:id', protect, requireAdmin, update);
router.delete('/:id', protect, requireAdmin, deleteProduct);
router.delete('/deleteManySupplier', protect, requireAdmin, deleteMany);

router.post('/:id/status', protect, requireAdmin, updateStatus);

module.exports = router;
