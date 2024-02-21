const {Command} = require ('commander')

const program = new Command()

program
.option('-d', 'Variables para debug', false)
.option('-p <port>', 'puerto del servidor', 4000)
.option('-u <user>', 'usuario del proceso')
.option('--mode <mode>', 'especifica el entorno de ejecucion de nuestro server', 'development') // development, testing, production
.option('-l, --letter [letter...]', 'specify letter') // modo de entorno 

program.parse()

console.log('option:', program.opts())
console.log('Argument: ', program.args)