import { addCartController,getCartsController,getCartByIDController,addToCartController,deleteProductController,emptyCartController,updateProductsInCartController,modifyProductQuantityController } from "../controllers/carts.controllers.js";
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

export default router