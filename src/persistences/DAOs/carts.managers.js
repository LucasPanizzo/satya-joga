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
    async emptyCart(idCart) {
        try {
            const cart = await this.getCartByID(idCart)
            cart.products = []
            await cart.save()
            return cart
        } catch (error) {
            console.log('No se encontró al carrito especificado',error)
        }
    }
    async updateProductsInCart(products,idCart) {
        try {
            if (products.length != 0){
                const cart = await this.getCartByID(idCart)
                products.forEach(element => {
                    cart.products.push(element)
                })
                await cart.save()
                return cart
            } else {
                console.log('No se encontraron productos en el carrito');
            }
        } catch (error) {
            console.log('No se encontró al carrito especificado',error)
        }
    }
    async #codeGenerator() {
        try {
            const ticketList = await ticketsModels.find({})
            let code = 1
            if (ticketList.length !== 0) {
                code = parseInt(ticketList[ticketList.length - 1].code) + 1
            }
            return code
        } catch (error) {
            console.log('Error en la generación del código',error)
        }
    }
    async #ticketGenerator(prices,email) {
        try {
            const totalPrice = prices.reduce((acc,el) => acc + el, 0)
            const code = await this.#codeGenerator()
            const ticket = {
                code: code,
                purcharse_datetime: new Date(),
                amount: totalPrice,
                purcharser: email
            }
            const newTicket = await ticketsModels.create(ticket)
            return newTicket
        } catch (error) {
            console.log('Error en la generación del código', error);
        }
    }
    async purchaseProductsInCart(idCart, email) {
        try {
            console.log('llega',email,idCart);
            const cart = await this.getCartByID(idCart)
            const productsInCart = cart.products
            let prices = []
            let productsNoStock = []
            let productsStocked = []
            for(let i = 0; i < productsInCart.length; i++) {
                const product = await getProductByIDService(
                    productsInCart[i].productId.toHexString()
                )
                console.log('entra ciclo for', product);
                if(product.stock >= productsInCart[i].quantity) {
                    let subTotal = product.price * productsInCart[i].quantity
                    prices.push(subTotal)
                    const newStock = product.stock - productsInCart[i].quantity
                    productsStocked.push(productsInCart[i])
                    await this.deleteProduct(idCart, productsInCart[i].productId.toHexString())
                    await updateProductService(productsInCart[i].productId.toHexString(), {
                        stock: newStock,
                    })
                    console.log('entra if ',productsStocked);
                } else {
                    console.log('entra else');
                    productsNoStock.push(productsInCart[i].productId.toHexString())
                    }
            }
            if(productsStocked != 0){
                console.log('llega instancia ticket generator',productsStocked);
                const ticket = await this.#ticketGenerator(prices,email)
                return{productsNoStock,productsStocked,ticket}
            }
        } catch (error) {
            console.log('No se encontró al carrito especificado',error)
        }
    }
}