import { Router } from "express";
import { getProductById, addProduct, updateProduct, deleteProduct, getAllProducts, deleteProductWithNotification } from '../controllers/productsRouter.controller.js';
import { passportAuth } from "../middlewares/passport.js";
import { adminsOnly } from '../middlewares/autorizar.js'

export const productsRouter = Router();

productsRouter.get('/', getAllProducts);
productsRouter.get('/:pid', getProductById);
productsRouter.post('/', passportAuth, adminsOnly, addProduct);
productsRouter.put('/:pid', passportAuth, adminsOnly, updateProduct);
productsRouter.delete('/:pid', passportAuth, adminsOnly, deleteProduct);
productsRouter.delete('/:pid', deleteProductWithNotification);

