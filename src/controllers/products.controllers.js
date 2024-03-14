import { getProductsService,getProductByIDService,addProductService,delectProductService,updateProductService } from "../services/products.services";

export const getProductsController = async (req, res) => {
    try {
        const productsList = await getProductsService()
        res.send(productsList)
    } catch {
        console.log('No se encontraron productos');
    }
}

export const addProductController = async (req, res) => {
    try {
        const newProduct = await addProductService(req.body)
        res.json({message:'Producto creado con exito',newProduct})
    } catch (error) {
        console.log('No se pudo crear el producto:'+error);
    }
}