import DAO from '../persistences/DAOs/carts.managers.js'
import { cartsModels } from '../persistences/MongoDB/models/carts.models.js'

let persistence = new DAO('carts', cartsModels)

export async function getCartsService(){
    return await persistence.getCarts()
}
export async function getCartByIDService(id){
    return await persistence.getCartByID(id)
}
export async function findCartAndPoblateService(id){
    return await persistence.findCartAndPoblate(id)
}
export async function addCartService(){
    return await persistence.addCart()
}
export async function findProductInCartService(idCart,idProduct){
    return await persistence.findProductInCart(idCart,idProduct)
}
export async function modifyProductQuantityService(idCart,idProduct,quantity){
    return await persistence.modifyProductQuantity(idCart,idProduct,quantity)
}
export async function addToCartService(idCart,idProduct){
    return await persistence.addToCart(idCart,idProduct)
}
export async function deleteProductService(idCart,idProduct){
    return await persistence.deleteProduct(idCart,idProduct)
}
export async function emptyCartService(idCart){
    return await persistence.emptyCart(idCart)
}
export async function updateProductsInCartService(products,idCart){
    return await persistence.updateProductsInCart(products,idCart)
}
export async function purchaseProductsInCartService(idCart,email){
    return await persistence.purchaseProductsInCart(idCart,email)
}