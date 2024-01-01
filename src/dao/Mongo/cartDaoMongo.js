const fs = require('node:fs')
const mongoose = require ('mongoose')
const CartsModel = require ('../Mongo/models/carts.models')

class cartManager {
    constructor(){
        this.path = './src/mockDb/carrito.json'
    }

    async readFromDatabase() {
        try {
            const carts = await CartsModel.find();
            return carts || [];
        } catch (error) {
            return [];
        }
    }

    async getCartById(cid) {
        const carts = await this.readFromDatabase();
        const cart = carts.find((cart) => cart._id.toString() === cid);

        if (!cart) {
            return 'No se encuentra el carrito';
        }
        return cart;
    }

    async createCart() {
        try {
            const newCart = await CartsModel.create({ products: [] });
            return newCart;
        } catch (error) {
            console.error('Error al crear el carrito:', error);
            throw error;
        }
    }
    
    async addProductToCart(cid, pid) {
        try {
            const carts = await this.readFromDatabase();
            const cartIndex = carts.findIndex((cart) => cart._id.toString() === cid);

            if (cartIndex === -1) {
                return 'No se encuentra el carrito';
            }

            const existingProductIndex = carts[cartIndex].products.findIndex(
                (product) => product.productId.toString() === pid
            );

            if (existingProductIndex !== -1) {
                carts[cartIndex].products[existingProductIndex].quantity += 1;
            } else {
                carts[cartIndex].products.push({ productId: pid, quantity: 1 });
            }

            await carts[cartIndex].save();
            return carts[cartIndex];
        } catch (error) {
            console.error('Error al agregar el producto al carrito:', error);
            throw error;
        }
    }
    
}

module.exports=cartManager