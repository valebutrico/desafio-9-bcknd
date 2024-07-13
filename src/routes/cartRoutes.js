import express from 'express';
import CartController from '../controllers/cartController.js';

const router = express.Router();

router.post('/', CartController.createCart);
router.delete('/:cid/products/:pid', CartController.deleteProductFromCart);
router.delete('/:cid', CartController.deleteAllProductsFromCart);
router.put('/:cid/products/:pid', CartController.updateProductQuantityInCart);
router.put('/:cid', CartController.updateCart);
router.get('/:cid', CartController.getCartById);
router.post('/:cid/products/:pid', CartController.addProductToCart);

export default router;
