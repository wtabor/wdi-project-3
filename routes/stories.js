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

    var promptid = req.query.promptid;
    console.log("promptid " + promptid);

    Prompt.findById(promptid)
    .then(function(prompt) {
        console.log("prompt text: " + prompt.promptText);
        return Story.findById(req.params.id)
        .then(function(story) {

          story.promptText = prompt.promptText;

          return story.save();
        })
        .then(function(saved) {
            console.log("fullstory"+saved);
            res.render('stories/show', { story: saved,  message: req.flash() });
        });
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

// EDIT

router.get('/edit', authenticate, function(req, res, next) {
    Story.findById(req.params.id)
        .then(function(stories) {
            res.render('stories/show', { stories: stories, message: req.flash() });
        });


    console.log("hey look at me");
});
// router.get('/edit', authenticate, function(req, res, next) {

//     console.log("hey you");

//     // console.log('req.query.story:', req.query.story);
//     // Prompt.findById(req.query.story)
//     //     .then(function(prompt) {
//     //         console.log('prompt:', prompt);
//     //         var story = {
//     //             user: global.currentUser,
//     //             prompt: prompt,
//     //             storyText: '',
//     //             storyHook: ''
//     //         };
//     //         res.render('stories/edit', { story: story, prompt: prompt, message: req.flash() });
//     //     });

// });
// router.get('/:id/edit', authenticate, function(req, res, next) {
//     var story = currentUser.stories.id(req.params.id);
//     if (!story) return next(makeError(res, 'Document not found', 404));
//     res.render('story/edit', { story: story, message: req.flash() });
// });

// UPDATE
router.put('/:id', authenticate, function(req, res, next) {
    console.log('req.query:', req.query);
    Story.findById(req.query.story)
        .then(function(prompt) {
            console.log('prompt:', prompt);
            var story = {
                user: global.currentUser,
                prompt: req.body.prompt,
                story: req.body.story,
                storyHook: req.body.storyHook,
                storyText: req.body.storyText
            };
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











//     var story = currentUser.stories.id(req.params.id);
//     if (!story) return next(makeError(res, 'Document not found', 404));
//     else {
//         story.storyTheme = req.body.storyTheme;
//         currentUser.save()
//             .then(function(saved) {
//                 res.redirect('/stories');
//             }, function(err) {
//                 return next(err);
//             });
//     }
// });

// DESTROY
router.delete('/:id', authenticate, function(req, res, next) {
    Story.findByIdAndRemove(req.params.id)
        .then(function() {
            res.redirect('/stories/index');
        }, function(err) {
            return next(err);
        });
});

module.exports = router;
