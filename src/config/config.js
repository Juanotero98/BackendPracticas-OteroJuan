const {connect} = require('mongoose')

exports.connectDb = async()=>{
    connect('mongodb://127.0.0.1:27017/c55625')
    console.log('Base de datos 2 conectada')
}