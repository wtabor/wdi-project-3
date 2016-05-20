// static "index pages" router
var express = require('express');
var router = express.Router();
var passport = require('passport');
var Story = require('../models/story');


// GET Homepage
router.get('/', function(req, res, next) {
    var myTitle = "Welcome";    
    Story.find({})
        .then(function(stories) {        
            var max = stories.length;
            var min = 0;
            myRandomLocation(min,max); 
                function myRandomLocation(min,max) {
                    myValue = Math.floor(Math.random() * (max - min)) + min;
                    return myValue;
                };
            myPickedStory = stories[myValue].storyText;
            res.render('index', { title: myTitle, myDisplayedData: myPickedStory, message: req.flash() }); 

            // console.log("myStories -", stories[myValue]._id,  stories[myValue].storyHook);
            // var myRandonStory = "myRandonStory stuff here";
        });    
    // myDisplayedCar = myPickedStory;
    // render line was here    
});



// GET /signup
router.get('/signup', function(req, res, next) {
    var myTitle = "Signup";
    res.render('signup.ejs', { title: myTitle, message: req.flash() });
});


// POST /signup
router.post('/signup', function(req, res, next) {
    var signUpStrategy = passport.authenticate('local-signup', {
      successRedirect: '/',
      failureRedirect: '/signup',
      failureFlash: true
    });
    return signUpStrategy(req, res, next);
});


// GET /about
router.get('/about', function(req, res, next) {
    var myTitle = "About";
    res.render('about.ejs', {title: myTitle, message: req.flash() });
});


// GET /login
router.get('/login', function(req, res, next) {
    var myTitle = "Login";
    res.render('login.ejs', {title: myTitle, message: req.flash() });
});


// POST /login
router.post('/login', function(req, res, next) {
    var loginProperty = passport.authenticate('local-login', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    });
    return loginProperty(req, res, next);
});

// GET /logout
router.get('/logout', function(req, res, next) {
    req.logout();
    res.redirect('/');
});

module.exports = router;