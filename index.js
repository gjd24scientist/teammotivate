var express = require('express');
var path = require('path');
var app = express();

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
require('./config/passport')(passport, LocalStrategy);

var mongo = require('mongodb');
var mongoose = require('mongoose');

var home = require('./routes/home');
var projects = require('./routes/projects');
var tasks = require('./routes/tasks');

app.use(cookieParser());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(session({
  secret: 'asDni2324nasdSDSf',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'public')));

app.use('/projects/:id/tasks/:id', tasks.resource);
app.use('/projects/:id/tasks', tasks.collection);
app.use('/projects/:id', projects.resource);
app.use('/projects', projects.collection);
app.use('/', home);

app.listen(process.env.OPENSHIFT_NODEJS_PORT || 8080,
  process.env.OPENSHIFT_NODEJS_IP);
