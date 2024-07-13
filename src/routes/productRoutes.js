import { Router } from 'express';
import ProductController from '../controllers/productController.js';

const router = Router();

router.get('/', ProductController.getProducts);
router.post('/', ProductController.createProduct);

export default router;