const express = require('express');
const router = express.Router();

const { getAll, getOne, create, update, deleteProduct, deleteMany, updateStatus } = require('../controllers/productControlller');
const { protect, onlySelf, requireAdmin } = require('../middlewares/auth');

router.delete('/batch/delete', protect, requireAdmin, deleteMany);

router.get('/', protect, requireAdmin, getAll);
router.get('/:id', protect, requireAdmin, getOne);
router.post('/create', protect, requireAdmin, create);
router.put('/:id/update', protect, requireAdmin, update);
router.delete('/:id/delete', protect, requireAdmin, deleteProduct);

router.post('/:id/status', protect, requireAdmin, updateStatus);

module.exports = router;
