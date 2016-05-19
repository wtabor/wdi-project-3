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
            res.render('stories/index', {title: myTitle,  stories: stories, message: req.flash('Please log in') });
        });
});


// NEW
router.get('/new/:pid', authenticate, function(req, res, next) {
    Prompt.findById(req.params.pid)
        .then(function(prompt) {
            console.log('prompt:', prompt);
            var story = {
                user: global.currentUser,
                prompt: prompt,
                storyText: '',
                storyHook: ''
            };
            var myTitle = "New Story";
            res.render('stories/new', {title: myTitle,  story: story, prompt: prompt, message: req.flash('Please log in') });
        });
});


// SHOW WORKS DON'T TOUCH
router.get('/:id', function(req, res, next) {
    Story.findById(req.params.id)
        .populate('prompt')
        .exec(function(err, story) {
            var myTitle = "Show Story";
            res.render('stories/show', {title: myTitle,  story: story, message: req.flash('Please log in') });
        });
});


// CREATE WORKS DON'T TOUCH
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
// NOT WORKING
router.get('/new/:pid', authenticate, function(req, res, next) {
    Prompt.findById(req.params.pid)
        .then(function(prompt) {
            console.log('prompt:', prompt);
            var story = {
                user: global.currentUser,
                prompt: prompt,
                storyText: 'new Story Text',
                storyHook: 'new Story Hook'
            };
            res.render('stories/edit', { story: story, prompt: prompt, message: req.flash() });
        });

});
// Story.findById(req.params.id)
//     .then(function(stories) {
//         res.render('stories/show', { stories: stories, message: req.flash() });
//     });


// console.log("hey look at me");

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
    backURL = req.header('Referer') || '/';
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
                    res.redirect(backURL);
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
