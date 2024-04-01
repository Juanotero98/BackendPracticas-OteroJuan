const ProductDaoMongo = require('../dao/Mongo/productDaoMongo.js')
const {UserDao} = require ('../dao/factory.js')
const ProductRepository = require('./products.repository.js')
const {UserRepository} = require ('./user.repository.js')

const usersService = new UserRepository(new UserDao())
const productService = new ProductRepository(new ProductDaoMongo)

module.exports = {
    usersService,
    productService
}

