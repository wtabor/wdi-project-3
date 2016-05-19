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
    Prompt.find({})
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
router.get('/:id', function(req, res, next) {
    // var prompt = currentUser.prompts.id(req.params.id);
    // if (!prompt) return next(makeError(res, 'Document not found', 404));
    // res.render('prompts/show', { prompt: prompt, message: req.flash() });
    Prompt.findById(req.params.id)
    .populate('stories')
    .exec(function(err, prompt) {
        res.render('prompts/show', { prompt: prompt, message: req.flash() });
    }, function(err) {
    return next(err);
    });
});

// CREATE
router.post('/', authenticate, function(req, res, next) {
    var prompt = new Prompt ({
        user: global.currentUser._id,
        promptTheme: req.body.promptTheme,
        promptText: req.body.promptText
    });
    prompt.save()
    .then(function(saved) {
        currentUser.prompts.push(saved._id);
        currentUser.save(function(err) {
            res.redirect('/prompts/index');
        });
    }, function(err) {
        return next(err);
    });
});


// EDIT
router.get('/edit/:pid', authenticate, function(req, res, next) {
     prompt = {
        promptTheme: 'prompt.promptTheme',
        promptText: 'prompt.promptText'
    };

    res.render('prompts/edit', { prompt: prompt, message: req.flash() });
});


// UPDATE
router.post('/', authenticate, function(req, res, next) {
    prompt =  ({
        user: global.currentUser._id,
        promptTheme: req.body.promptTheme,
        promptText: req.body.promptText
    });
    prompt.save()
    .then(function(saved) {
        currentUser.prompts.push(saved._id);
        currentUser.save(function(err) {
            res.redirect('/prompts/index');
        });
    }, function(err) {
        return next(err);
    });
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
