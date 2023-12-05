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
        const carts = await this.readFromFile()
        const cart = carts.find(cart=> cart.id === cid)
        if(!cart){
            return 'No se encuentra carrito'
        }
        return cart  
    }

    createCart = async () => {
        try {
            const carts = await this.readFromFile(); 
            let newCart;
    
            if (carts.length === 0) {
                newCart = { id: 1, products: [] };
            } else {
                newCart = { id: carts.length + 1, products: [] };
                carts.push(newCart);
            }
    
            await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2), 'utf-8'); 
    
            return newCart;
        } catch (error) {
            console.log('Error al crear carrito:',);
            
        }
    };
    
    addProductToCart = async (cid, pid) => {
        try {
            const carts = await this.readFromFile(); 
            const cartIndex = carts.findIndex(cart => cart.id === cid);
    
            if (cartIndex === -1) {
                return 'No se encuentra carrito';
            }
    
            
            const existingProductIndex = carts[cartIndex].products.findIndex(product => product.productId === pid);
    
            if (existingProductIndex !== -1) {
                
                carts[cartIndex].products[existingProductIndex].quantity += 1;
            } else {
                
                carts[cartIndex].products.push({ productId: pid, quantity: 1 });
            }
    
            await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2), 'utf-8');
    
            return carts[cartIndex];
        } catch (error) {
            console.log('Error al agregar producto al carrito:',);
             
        }
    };
    
}

module.exports=cartManager