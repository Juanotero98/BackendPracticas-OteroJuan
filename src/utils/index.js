const { connect } = require("mongoose")


exports.connectDb = async ()=>{
    await connect('mongodb+srv://JuanseOtero:Juan0301@cluster0.x36rdg6.mongodb.net/c55625?retryWrites=true&w=majority')
    //await connect('mongodb://localhost:27017/c55625')
    
}
connectDb()