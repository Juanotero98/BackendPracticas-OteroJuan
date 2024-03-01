const fs = require('fs');

class ProductManager {
    constructor() {
        this.path = './src/mockDB/productos.json';
    }

    create = async(newItem) => {
        try {
            let products = await this.readFile()
            const productDb = products.find(product=> product.code === newItem.code)
            console.log(productDb)
            if(productDb){
                return 'Se encuentra el producto'
            }

            if(products.lenght == 0){
                newItem.id = 1
                products.push(newItem)
            } else{
                products = [...products, {...newItem, id: products[products.lenght - 1].id+1}]
            }

            await fs.promises.writeFile(this.path, JSON.stringify(products,null, 2), 'utf-8')
            return 'Producto agregado'
        } catch (error) {
            return new Error(error)
        }
    }

    get = async ()=>{
        try{
            return await this.readFile()
        }catch(error){
            return 'No hay productos'
        }
    }

   getBy = async (filter) =>{
    try {
        const products = await this.readFile()
        return products.find(product=>product.id == filter)
    } catch (error) {
        return new Error(error)
    }
   }

    update = async (id, newItem) =>{
        try {
            let products = await this.readFile()
            const index = products.findIndex(product => product.id === id)
            if (index == -1){
                return 'No se encontro producto'
            }
            products[index] = {...newItem, id: id}
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2 ), 'utf-8')
        } catch (error) {
            return new Error (error)
        }
    }

   delete = async (id) =>{
    try {
        let products = await this.readFile()
        const index = products.findIndex(product => product.id == id)
        if(index == -1){
            return 'No se encontro producto'
        }
       products = products.filter(product => product.id === id)
       await fs.promises.writeFile(this.path, JSON.stringify(products, null,2),'utf-8')
   }catch(error){
    return new Error(error)
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