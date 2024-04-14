const winston =  require ('winston');

//PRIMER EJEPLO
//const logger = winston.creaateLogger({
    //transports: [
        //new winston.transports.Console({ level: 'http'}),
        //new winston.transports.File({filename:'./errors.log', level:'warn'})
    //]
//})

const customLevelsOptions = {
    Levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info:3,
        debug:4,
        http:5,
    },
    Colors: {
        fatal: 'red',
        error: 'yellow',
        warning: 'yellow',
        info:'blue',
        debug:'white',
    }
}

const logger = winston.createLogger({
    levels: customLevelsOptions.levels,
    transports: [
        new winston.transports.Console({
            level: 'info',
            format:winston.format.combine(
                winston.format.colorize({colors: customLevelsOptions.colors}),
                winston.format.simple()
            )
        }),
        new winston.transports.File({
            filename: './errors.log',
            level: 'warning',
            format: winston.format.simple()
        })
    ]
})

//MIDDLEWARE PARA MOSTRAR POR CONSOLA LOS LOGS DE CONSULTAS HTTP//
const addLogger = (req, res, next) => {
    req.logger = logger
    //req.logger.http(`${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`)
    req.logger.info(`${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`)
    next()
}

module.exports = {
    addLogger,
    logger
}