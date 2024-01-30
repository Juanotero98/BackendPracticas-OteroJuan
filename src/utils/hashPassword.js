const bcrypt = require ('bcrypt')


exports.createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

//password de login - password de bd - retorna true o false 
exports.isValidPassword = (password, user)=> bcrypt.compareSync(password, user.password)

//bcryptjs