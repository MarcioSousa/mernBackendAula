//cSpell:Ignore informe, senha, Ocorreu, erro, algum, repetir, único, mensagem, incluído, outro, sucesso, mínimo, existe, informado, funcionou, administrador, cliente, caracteres, Usuario, digitador, válido, Padrão, usuário 
const express = require('express')
const {check, validationResult} = require('express-validator')
const { modelNames } = require('mongoose')
const { restart } = require('nodemon')
const router = express.Router()
const Usuario = require('../model/Usuario')

/** URL Padrão: localhost:3000/usuario */

//router.get('/', (req, res) =>{
//    res.json({mensagem: 'usuario ok'})
//})

router.post('/',
[
    check('nome','Por favor informe o nome do usuário!').not().isEmpty(),
    check('email','Informe um email válido!').isEmail(),
    check('senha','Informe uma senha com no mínimo 6 caracteres!').isLength({min: 6}),
    check('tipo','Informe um tipo de usuário válido!').isIn(['administrador', 'cliente', 'digitador'])
],
async(req, res) =>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        })
    }

    //para fins de testes
    //let nome = req.body.nome
    //let tipo = req.body.tipo

    const {nome, email, senha, avatar, tipo} = req.body

    try{
        // Para o email não se repetir no banco de dados - Email único.
        let usuario = await Usuario.findOne({email})
        if(usuario){
            return res.status(400).json({
                mensagem: 'O email informado já existe em outro usuário!'
            })
        }

        usuario = new Usuario({nome, email, senha, avatar, tipo})
        await usuario.save()

        return res.json({'mensagem': 'usuário incluído com sucesso!'})

    }catch(err){
        return res.json({'mensagem':'Ocorreu algum erro!'})
    }

})

module.exports = router