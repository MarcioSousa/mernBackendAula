//cSpell:Ignore UsuarioSchema, cliente, digitador, usuario, alteradoEm, criadoEm, administrador, usuário, ativo, senha, muito, curto, longo, maxlength, obrigatório
const mongoose = require('mongoose')

const UsuarioSchema = mongoose.Schema({
    nome:{
        type: String,
        minlength:[2, 'O nome do usuário é muito curto!'],
        maxlength:[30, 'O nome do usuário é muito longo!'],
        required: [true, 'O nome do usuário é obrigatório!']
    },
    senha:{
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: false
    },
    ativo: {
        type: Boolean,
        default: true
    },
    tipo: {
        type: String,
        enum:['administrador', 'cliente', 'digitador'],
        default: 'cliente'
    },
    email: {
        type: String,
        unique: true
    }
},{
    timestamps: {createdAt: 'criadoEm', updateAt: 'alteradoEm'}
})

module.exports = mongoose.model('usuario', UsuarioSchema)