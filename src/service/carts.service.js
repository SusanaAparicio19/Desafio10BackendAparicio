import { CartsDao } from '../dao/carts.dao.js'
import { cartsRepository } from '../repository/carts.repository.js';
import { ticketService } from '../service/ticket.service.js';
import { emailService } from './email.service.js'
import { userDao } from '../dao/user.dao.js'

class CartsService {
  async createCart(newcartData) {
    const createdCart = await cartsRepository.createCart(newcartData);
    return createdCart;
  }

  async findCartById(cartId) {
    const cartById = await cartsRepository.findCartById(cartId);
    return cartById;
  }


  async findAllCarts() {
    try {
        return await cartsRepository.findAllCarts();
    } catch (error) {
        throw new Error("Error reading carts in Repository");
    }
}


  async updateQuantityProdToCart(cartId, productId, newQuantity) {
    try {
      const quantity = parseInt(newQuantity);
      if (isNaN(quantity) || quantity < 0) {
        throw new Error('La nueva cantidad debe ser un número válido');
      }

      const cart = await cartsRepository.findCartById(cartId);
      const productInCart = cart.cart.find(item => item._id.toString() === productId);
      if (!productInCart) {
        throw new Error('El producto no existe.');
      }

      return await cartsRepository.updateQuantityProdToCart(cartId, productId, newQuantity);
    } catch (error) {
      console.error(`Error en el servicio `);
      throw new Error('Error al actualizar.');
    }
  }

  async purchaseCart(cartId) {
    try {
      const cartPurchase = await cartsRepository.findCartById(cartId);
      const failedProductIds = [];
      const _id = cart.user;

      const userFound = await userDao.findOneUser({ _id });
      const email = user.email;

      const ticket = await ticketService.createTicket(cart);

      await this.processProducts(cart, failedProductIds);

      await this.updateCartAfterPurchase(cart, failedProductIds);
// email----------------------------------
      await emailService.send(
        user.email,
        '46Soles Agradece Su Compra!',
        `Nro ticket: ${ticket.code}`
      );

     return { ticket, failedProductIds };
    } catch (error) {
      console.error(`Error en el servicio`);
      throw new Error('Error al realizar la compra.');
    }
  }


  async updateCartAfterPurchase(cart, failedProductIds) {
    try {
      const failedProducts = cart.cart.filter((cartProduct) =>
        failedProductIds.includes(cartProduct.productID)
      );

      cart.cart = failedProducts;
      const cartsDaoInstance = new CartsDao(); 
      await cartsDaoInstance.saveCart(cart); 
    } catch (error) {
      console.error(`Error en el servicio`);
      throw new Error('Error al actualizar el carrito.');
    }
  }

  async addProductToCart(cartId, productId) {
    const addedProdToCart = await cartsRepository.addProductToCart(cartId, productId);
    return addedProdToCart(cartId, productId).toPOJO();
  }

  async deleteCartById(cartId) {
    const deletedCart = await cartsRepository.deleteCartById(cartId);
    return deletedCart;
  }

  async deleteProductFromCart(cartId, productId) {
    return await cartsRepository.deleteProductFromCart(cartId, productId);
  }
}
export const cartService = new CartsService();


