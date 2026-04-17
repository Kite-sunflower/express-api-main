const express = require('express');
const router = express.Router();
const { getAllProducts, getProductById, createProduct, updateProductById, turnOnPurchase, turnOffPurchase, deleteProductById, deleteManyProduct } = require('../controllers/productControlller');

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', createProduct);
router.put('/:id', updateProductById);
router.delete('/:id', deleteProductById);
router.delete('/deleteManyProduct', deleteManyProduct);

router.post('/:id/on', turnOnPurchase);
router.post('/:id/off', turnOffPurchase);

module.exports = router;
