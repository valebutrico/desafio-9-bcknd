import CartDao from '../dao/cartDao.js';

class CartService {
    static async getAllCarts() {
        return await CartDao.findAll();
    }

    static async getCartById(id) {
        return await CartDao.findById(id);
    }

    static async createCart(cartData) {
        return await CartDao.create(cartData);
    }
}

export default CartService;
