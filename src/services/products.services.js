import DAO from '../persistences/DAOs/products.managers.js'
import { productsModels } from '../persistences/MongoDB/models/products.models.js'

let persistence = new DAO('products', productsModels)

export async function getProductsService(){
    return await persistence.getProducts()
}

export async function addProductService(obj){
    console.log('service');
    return await persistence.addProduct(obj)
}

export async function getProductByIDService(id){
    return await persistence.getProductByID(id)
}

export async function deleteProductService(id){
    return await persistence.deleteProduct(id)
}

export async function updateProductService(id,actualizacion){
    return await persistence.updateProduct(id,actualizacion)
}