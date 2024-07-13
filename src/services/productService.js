import ProductDao from '../dao/productDao.js';

class ProductService {
    static async getAllProducts() {
        return await ProductDao.findAll();
    }

    static async getProductById(id) {
        return await ProductDao.findById(id);
    }

    static async createProduct(productData) {
        return await ProductDao.create(productData);
    }
}

export default ProductService;
