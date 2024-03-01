const {configObject: {persistence}} = require('../config/config.js')

let UserDao 
let ProductDao 
console.log(persistence)

switch (persistence) {
    case 'MONGO':
        const UserDaoMongo = require('./Mongo/userDaoMongo.js')
        UserDao = UserDaoMongo

        const ProductDaoMongo = require ('./Mongo/productDaoMongo.js')
        ProductDao = ProductDaoMongo
        break;
    case 'MEMORY':

        break;
    case 'FILE':
        const UserDaoMongo = require('./File/managers/usersDaoMemory')
        UserDao = UserDaoMongo

        const ProductDaoMongo = require ('./File/managers/productManager.js')
        ProductDao = ProductDaoMongo
        break;    
    default:
        break;
}

module.export = {
    ProductDao,
    UserDao
}