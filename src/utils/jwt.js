const jwt = require ('jsonwebtoken')

const JWT_PRIVATE_KEY = "CoderSecretoJsonWebToken"

const createToken = user => jwt.sign(user, JWT_PRIVATE_KEY, {expiresIn:'24h'})
    

const authenticationToken = (rq, res, next) => {
    const authHeader = req.headers['Authorization']
    console.log (authHeader)
    if (!authHeader) res.status(401).json({status: 'error', error: 'not authenticated'})

    // Bearer kljasfgagiahklfkdfguiohkfnfnkljsdjgiklakj -> split -> ['Bearer', 'asfaefaudyfgaku']
    const token = authHeader.split(' ')[1]
    jwt.verify(token, JWT_PRIVATE_KEY, (error, userDecode)=> {
        if(error) return res.status(401).json({status: 'error', error: 'not authorized'})
        console.log(userDecode)
       
       // req.user = userDecode

    })
}

module.exports = {
    createToken,
    authenticationToken,
    JWT_PRIVATE_KEY
}