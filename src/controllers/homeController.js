exports.index = (req, res, next) => {
    res.render('index')
}

exports.handlePost = (req, res, next) => {
    res.send(req.body)
}