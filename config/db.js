// cSpell:Ignore Conexão, MONGOURI, conectar, possível, Conectado, criação, novos, servidores, padrão, descoberta, permite, utiliza, InicializaMongoServer

const mongoose = require('mongoose')
//String de Conexão
const MONGOURI = process.env.MONGODB_URL

const InicializaMongoServer = async() => {
    try{
        await mongoose.connect(MONGOURI, {
            useNewUrlParser: true, //utiliza o novo parser do mongo
            useCreateIndex: true,  //permite a criação de índices
            useFindAndModify: false,  //Por padrão utiliza o 'findOneAndUpdate'
            useUnifiedTopology: true //Permite a descoberta de novos servidores
        })
        console.log('⚡ Conectado ao MongoDB!')
    }catch(e){
        console.log('Não foi possível conectar ao MongoDB')
        console.error(e)
        throw e
    }
}

module.exports = InicializaMongoServer