const {connect} = require ('mongoose')
//static permitia acceder sin instanciar la clase
class MongoSingleton {
    static instance 
    constructor(url){
        connect(url)
    }

    static getInstance(url){
        if(this.instance){
            console.log('Base de datos ya conectada')
            return this.instance

        }

        this.instance = new MongoSingleton(url)
        console.log('Conectado')
        return this.instance
    }
}

module.exports = {
    MongoSingleton
}