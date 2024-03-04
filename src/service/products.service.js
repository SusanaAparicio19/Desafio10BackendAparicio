import { productRepository } from '../repository/product.repository.js';

export class ProductService {
   
    async getAllProducts({ limit = 10, page = 1, skip = 0,sort, query }) {
        const skipCount = (page - 1) * limit;
        const products = await productRepository.getAllProducts({ limit, skip: skipCount, sort, query });
        const totalProducts = await productRepository.getTotalProducts(query);
        const totalPages = Math.ceil(totalProducts / limit);
        const hasNextPage = page < totalPages;
        const hasPrevPage = page > 1;
        const prevPage = hasPrevPage ? page - 1 : null;
        const nextPage = hasNextPage ? page + 1 : null;
        const prevLink = hasPrevPage ? `/api/products?limit=${limit}&page=${prevPage}` : null;
        const nextLink = hasNextPage ? `/api/products?limit=${limit}&page=${nextPage}` : null;
    
        return {
            status: "success",
            payload: products,
            totalPages,
            prevPage,
            nextPage,
            page,
            hasPrevPage,
            hasNextPage,
            prevLink,
            nextLink
        };
    }


    async getProductById(pid) {
        if (isNaN(pid) || pid <= 0) {
            throw new Error('El ID del producto debe ser un número positivo.');
        }
        const product = await productRepository.getProductById(pid);
        return product
    }

    async addProduct(productData) {
        if (!productData.category || !productData.object || !productData.title || !productData.description || !productData.code || !productData.stock || !productData.status || !productData.price) {
            throw new Error('Los datos de los productos son obligatorios.');
        }
        return await productRepository.addProduct(productData);
    }

    async updateProduct(productId, updatedProductData) {
        const existingProduct = await productRepository.getProductById(productId);
        if (!existingProduct) {
            throw new Error(`No se encontró un producto.`);
        }
        return await productRepository.updateProduct(productId, updatedProductData);
    }

    async deleteProduct(productId) {
        const existingProduct = await productRepository.getProductById(productId);
        if (!existingProduct) {
            throw new Error(`No se encontró un producto.`);
        }
        return await productRepository.deleteProduct(productId);
    }
}
export const producsService = new ProductService();

