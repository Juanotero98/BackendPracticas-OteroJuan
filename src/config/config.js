const {connect} = require('mongoose')
const dotenv = require ('dotenv')
const { program } = require('../utils/commander.js')
const { MongoSingleton } = require('../utils/mongoSingleton.js')

const {mode} = program.opts()
console.log('mode config:', mode)
dotenv.config({
    path: mode == 'production' ? './.env.production' : './.env.development'
})

//console.log('config persistence:', process.env.PERSISTENCE)
const configObject = {
    PORT: process.env.PORT || 4000,
    mongo_url: process.env.MONGO_URL,
    persistence: process.env.PERSISTENCE,
    jwt_secret_key:process.env.JWT_SECRET_KEY,
    gmail_user_app:process.env.GMAIL_USER_APP,
    gmail_password_app:process.env.GMAIL_PASSWORD_APP,
    twilio_account_sid:process.env.TWILIO_ACCOUNT_SID,
    twilio_auth_token:process.env.TWILIO_AUTH_TOEKN,
    twilio_number_phone:'+15087152244',
    gh_client_id:'',
    gh_client_secret:''
}

const connectDb = async()=>{
    try {
        //await connect(process.env.MONGO_URL)
        MongoSingleton.getInstance(process.env.MONGO_URL)
        //console.log('Base de datos conectada') 
    } catch (error) {
        console.log(error)
        
    }
}

module.exports = {
    configObject,
    connectDb
}