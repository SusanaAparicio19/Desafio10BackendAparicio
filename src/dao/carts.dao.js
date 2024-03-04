import { CartsModel } from '../models/carts.model.js';
import { productDao } from './product.dao.js';

export class CartsDao {
    async createCart(newCartData) {
        try {
            const newCart = await CartsModel.create({ user: newCartData.user });
            return newCart;
        } catch (error) {
            throw new Error(`Error al crear un nuevo carrito`);
        }
    };

    async findCartById(cartId) {
        try {
            const cartById = await CartsModel.findById(cartId).populate('carts.productId');
            if (!cartById) {
                throw new Error('El carrito buscado no existe');
            }
            return cartById;
        } catch (error) {
            throw new Error(`Error al obtener el carrito por ID`);
        }
    };

    async findAllCarts() {
        try {
            const allCart = await CartsModel.find().populate('carts.productId').lean();
            return allCart;
        } catch (error) {
            throw new Error(`Error al obtener los carritos`);
        }
    };

    async updateQuantityProdToCart(cartId, productId, newQuantity) {
        try {
            const product = await CartsModel.findByIdAndUpdate(
                cartId,
                { $set: { "cart.$[elem].cant": newQuantity } },
                { arrayFilters: [{ "elem._id": productId }] },
                { new: true }
            );
            return product;
        } catch (error) {
            throw new Error(`Error al actualizar carrito`);
        }
    };

    async addProductToCart(cartId, productId) {
        try {
            const product = await productDao.getProductById(productId);

            if (!product) {
                throw new Error('Producto no encontrado');
            }

            const productExist = await CartsModel.findOne({
                _id: cartId,
                'cart.productId': productId
            });

            if (productExist) {
                const upDatedProduct = await CartsModel.findOneAndUpdate(
                    {
                        _id: cartId,
                        'cart.productId': productId
                    },
                    {
                        $inc: { 'cart.$.cant': 1 },
                        $inc: { totalAmount: product.price }
                    },
                    { new: true }
                );
                return upDatedProduct;
            } else {
                const addNewProductToCart = await CartsModel.findByIdAndUpdate(
                    cartId,
                    {
                        $push: { cart: { productId: productId, cant: 1 } },
                        $inc: { totalAmount: product.price }
                    },
                    { new: true }
                );
                return addNewProductToCart;
            }
        } catch (error) {
            throw new Error(`Error al agregar el producto al carrito`);
        }
    }

    async deleteCartById(cartId) {
        try {
            const deleteCart = await CartsModel.findByIdAndDelete(cartId, { new: true });
            if (!deleteCart) {
                throw new Error(`El carrito con ID ${cartId} no existe`);
            }
            return deleteCart;
        } catch (error) {
            throw new Error(`Error al eliminar el carrito`);
        }
    };

    async deleteProductFromCart(cartId, productId) {
        try {
            const deleteProdFromCart = await CartsModel.findByIdAndDelete(
                cartId,
                { $pull: { cart: { _id: productId } } },
                { new: true }
            );
            if (!deleteProdFromCart) {
                throw new Error(`El producto con ID ${productId} no existe en el carrito ${cartId}`);
            }
            return deleteProdFromCart;
        } catch (error) {
            throw new Error(`Error al eliminar el producto del carrito`);
        }
    };

    async saveCart(cart) {
        try {
            await cart.save();
        } catch (error) {
            throw new Error('Error saving cart');
        }
    }

}
