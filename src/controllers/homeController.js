exports.index = (req, res, next) => {
    if(!req.session.user) {
        return res.redirect('/login')
    }
    res.render('index')
}