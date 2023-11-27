const fs = require('node:fs')

class cartManager {
    constructor(){
        this.path = './src/mockDb/carrito.json'
    }

    async readFromFile() {
        try {
            const data = await fs.promises.readFile(this.path, 'utf8');
            return JSON.parse(data) || [];
        } catch (error) {
            return [];
        }
    }

    getCartById = async (cid)=>{
        const carts = await this.readFromFile
        const cart = carts.find(cart=> cart.id === cid)
        if(!cart){
            return 'No se encuentra carrito'
        }
        return cart  
    }

    createCart = async ()=>{
        const carts = this.readFromFile()
        let newCart
        if(carts-length == 0){
             newCart= {id: 1, products: []}

        }else{
             newCart= {id: carts.length + 1, products: []}
            carts.push(newCart)
            const results = await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2), 'utf-8')
            return results
        }
        

    }
    addProductToCart= async (cid, pid)=>{
        const carts = await this.readFromFile
        const cartIndex = carts.findIndex(cart=> cart.id === cid)
        if(cartIndex === -1 ){
            return 'No se encuentra carrito'
        }
        carts[cartIndex].products = {productId: pid}
        const results = await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2), 'utf-8')
        return results
    }
}

module.exports=cartManager