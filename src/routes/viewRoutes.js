import { Router } from "express";
import ViewController from "../controllers/viewController.js"; 

const router = Router();

router.get('/products', ViewController.renderProductsPage);
router.get('/carts/:cid', ViewController.renderCartPage);

export default router;
