//=================================================
// GLOBAL
// wdi-project-3 app.js
//=================================================
var express        = require('express');
var path           = require('path');
var favicon        = require('serve-favicon');
var logger         = require('morgan');
var cookieParser   = require('cookie-parser');
var bodyParser     = require('body-parser');
var passport       = require('passport');
var mongoose       = require('mongoose');
var methodOverride = require('method-override');
var session        = require('express-session');
var flash          = require('connect-flash');

//=================================================
// ROUTES
//=================================================
var homeRouter    = require('./routes/index');
var usersRouter   = require('./routes/users');
var promptsRouter = require('./routes/prompts');
var storiesRouter = require('./routes/stories');

var app = express();

//=================================================
// CONNECT TO DATABASE
//=================================================
mongoose.connect('mongodb://localhost/promptsDB');



//=================================================
// VIEW ENGINE SETUP
//=================================================
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//=================================================
//APP.USE SECTION
//=================================================
app.use(logger('combined')); //possibly switch to 'dev'
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

//=================================================
//PASSPORT SESSION
//=================================================
app.use(session({ secret: 'test',
                  resave: true,
                  saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./config/passport/passport')(passport);

//=================================================
//MIDDLEWARE CURRENTUSER
//=================================================
app.use(function (req, res, next) {
  global.currentUser = req.user;
  next();
});

//=================================================
//ROUTES
//=================================================
app.use('/', homeRouter);
app.use('/users', usersRouter);
app.use('/prompts', promptsRouter);
app.use('/stories', storiesRouter);


//=================================================
//CATCH 404, FORWARD TO ERROR HANDLER
//=================================================
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


//=================================================
//ERROR HANDLERS
//=================================================

//Development event handler
//Will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}


//Production event handler
//No stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

console.log('You are in: %s mode', app.get('env'));

module.exports = app;
