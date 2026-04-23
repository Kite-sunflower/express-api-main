const express = require('express');
const router = express.Router();

const { getAllProducts, getProductById, createProduct, updateProductById, deleteProductById, deleteManyProduct, changeStatus } = require('../controllers/productControlller');
const { protect, onlySelf, requireAdmin } = require('../middlewares/auth');

router.get('/', protect, requireAdmin, getAllProducts);
router.get('/:id', protect, requireAdmin, getProductById);
router.post('/', protect, requireAdmin, createProduct);
router.put('/:id', protect, requireAdmin, updateProductById);
router.delete('/:id', protect, requireAdmin, deleteProductById);
router.delete('/deleteManySupplier', protect, requireAdmin, deleteManyProduct);

router.post('/:id/changeStatus', protect, requireAdmin, changeStatus);

module.exports = router;
