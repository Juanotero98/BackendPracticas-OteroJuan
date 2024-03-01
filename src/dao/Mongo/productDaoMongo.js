const fs = require('fs');
const ProductsModel = require('../Mongo/models/products.models');

class ProductDaoMongo {
    
    constructor(){
        this.model = ProductsModel

    }

    async get(){
        return await this.model.find()
    }
    async getBy(filter){
        return await this.model.findById(filter)
    }
    async create(newProduct){
        return await this.model.create(newProduct)
    }
    async update(pid, productToUpdate){
        return this.model.findByIdAndUpdate({_id: pid, productToUpdate})
    }
    async delete(pid){

    }

    
}

module.exports = ProductDaoMongo;




