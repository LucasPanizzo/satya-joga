import { Router } from "express";
import { getProductsController,getProductByIDService,addProductController,updateProductController,deleteProductController } from "../controllers/products.controllers";

const router = Router()

router.get('/',getProductsController)

router.get('/:idProduct',getProductByIDService)

router.post('/',addProductController)

router.put('/:idProduct',updateProductController)

router.delete('/:idProduct',deleteProductController)

export default router