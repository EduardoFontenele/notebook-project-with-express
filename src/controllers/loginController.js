exports.index = (req, res, next) => {
    res.render('index');
}
const Login = require('../models/LoginModel');

exports.register = async (req, res, next) => {
    try {
        const login = new Login(req.body);
        await login.register();

        if(login.errors.length > 0) {
            req.flash('errors', login.errors);
            req.session.save(() => {
               return res.redirect('back');
            })
            return
        }
        
        req.flash('success', 'Usuário cadastrado com sucesso');
        req.session.save(() => {
        return res.redirect('back');
    })
    } catch(e) {
        console.log(e);
    }
}

exports.login = async(req, res, next) => {
    
}