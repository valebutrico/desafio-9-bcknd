import Cart from '../models/Cart.js';

class CartDao {
    static async findAll() {
        return await Cart.find();
    }

    static async findById(id) {
        return await Cart.findById(id);
    }

    static async create(cartData) {
        const cart = new Cart(cartData);
        return await cart.save();
    }
}

export default CartDao;
