//=================================================
//AUTHENTICATION
//=================================================
function authenticate(req, res, next) {
    if (!req.isAuthenticated()) {
        res.redirect('/');
    } else {
        next();
    }
}

module.exports = authenticate;
