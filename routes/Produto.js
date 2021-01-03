//cSpell:Ignore Produto, Apaga, possível, Editar, arroz, removido, único, informado, sucesso, produtos, determinado, descricao, pelo, pela, salvar, Lista, preco, preço, codigobarras, codigobarra, válido, código, ordena, Insere, barras, obter, todos, coluna, Erro, Informe, formato
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

/**
 * Lista um único produto pelo ID
 */
router.get("/:id", async(req, res) =>{
    await Produto.findById(req.params.id).then(produto =>{
        res.send(produto)
    }).catch(err => {
        return res.status(400).send({
            message: `Erro ao obter o produto com o id ${req.params.id}`
        })
    })
})

/**
 * Apaga um determinado produto pelo id
 */
router.delete("/:id", async(req, res) => {
    await Produto.findByIdAndRemove(req.params.id).then(produto =>{
        res.send({message: 'Produto removido com sucesso!'})
    }).catch(err =>{
        return res.status(400).send({
            message: `Não foi possível remover o produto com o id ${req.params.id}`
        })
    })
})

/**
 * Editar o produto informado
 */
router.put("/",[
    check("nome", "Informe o nome do produto!").not().isEmpty(),
    check("codigobarra","Informe um código de barras no formato EAN13!").isNumeric().isLength({min: 13, max:13}),
    check("preco", "Informe um preço válido!").isFloat({min:0})
], async(req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        })
    }
    //update produtos set nome = 'arroz', preco = '29.90', codigobarra='123' where id = 123
    let dados = req.body
    await Produto.findByIdAndUpdate(req.body._id,{
        $set: dados
    },{new: true}, function(err, result){
        if(err){
            res.send(err)
        }else{
            res.send(result)
        }
    })
})

module.exports = router