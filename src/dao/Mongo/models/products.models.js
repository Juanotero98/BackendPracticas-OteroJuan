const {Schema, model} = require ('mongoose');

const productscollection = 'Productos'

const productsSchema = new Schema({
    name:{
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
    stock:{
        type:Number,
    }

})

const ProductsModel = model(productscollection, productsSchema)

module.exports ={
    ProductsModel
}