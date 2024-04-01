const {Router} = require('express')
const {fork} = require ('node:child_process')
const { sendMail } = require('../utils/sendMail')
const { sendSMS } = require('../utils/sendSMS')

const router = Router()
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

router.get('/sendsms', (req, res)=>{
    sendSMS(`Bienvenido`, {first_name:'Juan',last_name:'Otero', phone: '+541132112158'})
    res.send('SMS ENVIADO')
})

router.get('/sendmail', (req, res)=>{
    const user = {
        email:'coderjuanse@gmail.com',
        first_name: 'Juan',
        last_name: 'Otero',
    }
    //LLAMARA UNA FUNCION//
    const to = user.email
    const subject = 'Esto es un mail de prueba'
    const html = 
    `<div>
    <h1>Bienvenido a prueba de email ${user.first_name} ${user.last_name}</h1>
    </div>`
    sendMail(to, subject, html)
    res.send('Mail enviado')
})

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