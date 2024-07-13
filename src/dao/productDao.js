import Product from '../models/Product.js';

class ProductDao {
    static async findAll() {
        return await Product.find();
    }

    static async findById(id) {
        return await Product.findById(id);
    }

    static async create(productData) {
        const product = new Product(productData);
        return await product.save();
    }
}

export default ProductDao;
