var express = require('express');
var router = express.Router();
var authenticate = require('./authenticate');
var Prompt = require('../models/prompt');
var Story = require('../models/story');

function makeError(res, message, status) {
    res.statusCode = status;
    var error = new Error(message);
    error.status = status;
    return error;
}

// INDEX
router.get('/index', function(req, res, next) {
    // var prompts = global.currentUser.prompts;
    Prompt.find({ user: global.currentUser })
        .then(function(prompts) {
            res.render('prompts/index', { prompts: prompts, message: req.flash() });
        });
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
    // var prompt = currentUser.prompts.id(req.params.id);
    // if (!prompt) return next(makeError(res, 'Document not found', 404));
    // res.render('prompts/show', { prompt: prompt, message: req.flash() });
    Prompt.findById(req.params.id)
        .then(function(prompt) {
            res.render('prompts/show', { prompt: prompt, message: req.flash() });
        }, function(err) {
        return next(err);
    });
});

// CREATE
router.post('/', authenticate, function(req, res, next) {
    var prompt = new Prompt ({
        user: global.currentUser,
        promptTheme: req.body.promptTheme,
        promptText: req.body.promptText
    });
    prompt.save()
    .then(function(saved) {
        res.redirect('/prompts/index');
    }, function(err) {
        return next(err);
    });
});


// EDIT
router.get('/edit', authenticate, function(req, res, next) {
    Prompt.findById(req.query.prompt)
        .then(function(prompt) {
            res.render('prompts/edit', { prompt: prompt, message: req.flash() });
        }, function(err) {
        return next(err);
    });
});

// UPDATE
router.put('/:id', authenticate, function(req, res, next) {
    var prompt = currentUser.prompts.id(req.params.id);
    if (!prompt) return next(makeError(res, 'Document not found', 404));
    else {
        prompt.promptTheme = req.body.promptTheme;
        prompt.promptText = req.body.promptText;
        Prompt.save()
            .then(function(saved) {
                res.redirect('/prompts/index');
            }, function(err) {
                return next(err);
            });
    }
});

// DESTROY
router.delete('/:id', authenticate, function(req, res, next) {
    Prompt.findByIdAndRemove(req.params.id)
      .then(function() {
        res.redirect('/prompts/index');
      }, function(err) {
        return next(err);
      });
});

module.exports = router;
