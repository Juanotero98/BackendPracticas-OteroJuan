const express = require('express')
const handlebars = require('express-handlebars')
const productsRouter = require('./routes/products.router.js')
const viewsRouter = require('./routes/views.router.js')
const cartsRouter = require('./routes/carts.router.js')
const {Server} = require('socket.io')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname + '/public'));
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)

//MOTOR DE HANDLEBAR//
app.engine('hbs', handlebars.engine({
    extname: '.hbs'
}))
app.set('view engine', 'hbs')
app.set('views', __dirname + '/views')

app.use('/views', viewsRouter)



const serverHttp = app.listen(8080, ()=>{
    console.log("Corriendo en http://localhost:8080")
})

const socketServer = new Server(serverHttp)
let arrayMensajes = []
socketServer.on('connection', socket => {
    console.log('Nuevo cliente conectado')

    //socket.on('recibirMensajeCliente', data => {
    //    console.log(data)
    //})
    //socket.emit('solo-para-el-actual', 'Este lo debe recibir solo el socket actual')

    //socket.broadcast.emit('para-todos-menos-actual', 'Este evento lo verna todos los conectados, menos el acutal')

    //socketServer.emit('evento-para-todos', 'este mensaje lo reciben todos')

    
    //socket.emit('enviar-mensajes-cliente', arrayMensajes)

    //socket.on('message', mensajes =>{
        //console.log(mensajes)
      // arrayMensajes.push({id: socket.id, message: mensajes})
      //socketServer.emit('mensaje-recibido-cliente', arrayMensajes)
    //})

})