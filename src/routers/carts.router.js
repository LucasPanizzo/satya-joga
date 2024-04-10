import { addCartController,getCartsController,getCartByIDController,addToCartController,deleteProductController,emptyCartController,updateProductsInCartController,modifyProductQuantityController,purchaseProductsInCartController } from "../controllers/carts.controllers.js";
import { Router } from "express";

const router = Router()

router.post('/',addCartController)

router.get('/',getCartsController)

router.get('/:cid',getCartByIDController)

router.post('/:cid/product/:pid',addToCartController)

router.delete('/:cid/product/:pid',deleteProductController)

router.delete('/:cid',emptyCartController)

router.put('/:cid',updateProductsInCartController)

router.put('/:cid/product/:pid',modifyProductQuantityController)

router.post('/purchase/:cid',purchaseProductsInCartController)

export default router