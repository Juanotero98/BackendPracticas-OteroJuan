const passport = require ('passport')
const jwt = require ('passport-jwt')
//const { usersModel } = require('../dao/Mongo/models/users.models')
const UserDaoMongo = require('../dao/Mongo/userDaoMongo')
const { createHash, isValidPassword } = require('../utils/hashPassword.js')



const JWTStrategy = jwt.Strategy
const ExtractJWT = jwt.ExtractJwt
const userService = new UserDaoMongo()


exports.initializePassport = ()=>{
    const cookieExtractor = req =>{
        let token = null
        if(req && req.cookies){
            token = req.cookies['token']
        }
        return token
    }
    //Middleware es una estrategia//

    //passport.use('register', new LocalStrategy({
    //    passReqToCallback: true,
    //    usernameField: 'email'

    //}, async (req, username, password, done)=>{
    //    try {
    //        const {first_name, last_name, email,} = req.body
    //        let userFound = await userService.getUserBy({email: username})
    //        if(user) return done(null, false)

    //        let newUser = {
    //            first_name,
    //            last_name,
    //            email: username,
    //            password: createHash(password)
    //        }

    //        let result = await userService.createUser(newUser)
    //        return done(null, result)

    //    } catch (error) {
    //        return done('Error al crea usuario' + error)
    //    }
    //}))


    // GUARADR Y RECUPERAR CREDENCIALES DEL USUARIO DE SESSION
   
    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: 'CoderSecretoJsonWebToken'
    }, async (jwt_payload,done)=>{
        try {
            return done (null, jwt_payload)
            
        } catch (error) {
            return done(error)
        }
    }))




   

}
