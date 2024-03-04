import { FakeEmailServicePremium } from '../service/email.service.js';
import { ProductService } from '../service/products.service.js'

const productService = new ProductService();

export async function getAllProducts(req, res) {
    try {
        const { limit, skip, sort, query } = req.query; // Obtener los valores de limit, skip, sort y query de la solicitud
        const products = await productService.getAllProducts({ limit, skip, sort, query });
        res.json(products);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al obtener todos los productos');
    }
}

export async function getProductById(req, res) {
    const pid = parseInt(req.params.pid);
    try {
        const product = await productService.getProductById(pid);
        res.json(product);
    } catch (error) {
        console.log(error);
        res.status(500).send(`Error al recibir el producto con Id ${pid}`);
    }
}

export async function addProduct(req, res) {
    const { category, object, title, description, code, stock, status, price } = req.body;
    try {
        const newProduct = await productService.addProduct({
            category,
            object,
            title,
            description,
            code,
            stock,
            status,
            price,
        });
        res.status(201).json(newProduct);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al agregar el producto');
    }
}

export async function updateProduct(req, res) {
    const id = parseInt(req.params.pid);
    try {
        const { category, object, title, description, code, stock, status, price } = req.body;
        const updatedProduct = await productService.updateProduct(id, { category, object, title, description, code, stock, status, price });
        res.json(updatedProduct);
    } catch (error) {
        console.log(error);
        res.status(500).send(`Error al editar el producto con Id ${id}`);
    }
}

export async function deleteProduct(req, res) {
    const id = parseInt(req.params.pid);
    try {
        await productService.deleteProduct(id);
        res.status(204).send();
    } catch (error) {
        console.log(error);
        res.status(500).send(`Error al eliminar el producto con Id ${id}`);
    }
}

export async function updateProductById(req, res) {
    const id = parseInt(req.params.pid);
    try {
        const { category, object, title, description, code, stock, status, price } = req.body;
        const updatedProduct = await productService.updateProduct(id, { category, object, title, description, code, stock, status, price });
        res.json(updatedProduct);
    } catch (error) {
        console.log(error);
        res.status(500).send(`Error al actualizar el producto con Id ${id}`);
    }
}

export async function deleteProductWithNotification(req, res) {
    const id = parseInt(req.params.pid);
    try {
        const product = await productService.getProductById(id);
        if (!product) {
            return res.status(404).send(`Producto con ID ${id} no encontrado`);
        }

        if (req.user.role === 'admin' || (req.user.role === 'premium' && product.owner === req.user.email)) {
            if (req.user.role === 'premium') {
                                
                //email----------------------------------
                await FakeEmailServicePremium.sendEmail(
                    product.owner,`Su producto "${product.title}" será eliminado.`);
                
                /*sendEmailToPremiumUser(product.owner, `Su producto "${product.title}" será eliminado.`);*/
            }
            await productService.deleteProduct(id);
            return res.status(204).send();
        } else {
            return res.status(403).send('No tienes permiso para eliminar este producto');
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(`Error al eliminar el producto con Id ${id}`);
    }

}

