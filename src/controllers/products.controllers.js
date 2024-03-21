import { getProductsService,getProductByIDService,addProductService,deleteProductService,updateProductService } from "../services/products.services";

export const getProductsController = async (req, res) => {
    try {
        const productsList = await getProductsService()
        res.send(productsList)
    } catch {
        console.log('No se encontraron productos');
    }
}

export const getProductByIDService = async (req,res) => {
    try {
        const { idProduct } = req.params
        const searchedProduct = await getProductByIDService(idProduct)
        res.json({ message: 'Producto encontrado', searchedProduct })
    } catch (error) {
        console.log('No se pudo encontrar el producto:'+error);
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

export const deleteProductController = async (req,res) => {
    try {
        const { idProduct } = req.params
        const deletedProduct = await deleteProductService(idProduct)
        res.json({message:'Producto eliminado con exito.',deletedProduct})
    } catch (error) {
        console.log('No se pudo encontrar el producto:'+error);
    }
}

export const updateProductController = async (req,res) => {
    try {
        const { idProduct } = req.params
        const actualizacion = req.body
        const clavesPermitidas = ['title', 'description', 'price', 'code', 'stock', 'status', 'category', 'thumbnails'];
        const actualizacionValida = Object.keys(actualizacion).some((clave) => clavesPermitidas.includes(clave));
        if (actualizacionValida != false) {
            const updatedProduct = await updateProductService(idProduct, actualizacion)
            res.json({message:'Producto modificado con exito.',updatedProduct})
        } else {
            console.log('No se pudo actualizar el producto.');
        }
    } catch (error) {
        console.log('No se pudo actualizar el producto:'+error);
    }
}