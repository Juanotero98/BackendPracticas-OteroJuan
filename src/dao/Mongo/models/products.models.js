const {Schema, model} = require ('mongoose');

const productscollection = 'Productos'

const productsSchema = new Schema({
    title:{
        type:String,
        required: true
    },
    description:{
        type:String,
    },
    price:{
        type:Number,
        required: true
    },
    thumbnail: String,
    stock:{
        type:Number,
        required: true
    },
    category:{
        type: String,
        required: true
    }

})

const ProductsModel = model('products', productsSchema)

module.exports ={
    ProductsModel
}