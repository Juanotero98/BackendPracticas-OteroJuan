const UserDaoMongo = require ('../dao/Mongo/userDaoMongo')
const { UserDto } = require('../dtos/usersDto')
const {usersService} = require ('../repositories/services.js')


class UserController {
    constructor(){
        this.userService = usersService
        
    }
     getUsers = async(req, res)=>{
        try {
            //const users = await usersModel.find({}).limit(50)// 5000 -> 100
            const users = await this.userService.get()
            res.send(users)
            
        } catch (error) {
            console.log(error)
        }
    }
    
     createUser = async (req, res) => {
        try {
            const { first_name, last_name, email, password } = req.body;

            const newUser = {first_name, last_name, password, email}
            console.log(newUser)
            //const result = await this.userService.create(newUser);
    
            
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
    }
    
     updateUser = async (req, res) => {
        try {
            const { uid } = req.params;
            const userToReplace = req.body;
            if (!uid) {
                return res.status(400).send({
                    status: 'error',
                    message: 'ID de usuario no proporcionado'
                });
            }
            const result = await this.userService.update({_id:uid}, userToReplace, { new: true });
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
    }
    
     deleteUser = async (req, res) => {
        try {
            const { uid } = req.params;
            if (!uid) {
                return res.status(400).send({
                    status: 'error',
                    message: 'ID de usuario no proporcionado'
                });
            }
            const result = await this.usersService.delete(uid);
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
    }
}


module.exports = UserController