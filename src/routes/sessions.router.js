const{Router} = require('express')
const { authentication } = require('../middlewares/auth.middlewares')
const { usersModel } = require('../dao/Mongo/models/users.models')
const bcrypt = require('bcrypt');
const { createHash, isValidPassword } = require('../utils/hashPassword');
const passport = require('passport');
const { createToken, authenticationToken } = require('../utils/jwt.js');
const { passportCall } = require('../utils/passportCall.js');
const { authorizationJwt } = require('../middlewares/jwt-passport.middleware.js');

const router = Router()

router.get('/', (req,res)=>{
    if(req.session.counter){
        req.session.counter ++

        res.send(`Se ha visitado esta pagina ${req.session.counter}`)
    }else{
        req.session.counter = 1
        req.session.username = 'juan'
        res.send('Bienvenido a ecommerce coder')
    }
    //res.send('sessions')
})

////////////////////////////////////////////////////////////////////////////////////////// ESTRATEGIA 1 //////////////////////////////////////////////////////////////////////////////////
router.post('/register', async (req,res)=>{
    const {first_name,email,last_name, password} = req.body
     //consulta a base de datos//
        if(first_name === '' || password==='' || email ===''){
            return res.send('faltan completar campos obligatorios')
        }
        const userFound = await usersModel.findOne({email})
        if(userFound){
            return res.send({status: 'error', error: 'Ya existe el usuario'})
        }
        const newUser = {
            first_name,
            last_name,
            email,
            password: createHash(password)
        }

        const result = await usersModel.create(newUser)
        const token = createToken({id: result._id,})
        res.cookie('token', token,{
            maxAge: 60 * 60 * 1000 * 24,
            httpOnly: true,
            ////////SI NO LO HAGO CON HBS USAR: /////////
            //secure:true,
            //sameSite: 'none'
        }).json({
            status: 'success',
            message: 'logged in',   
        })
})

router.post('/login', async (req,res)=>{
    const {email, password} = req.body
     
        if(email  === '' || password=== ''){
            return res.send('todos los campos son obligatorios')
        }

        const user = await usersModel.findOne({email})
        if(!user){
            return res.send('email o contraseña incorrectos')
        }

        if(isValidPassword(password, { password: user.password})){
            return res.send('Email o contraseña incorrectos')
        }
        const token = createToken({id: user._id, role: user.role})
        res.cookie('token', token,{
            maxAge: 60 * 60 * 1000 * 24,
            httpOnly: true,
            ////////SI NO LO HAGO CON HBS USAR: /////////
            //secure:true,
            //sameSite: 'none'
        }).json({
            status: 'success',
            message: 'logged in',   
        })
        
})

router.get('/current', passportCall('jwt'),authorizationJwt('user'),(req,res)=>{
    res.send({message:'datos sensibles', reqUser: req.user})
})

///////////////////////////////////////////////////////////////////RUTAS DE PASSPORT ESTRATEGIA 2 ///////////////////////////////////////////////////////////

router.get('/github', passport.authenticate('github', {scope: ['user:email']}), async(req,res)=>{})
router.get('/githubcallback', passport.authenticate('github', {failureRedirect: '/login'}),(req,res)=>{
    req.session.user = req.user
    res.redirect('/')
})

router.get('/logout',(req, res)=>{
    req.session.destroy(error=>{
        if(error)return res.send({status:'error', error: error})     
        
    })
    res.send('logout exitosos')
})



////COOKIES////
//router.get('/setcookies', (req, res)=>{

    //res.cookie('coderCookie', 'Esta es una cookie muy poderosa', {maxAge: 1000000*24}).send('cookies')
//})
//router.get('/setcookies', (req, res)=>{

    //res.cookie('signedCookie', 'Esta es una cookie muy poderosa', {maxAge: 1000000*24, signed:true}).send('cookies')
//})
//router.get('/getcookies', (req, res)=>{
    //console.log(req.signedCookies)
    //console.log(req.cookies)
    //res.send(req.signedCookies)
    //res.send(req.cookies)

//})
//router.get('/deletecookies', (req, res)=>{
    
    //res.clearCookie('coderCookie').send('delete cookies')
//})

module.exports = router