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
        const cartProducts = searchedCart.products
        res.json({ message: 'Carrito encontrado', cartProducts })
    } catch (error) {
        console.log('No se encontró el carrito especificado',error);  
    }
}
export const addToCartController = async (req, res) => {
    try {
        let cart = req.session.cart;
        if (!cart) {
            console.log('Creando un nuevo carrito...');
            const newCart = await addCartService(); // Asegúrate de que esta función devuelva un carrito válido
            console.log('Nuevo carrito:', newCart);
            req.session.cart = newCart;
            cart = newCart; // Actualiza la referencia al carrito
        }
        
        const cartID = cart._id;
        const productID = req.params.pid;
        await addToCartService(cartID, productID); // Asegúrate de que esta función modifique el carrito correctamente

        console.log('Carrito después de agregar el producto:', cart);
        res.send('Producto agregado con éxito.');
    } catch (error) {
        console.log('No se pudo agregar el producto al carrito.', error);
        res.status(500).send('Error al agregar el producto al carrito.');
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