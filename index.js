// cSpell:Ignore porta, Métodos, Usuário, versao, Usuario, inicializamos, validação, inicializaMongoServer, Cabeçalhos, Servidor, serão, permitidos, produção, remova, Básico, funcional, iniciado, mensagem,informe
require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const inicializaMongoServer = require('./config/db')
const usuario = require('./routes/Usuario')

//inicializamos o servidor mongodb
inicializaMongoServer()

const app = express()

//porta default
const PORT = process.env.PORT || 3000

//middleware Básico
app.use(function(req, res, next){
    //Em produção, remova o * e informe a sua url
    res.setHeader('Access-Control-Allow-Origin','*')
    //Cabeçalhos que serão permitidos
    res.setHeader('Access-Control-Allow-Headers','Origin, X-Request-With, Content-Type, Accept, x-access-token')
    //Métodos que serão permitidos
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, PATCH, DELETE, OPTIONS')
    next()
})

//parse JSON (validação)
app.use(bodyParser.json())

app.get('/', (req, res) =>{
    res.json({mensagem: 'API 100% funcional!',
            versao: '1.0.0'})
})

/**Rotas do Usuário */
app.use('/usuario', usuario)

app.listen(PORT, (req, res) => {
    console.log(`🖥️  Servidor iniciado na porta ${PORT}`)
})
