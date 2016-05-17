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



function authorize(req, res, next) {
  if (currentUser) {
    next();
  } else {
    res.redirect('/');
  }
}
