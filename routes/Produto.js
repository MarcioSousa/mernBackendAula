//cSpell:Ignore Produto, produtos, descricao, pela, salvar, Lista, preco, preço, codigobarras, codigobarra, válido, código, ordena, Insere, barras, obter, todos, coluna, Erro, Informe, formato
const Produto = require('../model/Produto')
const express = require('express')
const router = express.Router()
const {check, validationResult} = require('express-validator')

/**Lista todos os produtos
 * localhost:4000/produtos
 */
router.get("/", async(req, res) =>{
    try{
        //Select * from produtos e ordena pela coluna nome
        const produtos = await Produto.find().sort({nome:1})
        res.json(produtos)
    }catch(e){
        res.send({error: `Erro ao obter os dados dos produtos: ${e.message}`})
    }
})

/**
 * Insere um novo produto
 */
router.post("/", [
    check("nome", "Informe o nome do produto!").not().isEmpty(),
    check("codigobarra","Informe um código de barras no formato EAN13!").isNumeric().isLength({min: 13, max:13}),
    check("preco", "Informe um preço válido!").isFloat({min:0})
], async(req, res) =>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    const {nome, descricao, codigobarra, preco} = req.body
    try{
        let produto = new Produto({nome, descricao, codigobarra, preco})
        await produto.save()
        res.send(produto)
    }catch(err){
        return res.status(500).json({
            errors: `Erro ao salvar o produto: ${err.message}`
        })
    }
})



module.exports = router