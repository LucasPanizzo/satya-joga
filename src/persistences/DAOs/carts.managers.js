import { cartsModels } from "../MongoDB/models/carts.models.js";
import { ticketsModels } from "../MongoDB/models/tickets.models.js";
import { updateProductService,getProductByIDService } from "../../services/products.services.js";

export default class cartManager {
    async getCarts(){
        try {
            const cartsList = await cartsModels.find({}).lean()
            return cartsList
        } catch (error) {
            console.log('No se encontraron carritos',error);
        }
    }
    async getCartByID(id){
        try {
            const cart = await cartsModels.findById(id)
            return cart
        } catch (error) {
            console.log('No se encontró al carrito especificado',error);
        }
    }
    async findCartAndPoblate(id){
        try {
            const cart = await cartsModels.find({ _id: id }).lean()
            return cart
        } catch (error) {
            console.log('No se encontró al carrito especificado',error);
        }
    }
    async addCart(){
        try {
            const newCart = await cartsModels.create({})
            return newCart
        } catch (error) {
            console.log('No fué posible crear el carrito',error);
        }
    }
    async findProductInCart(idCart,idProduct){
        try {
            const cart = await this.getCartByID(idCart)
            const productsArray = cart.products
            const productExists = productsArray.find((el) => el.productId.toHexString() === idProduct)
            return productExists
        } catch (error) {
            console.log('No se encontró al carrito especificado',error);
        }
    }
    async modifyProductQuantity(idCart,idProduct,quantity){
        try {
            if(quantity > 0 ){
                const filter = { _id: idCart, "products.productId":idProduct}
                const update = { $set: { "products.$.quantity":quantity } }
                const updatedCartProduct = await cartsModels.findOneAndUpdate(filter,update, { new: true })
                return updatedCartProduct
            }
        } catch (error) {
            console.log('No se encontró al carrito especificado',error)
        }
    }
    async addToCart(idCart,idProduct){
        try {
            const cart = await this.getCartByID(idCart)
            const productsArray = cart.products
            const product = await this.findProductInCart(idCart,idProduct)
            const isARealProduct = await getProductByIDService(idProduct)
            if(isARealProduct){
                if(product){
                    const newQuantity = product.quantity + 1
                    const actCart = await this.modifyProductQuantity(idCart,idProduct,newQuantity)
                    return actCart
                } else {
                    const product = {
                        quantity: 1,
                        productId: idProduct
                    }
                    productsArray.push(product)
                    await cart.save()
                    return cart
                }
            }else{
                console.log('No se encontró el producto');
            }
        } catch (error) {
            console.log('No se encontró al carrito especificado',error)
        }
    }
    async deleteProduct(idCart,idProduct){
        try {
            const cart = await this.getCartByID(idCart)
            const productToDeleteIndex = cart.products.findIndex(e => e.productId == idProduct)
            const isARealProduct = await getProductByIDService(idProduct)
            if(isARealProduct) {
                if (productToDeleteIndex !== -1){
                    cart.products.splice(productToDeleteIndex,1)
                    const updatedCart = await cart.save()
                    return updatedCart
                } else {
                    return undefined
                }
            } else {
                console.log('No se encontró el producto');
            }
        } catch (error) {
            console.log('No se encontró al carrito especificado',error)
        }
    }
}