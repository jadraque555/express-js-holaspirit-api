
const authenticate = (req, res, next) => {
    if(req.session.isLoggedIn === false || !req.session.auth) {
        res.redirect('/');
    } else {
        next();
    }
}

module.exports = authenticate;