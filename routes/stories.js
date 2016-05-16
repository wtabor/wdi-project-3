// stories.js

var express = require('express');
var router = express.Router();
var story = require('../models/story');

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
    var story = global.currentUser.stories;
    res.render('stories/index', { stories: stories, message: req.flash() });
});

// NEW
router.get('/new', authenticate, function(req, res, next) {
    var story = {
        storyTheme: '',
        storyText: ''

    };
    res.render('stories/new', { story: story, message: req.flash() });
});

// SHOW
router.get('/:id', authenticate, function(req, res, next) {
    var story = currentUser.stories.id(req.params.id);
    if (!story) return next(makeError(res, 'Document not found', 404));
    res.render('stories/show', { story: story, message: req.flash() });
});

// CREATE
router.post('/', authenticate, function(req, res, next) {
    var story = {
        storyTheme: req.body.storyTheme,
        storyText: req.body.storyText
    };
    // Since a user's stories are an embedded document, we just need to push a new
    // story to the user's list of stories and save the user.
    currentUser.stories.push(story);
    currentUser.save()
        .then(function() {
            res.redirect('/stories');
        }, function(err) {
            return next(err);
        });
});

// EDIT
router.get('/:id/edit', authenticate, function(req, res, next) {
    var story = currentUser.stories.id(req.params.id);
    if (!story) return next(makeError(res, 'Document not found', 404));
    res.render('story/edit', { story: story, message: req.flash() });
});

// UPDATE
router.put('/:id', authenticate, function(req, res, next) {
    var story = currentUser.stories.id(req.params.id);
    if (!story) return next(makeError(res, 'Document not found', 404));
    else {
        story.storyTheme = req.body.storyTheme;
        currentUser.save()
            .then(function(saved) {
                res.redirect('/stories');
            }, function(err) {
                return next(err);
            });
    }
});

// DESTROY
router.delete('/:id', authenticate, function(req, res, next) {
    var story = currentUser.stories.id(req.params.id);
    if (!story) return next(makeError(res, 'Document not found', 404));
    var index = currentUser.stories.indexOf(story);
    currentUser.stories.splice(index, 1);
    currentUser.save()
        .then(function(saved) {
            res.redirect('/stories');
        }, function(err) {
            return next(err);
        });
});

module.exports = router;
