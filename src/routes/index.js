const {Router} = require ('express')
const productsRouter = require('./products.router.js')
const usersRouter = require('./users.router.js')
const viewsRouter = require('./views.router.js')
const cartsRouter = require('./carts.router.js')
const sessionsRouter = require('./sessions.router.js')
const pruebasRouter = require('./pruebas.router.js')

const router = Router()

router.use('/api/products', productsRouter)
router.use('/api/carts', cartsRouter)
//router.use('/api/users', UserRouterCustom.getRouter())
router.use('/api/users', usersRouter)
router.use('/', viewsRouter)
router.use('/api/sessions', sessionsRouter)
router.use('/pruebas', pruebasRouter)

router.use('*', (req, res)=>{
    res.status(404).send('not found')
})

module.exports = router 