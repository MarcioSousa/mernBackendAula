//cSpell:Ignore informe, senha, mínimo, administrador, cliente, caracteres, Usuario, digitador, válido, Padrão, usuário 
const express = require('express')
const {check, validationResult} = require('express-validator')
const router = express.Router()
const Usuario = require('../model/Usuario')

/** URL Padrão: localhost:3000/usuario */
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
})