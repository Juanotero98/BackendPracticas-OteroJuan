function authentication (req,res,next){

 if(!req.session?.user?.admin ){
    return res.status(401).send('error de autenticacion')
 }
 next()

}

module.exports = {
    authentication
}