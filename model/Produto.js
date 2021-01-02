//cSpell:Ignore ProdutoSchema, descricao, codigobarra, preco, Produtos
const mongoose = require('mongoose')
const ProdutoSchema = mongoose.Schema({
    nome:{
        type: String, 
        require: true
    },
    descricao:{
        type: String,
        require: false
    },
    codigobarra:{
        type: String,
        require: true
    },
    preco:{
        type: Number,
        require: true
    }
},{timestamps: true})

module.exports = mongoose.model('Produtos', ProdutoSchema)