// stories.js

var express = require('express');
var router = express.Router();
var Prompt = require('../models/prompt');
var Story = require('../models/story');
var authenticate = require('./authenticate');

function makeError(res, message, status) {
    res.statusCode = status;
    var error = new Error(message);
    error.status = status;
    return error;
}

// INDEX
router.get('/index', authenticate, function(req, res, next) {
    // var stories = global.currentUser.stories;
    // res.render('stories/index', { stories: stories, message: req.flash() });
    Story.find({ user: global.currentUser })
        .then(function(stories) {
            res.render('stories/index', { stories: stories, message: req.flash() });
        });
});

// NEW
router.get('/new', authenticate, function(req, res, next) {
    console.log('req.query:', req.query);
    Prompt.findById(req.query.prompt)
        .then(function(prompt) {
            console.log('prompt:', prompt);
            var story = {
                user: global.currentUser,
                prompt: prompt,
                storyText: '',
                storyHook: ''
            };
            res.render('stories/new', { story: story, prompt: prompt, message: req.flash() });
        });

});

// SHOW
router.get('/:id', authenticate, function(req, res, next) {
    Story.find({ user: global.currentUser })
        .then(function(stories) {
            res.render('stories/show', { stories: stories, message: req.flash() });
        });
});

// CREATE
router.post('/', authenticate, function(req, res, next) {
    console.log('req.query:', req.query);
    Prompt.findById(req.query.prompt)
        .then(function(prompt) {
            console.log('prompt:', prompt);
            var story = new Story({
                user: global.currentUser,
                prompt: req.body.prompt,
                storyHook: req.body.storyHook,
                storyText: req.body.storyText
            });
            console.log('about to save story:', story);
            story.save()
                .then(function() {
                    res.redirect('/');
                    console.log("saved")
                }, function(err) {
                    return next(err);
                });
        });
});

//     Prompt.findById(req.query.prompt)
//         .then(function(prompt) {
//             var story = new Story({
//                 user: global.currentUser,
//                 prompt: prompt,
//                 storyText: req.body.storyText,
//                 storyHook: req.body.storyHook
//             });
//             story.save()
//                 .then(function(saved) {
//                     res.redirect('/');
//                 }, function(err) {
//                     return next(err);
//                 });
//         });

// });

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
