const { usersModel } = require("./models/users.models")

class UserDaoMongo  {
    constructor(){
        this.model = usersModel

    }

    getUsersPaginate = async (limit, page=1)=> await this.userModel.paginate({},{limit, page, lean: true})
    
    async getUsers(){
        try {
            return await this.usersModel.find({})
        } catch (error) {
            console.log(error)
        }
    }
    async getUser(filter){
        return await this.usersModel.findeOne(filter)
    }
    async createUser(newUser){
        return await this.model.create(newUser)
    }
    updateUser = async (uid, userUpdate) => await this.usersModel.findeOneandUpdate({_id: uid}, userUpdate)

    deleteUser = async(uid) => await this.usersModel.findeOneandDelete({_id:uid})

}

module.exports = UserDaoMongo