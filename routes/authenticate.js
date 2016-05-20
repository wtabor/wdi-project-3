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



function authorized (req, res, next) {
  if (currentUser) {
    next();
  } else {
    res.redirect('/');
  }
}
