const Contato = require('../models/ContactModel')

exports.index = (req, res, next) => {
    res.render('registerContact', { contato: {} })
}

exports.register = async (req, res, next) => {
    try {
        const contato = new Contato(req.body);
        await contato.register();

        if (contato.errors.length > 0) {
            req.flash('errors', contato.errors);
            req.session.save(() => res.redirect('back'))
            return
        }

        req.flash('success', 'Usuário registrado com sucesso');
        req.session.save(() => res.redirect(`contato/${contato.contato._id}`))
        return
    } catch (e) {
        console.log(e)
        return res.render('error')
    }
}

exports.edit = async (req, res, next) => {
    try {
        const user = new Contato()
        if (!req.params.id) return res.render('error')

        const contato = await user.buscaPorId(req.params.id)
        if (!contato) return res.render('error')
        res.render('editContact', { contato })
    } catch (e) {
        console.log(e)
        return res.render('error')
    }
}

exports.editPost = async (req, res, next) => {
    try {
        const contato = new Contato(req.body)
        if (!req.params.id) return res.render('error')

        await contato.edit(req.params.id)

        if (contato.errors.length > 0) {
            req.flash('errors', contato.errors);
            req.session.save(() => res.redirect('back'))
            return
        }

        req.flash('success', 'Usuário editado com sucesso');
        req.session.save(() => res.redirect(`contato/${contato.contato._id}`))
        return;
    } catch (e) {
        console.log(e)
        return res.render('error')
    }
}

exports.delete = async (req, res, next) => {
    try {
        const user = new Contato()
        if (!req.params.id) return res.render('error')

        const contato = await user.delete(req.params.id)
        if (!contato) return res.render('error')
        req.session.save(() => res.redirect('back'))
    } catch (e) {
        console.log(e)
        return res.render('error')
    }
}