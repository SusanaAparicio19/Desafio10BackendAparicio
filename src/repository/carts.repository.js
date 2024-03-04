import { CartsDao } from '../dao/carts.dao.js';

class CartsRepository {
    constructor() {
        this.cartsDao = new CartsDao();
    }
    async createCart(newcartData) {
        return this.cartsDao.createCart(newcartData);
    }

    async findCartById(cartId) {
        return this.cartsDao.findCartById(cartId);
    }

    async findAllCarts() {
        return this.cartsDao.findAllCarts();
    }

    async updateQuantityProdToCart(cartId, productId, newQuantity) {
        return this.cartsDao.updateQuantityProdToCart(cartId, productId, newQuantity);
    }

    async addProductToCart(cartId, productId) {
        return this.cartsDao.addProductToCart(cartId, productId);
    }

    async deleteCartById(cartId) {
        return this.cartsDao.deleteCartById(cartId);
    }

    async deleteProductFromCart(cartId, productId) {
        return this.cartsDao.deleteProductFromCart(cartId, productId);
    }
}

export const cartsRepository = new CartsRepository()

