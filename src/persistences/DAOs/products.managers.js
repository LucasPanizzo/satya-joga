import { productsModels} from "../MongoDB/models/products.models.js";

export default class ProductManager {
    async getProducts() {
        try {
            const users = productsModels.find()
            return users
        } catch {
            console.log('No se encontraron productos');
        }
    }
    async addProduct(obj) {
        try {
            const productsList = await this.getProducts()
            if (productsList.find((el) => el.code === obj.code)) {
                console.log('El codigo de producto ya está siendo utilizado');
            } else {
                if (obj.title || obj.description || obj.code || obj.price || obj.stock || obj.status || obj.category || obj.thumbnails) {
                    const newProduct = new productsModels(obj)
                    const productSaved = newProduct.save()
                    return productSaved
                } else {
                    console.log('No se puede crear el producto porque faltaron campos de relleno');
                }
            }
        } catch(error) {
            console.log('No se pudo crear el producto:'+error);
        }
    }
    async getProductByID(id) {
        try {
            const product = await productsModels.findById(id)
            return product
        } catch {
            console.log('No se encontró el producto con el ID seleccionado');
        }
    }
    async deleteProduct(id) {
        try {
            const deletedProd = await productsModels.deleteOne({ _id: id });
            return deletedProd;
        } catch{
            console.log('No se encontró el producto con el ID seleccionado');
        }
    }
    async updateProduct(id, actualizacion) {
        try {
            const clavesPermitidas = ['title', 'description', 'price', 'code', 'stock', 'status', 'category', 'thumbnails'];
            const actualizacionValida = Object.keys(actualizacion).some((clave) => clavesPermitidas.includes(clave));
            if (actualizacionValida != false) {
                const updateProduct = await productsModels.findOneAndUpdate({ _id: id }, { ...actualizacion })
                return updateProduct
            } else {
                console.log('No se pudo actualizar el producto:');
            }
        } catch {
            console.log('No se encontró el producto con el ID seleccionado');
        }
    }
}


