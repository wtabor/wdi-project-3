var express = require('express');
var router = express.Router();

var User = require('../models/user');

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

// INDEX
router.get('/', authenticate, function(req, res, next) {
    var user = global.currentUser.users;
    res.render('users/index', { users: users, message: req.flash() });
});


// SHOW
router.get('/:id', authenticate, function(req, res, next) {
    var user = currentUser.users.id(req.params.id);
    if (!user) return next(makeError(res, 'Document not found', 404));
    res.render('users/show', { user: user, message: req.flash() });
});

// EDIT
router.get('/:id/edit', authenticate, function(req, res, next) {
    var user = currentUser.users.id(req.params.id);
    if (!user) return next(makeError(res, 'Document not found', 404));
    res.render('user/edit', { user: user, message: req.flash() });
});

// UPDATE
router.put('/:id', authenticate, function(req, res, next) {
    var user = currentUser.users.id(req.params.id);
    if (!user) return next(makeError(res, 'Document not found', 404));
    else {
        user.userTheme = req.body.userTheme;
        currentUser.save()
            .then(function(saved) {
                res.redirect('/users');
            }, function(err) {
                return next(err);
            });
    }
});

// DESTROY
router.delete('/:id', authenticate, function(req, res, next) {
    var user = currentUser.users.id(req.params.id);
    if (!user) return next(makeError(res, 'Document not found', 404));
    var index = currentUser.users.indexOf(user);
    currentUser.users.splice(index, 1);
    currentUser.save()
        .then(function(saved) {
            res.redirect('/users');
        }, function(err) {
            return next(err);
        });
});

module.exports = router;






