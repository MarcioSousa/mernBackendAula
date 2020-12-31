// cSpell:Ignore porta, versao, Servidor, funcional, iniciado, mensagem
require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')

const app = express()

//porta default
const PORT = process.env.PORT || 4000

app.get('/', (req, res) =>{
    res.json({mensagem: 'API 100% funcional!',
            versao: '1.0.0'})
})

app.listen(PORT, (req, res) => {
    console.log(`🖥️  Servidor iniciado na porta ${PORT}`)
})