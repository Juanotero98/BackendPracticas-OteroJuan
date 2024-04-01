const fs = require('fs');
const ProductsModel = require('../Mongo/models/products.models');

class ProductDaoMongo {
    
    constructor(){
        this.model = ProductsModel

    }

    get = async () => this.model.find({})
    
    getBy = async filter => this.model.findOne(filter)

    create = async newProduct => this.model.create(newProduct)
    
    update = async (pid, productToUpdate) => this.model.findByIdAndUpdate({_id: pid}, productToUpdate, {new: true})
    
    delete = async (pid) => this.model.findByIdAndDelete({_id: pid}, {new:true})
    
}

module.exports = ProductDaoMongo;




