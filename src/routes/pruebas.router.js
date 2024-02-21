const {Router} = require('express')
const {fork} = require ('node:child_process')
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