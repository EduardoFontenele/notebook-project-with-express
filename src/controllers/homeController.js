const Contato = require('../models/ContactModel')

exports.index = async (req, res, next) => {
    if(!req.session.user) {
        return res.redirect('/login')
    }
    const contato = new Contato()
    const contatos = await contato.buscaContatos()
    res.render('index', { contatos })
}