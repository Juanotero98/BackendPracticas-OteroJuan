const UserDaoMongo = require ('../dao/Mongo/userDaoMongo')

class UserController {
    constructor(){
        this.userService = new UserDaoMongo()
    }
     getUsers = async(req, res)=>{
        try {
            //const users = await usersModel.find({}).limit(50)// 5000 -> 100
            const users = await this.userService.getUsers()
            res.send(users)
            
        } catch (error) {
            console.log(error)
        }
    }
    
     createUser = async (req, res) => {
        try {
            const { first_name, last_name, email } = req.body;
            const result = await this.userService.createUser({
                first_name,
                last_name,
                email
            });
    
            
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
            const result = await this.userService.updateUser({_id:uid}, userToReplace, { new: true });
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
            const result = await this.usersService.deleteUser(uid);
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