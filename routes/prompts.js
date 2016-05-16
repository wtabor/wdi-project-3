var express = require('express');
var router = express.Router();

var Prompt = require('../models/prompt');

function makeError(res, message, status) {
    res.statusCode = status;
    var error = new Error(message);
    error.status = status;
    return error;
}

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
    var prompt = global.currentUser.prompts;
    res.render('prompts/index', { prompts: prompts, message: req.flash() });
});

// NEW
router.get('/new', authenticate, function(req, res, next) {
    var prompt = {
        promptTheme: '',
        promptText: ''

    };
    res.render('prompts/new', { prompt: prompt, message: req.flash() });
});

// SHOW
router.get('/:id', authenticate, function(req, res, next) {
    var prompt = currentUser.prompts.id(req.params.id);
    if (!prompt) return next(makeError(res, 'Document not found', 404));
    res.render('prompts/show', { prompt: prompt, message: req.flash() });
});

// CREATE
router.post('/', authenticate, function(req, res, next) {
    var prompt = {
        promptTheme: req.body.promptTheme,
        promptText: req.body.promptText
    };
    // Since a user's prompts are an embedded document, we just need to push a new
    // prompt to the user's list of prompts and save the user.
    currentUser.prompts.push(prompt);
    currentUser.save()
        .then(function() {
            res.redirect('/prompts');
        }, function(err) {
            return next(err);
        });
});

// EDIT
router.get('/:id/edit', authenticate, function(req, res, next) {
    var prompt = currentUser.prompts.id(req.params.id);
    if (!prompt) return next(makeError(res, 'Document not found', 404));
    res.render('prompt/edit', { prompt: prompt, message: req.flash() });
});

// UPDATE
router.put('/:id', authenticate, function(req, res, next) {
    var prompt = currentUser.prompts.id(req.params.id);
    if (!prompt) return next(makeError(res, 'Document not found', 404));
    else {
        prompt.promptTheme = req.body.promptTheme;
        currentUser.save()
            .then(function(saved) {
                res.redirect('/prompts');
            }, function(err) {
                return next(err);
            });
    }
});

// DESTROY
router.delete('/:id', authenticate, function(req, res, next) {
    var prompt = currentUser.prompts.id(req.params.id);
    if (!prompt) return next(makeError(res, 'Document not found', 404));
    var index = currentUser.prompts.indexOf(prompt);
    currentUser.prompts.splice(index, 1);
    currentUser.save()
        .then(function(saved) {
            res.redirect('/prompts');
        }, function(err) {
            return next(err);
        });
});

module.exports = router;
