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
    Story.find({})
        .then(function(stories) {
            var myTitle = "Stories Home";
            res.render('stories/index', { title: myTitle, stories: stories, message: req.flash('Please log in') });
        });
});


// NEW
router.get('/new/:id', authenticate, function(req, res, next) {
    Prompt.findById(req.params.id)
        .then(function(prompt) {
            console.log('prompt:', prompt);
            var story = {
                user: global.currentUser,
                prompt: prompt,
                storyText: '',
                storyHook: ''
            };
            var myTitle = "New Story";
            res.render('stories/new', { title: myTitle, story: story, prompt: prompt, message: req.flash('Please log in') });
        });
});


// SHOW WORKS DON'T TOUCH
router.get('/:id', function(req, res, next) {
    Story.findById(req.params.id)
        .populate('prompt')
        .exec(function(err, story) {
            var myTitle = "Show Story";
            res.render('stories/show', { title: myTitle, story: story, message: req.flash('Please log in') });
        });
});

// CREATE
router.post('/', authenticate, function(req, res, next) {
    Prompt.findById(req.body.prompt)
        .then(function(prompt) {
            console.log('prompt:', prompt);
            var story = new Story({
                user: global.currentUser._id,
                prompt: prompt._id,
                storyHook: req.body.storyHook,
                storyText: req.body.storyText
            });
            console.log('about to save story:', story);
            story.save()
                .then(function(savedStory) {
                    prompt.stories.push(savedStory._id);
                    currentUser.stories.push(savedStory._id);
                    prompt.save()
                        .then(function() {
                            currentUser.save()
                                .then(function() {
                                    res.redirect('/stories/' + savedStory._id);
                                    console.log("saved")
                                });
                        });
                }, function(err) {
                    return next(err);
                });
        });
});

// EDIT
router.get('/edit/:id', authenticate, function(req, res, next) {
    Story.findById(req.params.id)
        .then(function(story) {
            var myTitle = "Stories Home";
            res.render('stories/edit', { story: story, title: myTitle, prompt: ""+story.prompt, message: req.flash() });
            //USE prompt: ""+story.prompt TO GET PROMPT
        });
});

// UPDATE
router.put('/:id', authenticate, function(req, res, next) {
    Story.findByIdAndUpdate(req.params.id, req.body)
        .then(function() {
            res.redirect('/stories/' + req.params.id);
        }, function(err) {
            return next(err);
        });
});

// DESTROY
router.delete('/:id', authenticate, function(req, res, next) {
    Story.findByIdAndRemove(req.params.id)
        .then(function() {
            res.redirect('/stories/' + req.params.id);
        }, function(err) {
            return next(err);
        });
});


module.exports = router;
