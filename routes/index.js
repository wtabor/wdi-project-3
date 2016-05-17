var express = require('express');
var router = express.Router();
var passport = require('passport');

// GET Homepage
router.get('/', function(req, res, next) {
    var myTitle = "Welcome-m";
    res.render('index', { title: myTitle, message: req.flash() }); // add the message
});

// GET /signup
router.get('/signup', function(req, res, next) {
    var myTitle = "Signup-m";
    res.render('signup.ejs', { title: myTitle, message: req.flash() });
});

// POST /signup
router.post('/signup', function(req, res, next) {
    var signUpStrategy = passport.authenticate('local-signup', {
        successRedirect: '/',
        failureRedirect: '/signup',
        failureFlash: true
    });
    return signUpStrategy(req, res, next);
});

// GET /about
router.get('/about', function(req, res, next) {
    var myTitle = "About-m";
    res.render('about.ejs', {title: myTitle, message: req.flash() });
});


// GET /login
router.get('/login', function(req, res, next) {
    var myTitle = "Login-m";
    res.render('login.ejs', {title: myTitle, message: req.flash() });
});

// POST /login
router.post('/login', function(req, res, next) {
    var loginProperty = passport.authenticate('local-login', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    });
    return loginProperty(req, res, next);
});

// GET /logout
router.get('/logout', function(req, res, next) {
    req.logout();
    res.redirect('/');
});

// Restricted page
// router.get('/secret', function(req, res, next) {
//     if (currentUser) {
//         res.render('secret.ejs');
//     } else {
//         res.redirect('/');
//     }
// });



module.exports = router;
