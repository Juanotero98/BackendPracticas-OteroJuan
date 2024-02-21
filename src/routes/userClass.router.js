const RouterCustom = require ('../routes/router.js')

class UsersRouter extends RouterCustom{
    init(){
        this.get('/',['ADMIN'],async (req, res)=>{
            try {

                const users = 'users' // userModel.find()
                if(!users) return res.sendUserError('user not found')
                res.sendSuccess(users)
                
            } catch (error) {
                res.sendServerError(error)
            }
        })
        this.post('/', ['ADMIN'],(req,res)=>{
            const result = 'user create'
            res.sendSuccess(result)
        })
        this.put('/:pid', (req,res)=>{
            res.send('put users')
        })
        this.delete('/:pid', (req, res)=>{
            res.send('delete users')
        })
    }
}

module.exports = UsersRouter 