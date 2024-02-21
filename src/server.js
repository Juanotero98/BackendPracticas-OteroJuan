const express = require('express')
const handlebars = require('express-handlebars')
const {Server} = require('socket.io')
const {connect} = require('mongoose')
const cookieParser = require('cookie-parser')
const appRouter = require('./routes/index.js')
const viewsRouter = require ('./routes/views.router.js')
//COOKIE//
const {connectDb, configObject} = require ('./config/config.js')

//PASSPORT//
const passport = require ('passport')
const { initializePassport } = require('./config/passport.config.js')
const UserRouterCustom = require('./routes/userClass.router.js')
const cors = require('cors')

 
const app = express()
const PORT = configObject.PORT
//const UserRouterCustom = new UserRouterCustom()


app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname + '/public'));
app.use(cookieParser('p@l@br@secret@'))
app.use(cors())

//STRATEGIA MEMORIA SESSION//
//app.use(session({
//    secret: 'secretCoder',
//    resave: true,
//    saveUninitialized: true
//}))

//ESTRATEGIA MEMORIA SESSION//
//const fileStore = new FileStore(session)
//app.use(session({
//    store: new fileStore({
//        path:'./sessions',
//        ttl: 100,
//        retire: 0
//    }),
//    secret: 'secretCoder',
//    resave: true,
//   saveUninitialized: true
//}))

//ESTRATEGIA MONGO SESSION//



// middlewars de passport//
initializePassport()
app.use(passport.initialize())


//MOTOR DE HANDLEBAR//
app.engine('hbs', handlebars.engine({
    textname: '.hbs'
}))
app.set('view engine', 'hbs')
app.set('views', __dirname + '/views')
connectDb()


app.use(appRouter)

app.use('/views', viewsRouter)



const serverHttp = app.listen(8080, ()=>{
    console.log("Corriendo en http://localhost:8080")
})

//const socketProduct = (io)=>{}
const socketProduct = ()=>{req, res, next}
const socketServer = new Server(serverHttp)
let arrayMensajes = []
socketServer.on('connection', socket => {
    console.log('Nuevo cliente conectado')

    socket.on('recibirMensajeCliente', data => {
        console.log(data)
    })
    socket.emit('solo-para-el-actual', 'Este lo debe recibir solo el socket actual')

    socket.broadcast.emit('para-todos-menos-actual', 'Este evento lo verna todos los conectados, menos el acutal')

    socketServer.emit('evento-para-todos', 'este mensaje lo reciben todos')

    
    socket.emit('enviar-mensajes-cliente', arrayMensajes)

    socket.on('message', mensajes =>{
        console.log(mensajes)
       arrayMensajes.push({id: socket.id, message: mensajes})
      socketServer.emit('mensaje-recibido-cliente', arrayMensajes)
    })

})