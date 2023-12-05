const {Router} = require ('express')

const router = Router()

const productMock = [
    {id: '1',title: 'Producto 1', precio: 1500, stock: 100, descripcion: 'Esto es un producto'},
    {id: '2',title: 'Producto 2', precio: 1500, stock: 100, descripcion: 'Esto es un producto'},
    {id: '3',title: 'Producto 3', precio: 1500, stock: 100, descripcion: 'Esto es un producto'},
]

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


    res.render('products', {
        title: userMock.title,
        name: userMock.name,
        isAdmin: userMock.role == 'admin',
        products: productMock,
        style:"products.css"
    })
})

module.exports = router