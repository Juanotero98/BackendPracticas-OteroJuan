const {configObject } = require('../config/config.js')

let UserDao 
let ProductDao 
console.log('persistence factory',configObject.persistence)

switch (configObject.persistence) {
    case 'MONGO':
        const UserDaoMongo = require('./Mongo/userDaoMongo.js')
        UserDao = UserDaoMongo

        const ProductDaoMongo = require ('./Mongo/productDaoMongo.js')
        ProductDao = ProductDaoMongo
        break;

    case 'SQL':

        break;
            
    case 'MEMORY':

        break;
    case 'FILE':
        //const UserDaoMongo = require('./File/managers/usersDaoMemory')
       // UserDao = UserDaoMongo

        const ProductDaoMongo = require ('./Mongo/productDaoMongo.js')
        ProductDao = ProductDaoMongo
        break;    

    default:
        break;
}

module.exports = {
    ProductDao,
    UserDao
}