import { Router } from 'express';
import { findAllCarts, createCart, findCartById, updateQuantityProdToCart, addProductToCart, deleteCartById, deleteProductFromCart, purchaseCart } from '../controllers/cartsRouter.controller.js';
import { passportAuth } from '../middlewares/passport.js';
import { usersOnly } from '../middlewares/autorizar.js';

const cartsRouter = Router();

cartsRouter.get('/', findAllCarts);
cartsRouter.post('/', createCart);
cartsRouter.get('/:cid', findCartById);
cartsRouter.put('/:cid/producto/:pid', updateQuantityProdToCart);
cartsRouter.put('/:cid/add/:pid', passportAuth, usersOnly, addProductToCart);

//cartsRouter.put('/:cid', updateCart);
cartsRouter.delete('/:cid', deleteCartById);
cartsRouter.delete('/:cid/producto/:pid', deleteProductFromCart);

//cartsRouter.get('/:cid/products', getProductsFromCart);
cartsRouter.post('/:cid/purchase', purchaseCart);

export default cartsRouter;


