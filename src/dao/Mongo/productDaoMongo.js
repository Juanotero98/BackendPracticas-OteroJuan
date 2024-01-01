const fs = require('fs');
const ProductsModel = require('../Mongo/models/products.models');

class ProductDaoMongo {
    
    async addProduct(ProductData) {
        const newProduct = await ProductsModel.create(ProductData);
        return newProduct;
    }

    async getProducts() {
        const products = await ProductsModel.find();
        return products;
    }

    async getProduct(uid) {
        const product = await ProductsModel.findById({_id: uid});
        return product;
    }

    async updateProduct(id, updatedFields) {
        const updatedProduct = await ProductsModel.findByIdAndUpdate(id, updatedFields, { new: true });
        return updatedProduct;
    }

    async deleteProduct(uid) {
        const deletedProduct = await ProductsModel.findByIdAndDelete({_id: uid});
        return deletedProduct;
    }

    
}

module.exports = ProductDaoMongo;




