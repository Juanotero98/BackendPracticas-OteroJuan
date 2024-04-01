const {Schema, model} = require ('mongoose')

const usersCollection = 'Usuarios'

const usersSchema = Schema({

    fullname: {
        type: String,
        required: true
    },
   
    first_name: {
        type: String,
        index: true,
        required: true
    },
    last_name: String,
    email:{
        type:String,
        required: true,
        unique:true
    },
    password:{
        type:String,
        required: true

    },
    atCreated:{
        type:Date,
        default: Date.now
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    },
    gender:String

})

const usersModel = model (usersCollection, usersSchema)

module.exports = {
    usersModel
}