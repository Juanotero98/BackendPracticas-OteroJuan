const {Router} = require ('express')
const { uploader } = require('../helpers/uploaders')
const { usersModel } = require('../dao/Mongo/models/users.models')
const { authentication } = require('../middlewares/auth.middlewares.js')

const router = Router()
router.use('/', (req,res)=>{
    res.render('index.hbs', {
        username: 'Juanse'
    })
})

router.post('/uploader', uploader.single('myFile'),(req, res)=>{
    res.send('imagen subida')
})


router.get('/users', authentication, async (req, res)=>{
    const {numPage=1, limit=10} = req.query
    const {
        docs,
        hasPrevPage,
        hasNextPage,
        prevPage,
        nextPage,
        page
    } = await usersModel.paginate({}, {limit, page: numPage, sort: {first_name:1}, lean: true})

    res.render('users',{
        users: docs,
        hasNextPage,
        hasPrevPage,
        prevPage,
        nextPage,
        page
    })
})

router.get('/register', async (req, res)=>{
    res.send('register')
})

router.get('/login', async (req, res)=>{
    res.send('login')
})

router.get('/', (req, res)=>{
    res.render('index', {
        title: "Mercado Juan",
        name: "Juan el mejor",
        style:"index.css"
    })
})

router.get('/products', (req, res)=>{
    const userMock={
        title: "Mercado Juan",
        name: "Juan el mejor",
        role: "admin"
    }

    const productService = new ProductDaoMongo()
    const products = productService.getProducts() 


    res.render('products', {
        title: userMock.title,
        name: userMock.name,
        isAdmin: userMock.role == 'admin',
        products,
        style:"products.css"
    })
})

module.exports = router