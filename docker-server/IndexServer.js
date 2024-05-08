const express = require('express')
 
const app = express()

//const UserRouterCustom = new UserRouterCustom()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res)=>{
    res.send('hello docker')
})
app.get('/simple', (req, res)=>{
    let sum = 0
    for(let i = 0; i < 1000000; i++){
        sum += i
    }
    res.send(`La suma es ${sum}`)
})

app.get('/compleja', (req,res) =>{
    let sum = 0
    for (let i = 0; i < 4e8; i++){
        sum += i
    }
    res.send(`La suma es ${sum}`)
})
 

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

const PORT = 8080

 app.listen(PORT, err =>{
    if(err) logger.fatal(err)
    console.log(`Escuchando en el puerto ${PORT}`)
})



//const io = new Server(httpServer)

//let messagesArray = [] /// -> [{},{},{},] messageService.find()

//io.on('connection', socket=>{
    //logger.info('Nuevo cliente conectado')

    //socket.on('message', data =>{
       // messagesArray.push(data)// messageService.create(data)
        //io.emit('messageLogs', messagesArray)
    //})
//})