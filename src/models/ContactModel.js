const mongoose = require('mongoose')
const validator = require('validator')

const ContatoSchema = new mongoose.Schema({
    nome: { required: true, type: String },
    email: { required: false, type: String, default: '' },
    numero: { required: false, type: String, default: '' },
    cidade: { required: false, type: String, default: '' },
    criadoEm: {type: Date, default: Date.now}
})

const ContatoModel = mongoose.model('contatos', ContatoSchema)

class Contato {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.contato = null;
    }

    async register() {
        this.validate()
        
        if(this.errors.length > 0) return

        this.contato = await ContatoModel.create(this.body)
    }

    validate() {
        this.cleanUp()

        if (this.body.email && !validator.isEmail(this.body.email)) {
            this.errors.push('E-mail inválido')
        }

        if(!this.body.nome) {
            this.errors.push('É necessário enviar o nome do contato')
        }

        if(!this.body.email && !this.body.numero) {
            this.errors.push('Pelo menos um meio de contato é necessário (e-mail ou telefone)')
        }
    }

    cleanUp() {
        for (let key in this.body) {
            if (typeof this.body[key] !== 'string') {
                this.body[key] = '';
            }
        }

        this.body = {
            nome: this.body.nome,
            email: this.body.email,
            numero: this.body.numero,
            cidade: this.body.cidade,
        }
    }
}

module.exports = Contato