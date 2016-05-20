var express = require('express');
var router = express.Router();
var authenticate = require('./authenticate');
var User = require('../models/user');
var Prompt = require('../models/prompt');

// http://localhost:3000/users/index/



// INDEX
router.get('/index', authenticate, function(req, res, next) {
    var myuser = global.currentUser.user;
    var myTitle = "Users Home";
        console.log("USER TEST", myuser);
    res.render('users/index', { title: myTitle, users: myuser, message: req.flash() });
});


// SHOW
router.get('/:id', authenticate, function(req, res, next) {
    var myTitle = "User Show";

    User.find({ user: global.currentUser })
        .then(function(users) {
             Prompt.find({})
                .then(function(prompts) {
                    console.log("USERS-prompt", prompts[0].promptText );

                    res.render('users/show', { title: myTitle, users: users, prompts: prompts, message: req.flash() });    
                });  /// closes off the prompt  
        });  /// closes off the user
});  /// closes off the router get
     
// http://localhost:3000/users/show/


// EDIT
router.get('/edit/:id', authenticate, function(req, res, next) {
    var myTitle = "User Show";
    User.find({ user: global.currentUser })
        .then(function(users) {
            res.render('users/edit', { title: myTitle, users: users, message: req.flash() });
        });
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
