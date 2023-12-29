const { usersModel } = require("./models/users.models")

class UserDaoMongo  {
    constructor(){
        this.model = usersModel

    }
    async getUsers(){
        try {
            return await this.model.find({})
        } catch (error) {
            console.log(error)
        }
    }
    async getUser(uid){
        return await this.model.findeOne({_id: uid})
    }
    async createUser(newUser){
        return await this.model.create(newUser)
    }
    async updateUser(uid){}
    async deleteUser(uid){}

}

module.exports = UserDaoMongo