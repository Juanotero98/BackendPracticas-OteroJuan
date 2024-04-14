const {Router} = require('express')
//const {faker} = require('@faker-js/faker')
//const {fork} = require ('node:child_process')
//const { sendMail } = require('../utils/sendMail')
//const { sendSMS } = require('../utils/sendSMS')
const compression = require('express-compression')

const router = Router()




router.get('/test/user', (req, res)=>{
    let first_name = faker.person.firstName()
    let last_name = faker.person.lastName()
    let email = faker.internet.email()
    let password = faker.internet.password()
    res.send({
        first_name,
        last_name,
        email,
        password
    })
})

router.get('/logger',(req,res)=>{
    //req.logger.warn('Alerta esto es un warning en el endpoint de pruebas/logger')
    //req.logger.error('Alerta esto es un error en el endpoint de pruebas/logger')
    req.logger.fatal('Alerta esto es un error en el endpoint de pruebas/logger')
    res.send('logger')
})

//router.use(compression({
   // brotli:{
        //enabled: true,
        //zlib:{}
    //}
//}))
//router.get('/compress',(req,res)=>{
    //let string = 'Hola coders, soy un string ridiculamente largo'
    //for (let i = 0; i < 5e4; i++) {
       // string += 'Hola coders, soy un string ridiculamente largo'
   // }

    //res.send(string)
//})

//const generateProduct = () =>{
    //return{
    //title: faker.commerce.productName(),
    //price: faker.commerce.price(),
    //departament: faker.commerce.department(),
    //stock: faker.string.numeric(),
    //description: faker.commerce.productDescription(),
    //id: faker.database.mongodbObjectId(),
    //image: faker.image.url()
    //}
//}

//const generateUser = ()=>{
    //let products = []
    //let totalOfProducts = parseInt(faker.string.numeric(1, {bannerDigits: ['0']}))
    //for (let i = 0; i < totalOfProducts; i++) {
        //products.push(generateProduct())
        
    //}
    //return {
        //first_name: faker.person.firstName(),
        //last_name: faker.person.lastName(),
        //sex: faker.person.sex(),
        //birthDate: faker.date.birthdate(),
        //phone: faker.phone.number(),
        //image: faker.image.avatar(),
        //Id: faker.database.mongodbObjectId(),
        //email: faker.internet.email(),
        //products
    //}
//}

//router.get('/users', (req, res)=>{
    //let users = []
    //for (let i = 0; i < 100; i++) {
        //users.push(generateUser)
        
    //}
    //res.send({
        //status:'success',
        //payload: users
    //})
//})


// artillery quick --count 40 -- num 50 "http://localhost8080/pruebas/simple" -o simple.json
// artillery quick --count 40 --num 50 "http://localhost:8080/pruebas/compleja" -o compleja.json
// artillery run config.yml -- output testPerformance.json
// artillery report testPerformance.json -o testResults.html
router.get('/simple', (req, res)=>{
    let sum = 0
    for(let i = 0; i < 1000000; i++){
        sum += i
    }
    res.send(`La suma es ${sum}`)
})

function operacionCompleja(){
    let result = 0
    for (let i = 0; i< 7e9; i++) {
        result += i  
    }
    return result
}

router.get('/block', (req, res)=>{
    const result = operacionCompleja()
    res.send(`El resultado es: ${result}`)
})

router.get('/noblock', (req, res)=>{
    const child = fork('./src/routes/operacionCompleja.js')
    child.send('iniciar calculo')
    child.on('message', data =>{
        res.send(`El resultado es: ${data}`)
    })
    
})

//router.get('/sendsms', (req, res)=>{
    //sendSMS(`Bienvenido`, {first_name:'Juan',last_name:'Otero', phone: '+541132112158'})
    //res.send('SMS ENVIADO')
//})

//router.get('/sendmail', (req, res)=>{
    //const user = {
        //email:'coderjuanse@gmail.com',
        //first_name: 'Juan',
        //last_name: 'Otero',
    //}

    //LLAMARA UNA FUNCION//
    //const to = user.email
    //const subject = 'Esto es un mail de prueba'
    //const html = 
    //`<div>
    //<h1>Bienvenido a prueba de email ${user.first_name} ${user.last_name}</h1>
    //</div>`
    //sendMail(to, subject, html)
    //res.send('Mail enviado')
//})

// EXPRESIONES REGULARES UTF-8 Ñ O EL ACENTO Á -> %C3%A1 / É-> %C3%A9 / Ú -> %C3%BC
//router.param('palabra', async (req, res, next, palabra )=>{
   // console.log(palabra)
    //let palabraFound = ['fede', 'juan', 'lucas'].includes(palabra)
    //console.log(palabraFound)
    //if(!palabraFound){
      //  req.word = 'no se encuentra'
    //}else{
      //  req.word = 'encontrada'
    //}
    //next()
//})
//router.get('/:palabra([a-zA-Z%C3%A1%C3%A9%C3%BC]+)',(req,res)=>{
   // console.log(req.params)
   // res.send(req.word)
//})

module.exports = router