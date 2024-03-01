const { usersModel } = require("./models/users.models")

class UserDaoMongo  {
    constructor(){
        this.model = usersModel

    }

    //getUsersPaginate = async (limit, page)=> await this.userModel.paginate({},{limit, page, lean: true})
    
    get = async _ => await this.usersModel.find({})

    getBy = async (filter) => await this.usersModel.findOne(filter)

    create = async (newUser)=> await this.usersModel.create(newUser)

    update = async (uid, userUpdate) => await this.usersModel.findeOneandUpdate({_id: uid}, userUpdate)

    delete = async(uid) => await this.usersModel.findeOneandDelete({_id:uid})

}

module.exports = UserDaoMongo