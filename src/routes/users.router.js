const { Router } = require('express')
const { usersModel } = require('../dao/Mongo/models/users.models')
const UserController = require('../controllers/users.controller')

const router = Router()
const {
    getUsers,
    createUser,
    updateUser,
    deleteUser

} = new UserController()

const arrayUsuarios = [
    {id:1, nombre:'Nombre 1', apellido:'Apellido 1', genero: 'F'},
    {id:2, nombre:'Nombre 2', apellido:'Apellido 2', genero: 'F'},
    {id:3, nombre:'Nombre 3', apellido:'Apellido 3', genero: 'M'},
    {id:4, nombre:'Nombre 4', apellido:'Apellido 4', genero: 'F'},
    {id:5, nombre:'Nombre 5', apellido:'Apellido 5', genero: 'M'},
    {id:6, nombre:'Nombre 6', apellido:'Apellido 6', genero: 'M'},
    {id:7, nombre:'Nombre 7', apellido:'Apellido 7', genero: 'F'},
    {id:8, nombre:'Nombre 8', apellido:'Apellido 8', genero: 'M'},
]

// configuración 
// const userManager = new userManagerDaoMongo()
router.get('/', getUsers)

// GET localhost:8080 /api/users /
//router.get('/', async (req, res) => {
//    try {
//        const users = await userService.getUsers();
//        res.send(users);
//    } catch (error) {
//        console.error(error);
//        
//        res.status(500).send({
//            status: 'error',
//            message: 'Error al procesar la solicitud',
//            error: error.message
//        });
//    }
//});

// POST localhost:8080  /api/users /
router.post('/', createUser);

// PUT localhost:8080  /api/users /:uid
router.put('/:uid', updateUser);

// DELETE localhost:8080  /api/users /:uid
router.delete('/:uid', deleteUser);

module.exports = router