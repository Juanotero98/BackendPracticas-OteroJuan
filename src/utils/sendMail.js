const nodemailer = require ('nodemailer')
const {configObject} = require ('../config')

const trasnport = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth:{
        user: configObject.gmail_user_app,
        password: configObject.gmail_password_app
    }
})

exports.sendMail = async (destinatario, subject, html) => {
    return await trasnport.sendMail({
        from: 'Este mail lo envia <coderjuanse@gmail.com>',
        to: destinatario ,
        subject,
        html,
        attachments:[{
            filename:'Nodejs.png',
            path:__dirname + '/Nodejs.png',
            cid:'node'
        }]
    })
}