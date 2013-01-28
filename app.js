
/**
 * Module dependencies.
 */

var express = require('express')
  , feedback = require('./routes/feedback')
  , user = require('./routes/user')
  , comments = require('./routes/comments')
  , devices = require('./routes/devices')
  , helpers = require('./common/helpers.js')
  , passport = require('passport')
  , util = require('util')
  , LocalStrategy = require('passport-local').Strategy
  , http = require('http')
  , path = require('path')
  , mongoose = require('mongoose')
  , config = require('./config.js');

var app = express();

mongoose.connect('mongodb://' + config.host + '/' + config.ddbbName);

app.configure(function() {
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('quePuedeSalirMal'));
  app.use(express.session());
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function() {
  app.use(express.errorHandler());
});

passport.serializeUser(function(username, done) {
  done(null, username);
});

passport.deserializeUser(function(username, done) {
  done(null, username);
});

passport.use(new LocalStrategy(function(username, password, done) {
  // asynchronous verification, for effect...
  process.nextTick(function() {
    // Find the user by username. If there is no user with the given
    // username, or the password is not correct, set the user to `false` to
    // indicate failure and set a flash message. Otherwise, return the
    // authenticated `user`.
    var ok = helpers.checkLogin(username, password);
    if (ok) {
      return done(null, username);
    }
    return done(null, false, 'Bad combination');
  });
}));

// Home
app.get('/', feedback.home);

// Feedback
app.post('/', feedback.formHandler);
app.get('/feedback', feedback.form);

// User
app.get('/user/all', helpers.isLogged, user.getAll);
app.get('/user/new', helpers.isLogged, user.createNew);
app.post('/user/new', helpers.isLogged, user.createNewProcess);
app.get('/user/:email', helpers.isLogged, user.get);
app.get('/user/:email/comments', helpers.isLogged, user.getComments);
app.get('/user/:email/updates', helpers.isLogged, user.getUpdates);
app.get('/user/delete/:email', helpers.isLogged, user.remove);

// Comments
app.get('/comment/all', comments.getAll);

// Devices
app.get('/device/all', helpers.isLogged, devices.getAll);
app.get('/device/new', helpers.isLogged, devices.createNew);
app.post('/device/new', helpers.isLogged, devices.createNewProcess);

// Login and logout
app.post('/login',
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  }
);
app.get('/login', function(req, res) {
  res.render('login', { user: req.user });
});
app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

http.createServer(app).listen(app.get('port'), function() {
  console.log("Express server listening on port " + app.get('port'));
});
