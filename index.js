//PRACTICA 2//
const fs = require('fs');

class ProductManager {
    constructor(filePath) {
        this.path = filePath;
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

    async getProductById(id) {
        const products = await this.readFromFile();
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

/*(async () => {
    await manager.addProduct({
        title: 'Producto Prueba',
        description: 'Este es un producto de prueba',
        price: 200,
        thumbnail: 'Sin imagen',
        code: 'abc123',
        stock: 25,
    });

    await manager.addProduct({
        title: 'Producto 2',
        description: 'Este tambien es un producto de prueba',
        price: 400,
        thumbnail: 'Tampoco tiene imagen',
        code: 'abcd1234',
        stock: 50,
    });

    console.log(await manager.getProducts());

    console.log(await manager.getProductById(2));

    await manager.updateProduct(1, { price: 75 });

    console.log(await manager.getProducts());

    await manager.deleteProduct(2);

    console.log(await manager.getProducts());
})();*/

//PRACTICA 1//
/*class ProductManager{
    constructor(){
        this.products=[]
        this.nextId= 1
    }

    addProduct(productData){
        if(
            !productData.title ||
            !productData.description ||
            !productData.price ||
            !productData.thumbnail ||
            !productData.code ||
            !productData.stock ||
            this.products.some((product)=> product.code === productData.code)
        ) {
            return "Error: Datos Invalidos"
        }

        const product ={
            id:this.nextId,
            ...productData
        }

        this.products.push(product);
        this.nextId++

        return "Producto Agregado"
    }

    getProducts(){
        return this.products
    }

    getProductById(id){
        const product = this.products.find((product)=> product.id === id)
        if(!product){
            return "Error: Not Found"
        }

        return product
    }

}

const manager = new ProductManager()

console.log(manager.addProduct({
    title: "Coca Cola",
    description: "Gaseosa de color oscuro que viene en botella de plastico con un etiqueta roja ",
    price: 750,
    thumbnail: "thumbnail 1.jpg",
    code: "P1",
    stock: 30,
}))

console.log(manager.addProduct({
    title: "Cafe",
    description: "Granos molidos de color oscure que vienen en paquetes de plastico",
    price: 525,
    thumbnail: "thumbnail 3.jpg",
    code: "P2",
    stock: 75,
}))

//ESTE EJEMPLO DEBEREIA DAR "ERROR DATOS INVALIDOS" DEBIDO A QUE SE REPITEN VARIOS DATOS//
console.log(manager.addProduct({
    title: "Coca Cola",
    description: "Gaseosa de color oscuro que viene en botella de plastico con un etiqueta roja ",
    price: 750,
    thumbnail: "thumnail 1.jpg",
    code: "P1",
    stock: 30,
}))

console.log(manager.getProducts())
console.log(manager.getProductById(2))
console.log(manager.getProductById(4))*/
