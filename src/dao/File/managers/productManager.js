const fs = require('fs');

class ProductManager {
    constructor() {
        this.path = './src/mockDB/productos.json';
    }

    async addProduct(productData) {
        const products = await this.readFromFile();
        const newProduct = {
            id: this.getNextId(products),
            ...productData
        };
        products.push(newProduct);
        await this.writeToFile(products);
        return newProduct;
    }

    async getProducts() {
        const products = await this.readFromFile();
        return products;
    }

    async getProduct(id) {
        const products = await this.readFromFile();
        if(!products) return 'No hay productos'
        const product = products.find(product => product.id === id);
        return product;
    }

    async updateProduct(id, updatedFields) {
        const products = await this.readFromFile();
        const index = products.findIndex(product => product.id === id);
        if (index !== -1) {
            products[index] = { ...products[index], ...updatedFields };
            await this.writeToFile(products);
            return products[index];
        } else {
            return null;
        }
    }

    async deleteProduct(id) {
        const products = await this.readFromFile();
        const index = products.findIndex(product => product.id === id);
        if (index !== -1) {
            const deletedProduct = products.splice(index, 1)[0];
            await this.writeToFile(products);
            return deletedProduct;
        } else {
            return null;
        }
    }

    getNextId(products) {
        const maxId = products.reduce((max, product) => (product.id > max ? product.id : max), 0);
        return maxId + 1;
    }

    async readFromFile() {
        try {
            const data = await fs.promises.readFile(this.path, 'utf8');
            return JSON.parse(data) || [];
        } catch (error) {
            return [];
        }
    }

    async writeToFile(products) {
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2), 'utf8');
    }
}

module.exports = ProductManager



const manager = new ProductManager('productos.json');