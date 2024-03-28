import exp from "constants";
import { addCartService,getCartsService,getCartByIDService,addToCartService,deleteProductService,emptyCartService,updateProductsInCartService,modifyProductQuantityService,purchaseProductsInCartService } from "../services/carts.services.js";

export const addCartController = async (req,res) => {
    try {
        await addCartService()
        res.send('carrito creado con éxito')
    } catch (error) {
        console.log('No se pudo crear el carrito',error);
    }
}

export const getCartsController = async (req,res) => {
    try {
        const carts = await getCartsService()
        res.json({message: 'Lista de carritos:', carts})
    } catch (error) {
        console.log('No se encontraron carritos en la lista',error);       
    }
}

export const getCartByIDController = async (req,res) => {
    try {
        const cartID = req.params.cid
        const searchedCart = await getCartByIDService(cartID)
        const cartProducts = searchedCart[0].products 
        res.json({ message: 'Carrito encontrado', cartProducts })
    } catch (error) {
        console.log('No se encontró el carrito especificado',error);  
    }
}

export const addToCartController = async (req,res) => {
    try {
        const cartID = req.params.cid
        const productID = req.params.pid
        await addToCartService(cartID,productID)
        res.send('Producto agregado con éxito.')
    } catch (error) {
        console.log('No se pudo agregar el producto al carrito.',error);
    }
}

export const deleteProductController = async (req,res) => {
    try {
        const cartID = req.params.cid
        const productID = req.params.pid
        await deleteProductService(cartID,productID)
        res.send('Producto eliminado con éxito.')
    } catch (error) {
        console.log('No se pudo eliminar el producto del carrito.',error);
    }
}

export const emptyCartController = async (req,res) => {
    try {
        const cartID = req.params.cid
        await emptyCartService(cartID)
        res.send('Carrito vaciado con éxito.')
    } catch (error) {
        console.log('No se pudo vaciar el carrito.',error); 
    }
}

export const updateProductsInCartController = async (req,res) => {
    try {
        const cartID = req.params.cid
        const products = req.body
        await updateProductsInCartService(products,cartID)
        res.send('Carrito modificado con éxito.')
    } catch (error) {
        console.log('No se pudo modificar el carrito.',error); 
    }
}

export const modifyProductQuantityController = async (req,res) => {
    try {
        const cartID = req.params.cid
        const productID = req.params.pid
        const quantity = parseInt(req.body)
        await modifyProductQuantityService(cartID, productID, quantity)
        res.send('Cantidad modificada con éxito.')
    } catch (error) {
        console.log('No se pudo modificar el carrito.',error);
    }
}