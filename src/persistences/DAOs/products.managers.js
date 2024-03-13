import { productsModels} from "../MongoDB/models/products.models";

export default class ProductManager {
    async getProducts(limit, page, sort, query) {
        try {
            const objects = {
                limit: parseInt(limit) || 10,
                page: parseInt(page) || 1,
                sort: parseInt(sort) ? { price: sort } : {},
            }
            const queryes = query || {}
            const products = await productsModels.paginate(queryes, objects)
            const productsInfo = {
                status: "success",
                payload: products.docs,
                info: {
                    totalpages: products.totalPages,
                    prevPage: products.prevPage,
                    nextPage: products.nextPage,
                    page: products.page,
                    hasPrevPage: products.hasPrevPage,
                    hasNextPage: products.hasNextPage,
                    prevLink: products.hasPrevPage ? `http://localhost:8080/api/products?limit=${limit}&page=${products.prevPage}` : null,
                    nextLink: products.hasNextPage ? `http://localhost:8080/api/products?limit=${limit}&page=${products.nextPage}` : null
                }
            }
            return productsInfo
        } catch {
            logger.error(ErrorsMessage.PRODUCT_EMPTYLIST_ERROR)
            throw CustomError.createCustomError({
                name: ErrorsName.PRODUCT_ERROR,
                cause: ErrorsCause.PRODUCT_EMPTYLIST_CAUSE,
                message: ErrorsMessage.PRODUCT_EMPTYLIST_ERROR
            });
        }
    }
    async addProduct(obj, owner) {
        try {
            if (owner.rol !== "Admin") {
                obj.owner = owner.email
            }
            const products = await this.getProducts()
            const productsList = products.payload
            if (productsList.find((el) => el.code === obj.code)) {
                logger.warn(ErrorsMessage.PRODUCT_REPEATEDCODE_ERROR)
                throw CustomError.createCustomError({
                    name: ErrorsName.PRODUCT_ERROR,
                    cause: ErrorsCause.PRODUCT_REPEATEDCODE_CAUSE,
                    message: ErrorsMessage.PRODUCT_REPEATEDCODE_ERROR
                });
            } else {
                if (obj.title || obj.description || obj.code || obj.price || obj.stock || obj.status || obj.category || obj.thumbnails) {
                    const newProduct = new productsModels(obj)
                    const productSaved = newProduct.save()
                    return productSaved
                } else {
                    logger.warn(ErrorsMessage.PRODUCT_ADD_ERROR)
                    throw CustomError.createCustomError({
                        name: ErrorsName.PRODUCT_ERROR,
                        cause: ErrorsCause.PRODUCT_ADD_CAUSE,
                        message: ErrorsMessage.PRODUCT_ADD_ERROR
                    });
                }
            }
        } catch(error) {
            console.log(error);
            logger.error(ErrorsMessage.PRODUCT_ADD_ERROR)
            throw CustomError.createCustomError({
                name: ErrorsName.PRODUCT_ERROR,
                cause: ErrorsCause.PRODUCT_ADD_CAUSE,
                message: ErrorsMessage.PRODUCT_ADD_ERROR
            });
        }
    }
    async getProductsByID(id) {
        try {
            const product = await productsModels.findById(id)
            return product
        } catch {
            logger.error(ErrorsMessage.PRODUCT_WRONGID_ERROR)
            throw CustomError.createCustomError({
                name: ErrorsName.PRODUCT_ERROR,
                cause: ErrorsCause.PRODUCT_WRONGID_CAUSE,
                message: ErrorsMessage.PRODUCT_WRONGID_ERROR
            });
        }
    }
    async deleteProduct(id, owner) {
        try {
            const productToDelete = await this.getProductsByID(id);
            if (owner.rol === "user") {
                logger.warn(ErrorsMessage.AUTH_INVALIDROL_ERROR);
                throw CustomError.createCustomError({
                    name: ErrorsName.SESSION_ERROR,
                    cause: ErrorsCause.AUTH_INVALIDROL_CAUSE,
                    message: ErrorsMessage.AUTH_INVALIDROL_ERROR
                });
            }
            if (owner.rol === "admin" || (owner.rol === "premium" && productToDelete.owner === owner.email)) {
                if (productToDelete.owner !== "Admin") {
                    const transport = nodemailer.createTransport({
                        service: 'gmail',
                        port: 587,
                        auth: {
                            user: config.GCOUNT[0],
                            pass: config.GCOUNT[1]
                        }
                    });
                    await transport.sendMail({
                        from: "<lucas.panizzo99@gmail.com>",
                        to: productToDelete.owner,
                        subject: 'Producto Borrado',
                        html: `
                  <div>
                    <p>Se ha borrado tu producto, "${productToDelete.title}". Contacta con Soporte si crees que es un error.</p>
                  </div>
                `
                    });
                }
                const deletedProd = await productsModels.deleteOne({ _id: id });
                return deletedProd;
            } else {
                logger.warn(ErrorsMessage.AUTH_INVALIDROL_ERROR);
                throw CustomError.createCustomError({
                    name: ErrorsName.SESSION_ERROR,
                    cause: ErrorsCause.AUTH_INVALIDROL_CAUSE,
                    message: ErrorsMessage.AUTH_INVALIDROL_ERROR
                });
            }
        } catch (error) {
            console.log(error);
            logger.error(ErrorsMessage.PRODUCT_WRONGID_ERROR);
            throw CustomError.createCustomError({
                name: ErrorsName.PRODUCT_ERROR,
                cause: ErrorsCause.PRODUCT_WRONGID_CAUSE,
                message: ErrorsMessage.PRODUCT_WRONGID_ERROR
            });
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
                logger.warn(ErrorsMessage.PRODUCT_ADD_ERROR)
                throw CustomError.createCustomError({
                    name: ErrorsName.PRODUCT_ERROR,
                    cause: ErrorsCause.PRODUCT_ADD_CAUSE,
                    message: ErrorsMessage.PRODUCT_ADD_ERROR
                });
            }
        } catch {
            logger.error(ErrorsMessage.PRODUCT_WRONGID_ERROR)
            throw CustomError.createCustomError({
                name: ErrorsName.PRODUCT_ERROR,
                cause: ErrorsCause.PRODUCT_WRONGID_CAUSE,
                message: ErrorsMessage.PRODUCT_WRONGID_ERROR
            });
        }
    }
}


