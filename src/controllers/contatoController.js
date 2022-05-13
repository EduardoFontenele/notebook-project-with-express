const Contato = require('../models/ContactModel')

exports.index = (req, res, next) => {
    res.render('registerContact')
}

exports.register = async (req, res, next) => {
    try {
        const contato = new Contato(req.body);
        contato.register();
        
        if(contato.errors.length > 0) {
            req.flash('errors', contato.errors);
            req.session.save(() => res.redirect('back'))
            return
        }
    
        req.flash('success', 'Usuário registrado com sucesso');
        req.session.save(() => res.redirect('back'))
        return 
    } catch(e) {
        console.log(e)
        return res.render('error')
    }
}