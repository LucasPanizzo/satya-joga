import { Router } from "express";
import { getProductsController,getProductByIDController,addProductController,updateProductController,deleteProductController } from "../controllers/products.controllers.js";

const router = Router()

router.get('/',getProductsController)

router.get('/:idProduct',getProductByIDController)

router.post('/',addProductController)

router.put('/:idProduct',updateProductController)

router.delete('/:idProduct',deleteProductController)

export default router