const { Router } = require('express')
const { usersModel } = require('../dao/Mongo/models/users.models')
const UserDaoMongo = require('../dao/Mongo/userDaoMongo')

const router = Router()
const userService = new UserDaoMongo()
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
// GET localhost:8080 /api/users /
router.get('/', async (req, res) => {
    try {
        const users = await userService.getUsers();
        res.send(users);
    } catch (error) {
        console.error(error);
        
        res.status(500).send({
            status: 'error',
            message: 'Error al procesar la solicitud',
            error: error.message
        });
    }
});

// POST localhost:8080  /api/users /
router.post('/', async (req, res) => {
    try {
        const { first_name, last_name, email } = req.body;
        const result = await userService.createUser({
            first_name,
            last_name,
            email
        });

        console.log(first_name, last_name, email);
        res.status(201).send({
            status: 'success',
            payload: result  
        });
    } catch (error) {
        console.log(error);
        
        res.status(500).send({
            status: 'error',
            message: 'Error al procesar la solicitud',
            error: error.message
        });
    }
});

// PUT localhost:8080  /api/users /:uid
router.put('/:uid', async (req, res) => {
    try {
        const { uid } = req.params;
        const userToReplace = req.body;
        if (!uid) {
            return res.status(400).send({
                status: 'error',
                message: 'ID de usuario no proporcionado'
            });
        }
        const result = await usersModel.updateOne({_id:uid}, userToReplace, { new: true });
        if (!result) {
            return res.status(404).send({
                status: 'error',
                message: 'Usuario no encontrado'
            });
        }
        res.status(200).send({
            status: 'success',
            payload: result
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            status: 'error',
            message: 'Error al procesar la solicitud',
            error: error.message
        });
    }
});

// DELETE localhost:8080  /api/users /:uid
router.delete('/:uid', async (req, res) => {
    try {
        const { uid } = req.params;
        if (!uid) {
            return res.status(400).send({
                status: 'error',
                message: 'ID de usuario no proporcionado'
            });
        }
        const result = await usersModel.findByIdAndDelete(uid);
        if (!result) {
            return res.status(404).send({
                status: 'error',
                message: 'Usuario no encontrado'
            });
        }
        res.status(200).send({
            status: 'success',
            payload: result
        });
    } catch (error) {
        console.error(error);
       
        res.status(500).send({
            status: 'error',
            message: 'Error al procesar la solicitud',
            error: error.message
        });
    }
});

module.exports = router