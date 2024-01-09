const{Router} = require('express')
const { authentication } = require('../middlewares/auth.middlewares')
const { usersModel } = require('../dao/Mongo/models/users.models')
const bcrypt = require('bcrypt');


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
            password
        }

        const result = await usersModel.create(newUser)
        res.send({
            status: 'success',
            payload: {
                first_name: result.first_name,
                last_name: result.last_name,
                email: result.email,
                _id: result._id
            }
        })
})

router.post('/login', async (req,res)=>{
    const {email, password} = req.body
     //consulta a base de datos//
        if(email  === '' || password=== ''){
            return res.send('todos los campos son obligatorios')
        }

        const user = await usersModel.findOne({email})
        if(!user){
            return res.send('email o contraseña incorrectos')
        }

        //VALIDAR CONTRASEÑA//
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
        return res.send('Email o contraseña incorrectos');
        }

        req.session.user = {
            user:user._id,
            first_name:user.first_name,
            last_name:user.last_name,
            admin: true
        }
        res.redirect('/productos')
        
})

router.get('/currentprivate', authentication,(req,res)=>{
    res.send('infor que solo puede ver el admin')
})

router.get('/logout', (req, res)=>{
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