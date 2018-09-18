// app file
var fortune = require('./lib/fortune.js');
var express = require('express'); //node.js - include module - like js library

var app = express(); //creates instance?

//set up Handlebars view engine
var handlebars = require('express3-handlebars').create({defaultLayout:'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000); //change browser settings to new value

//static resources - middleware
app.use(express.static(__dirname + '/public'));  //public invisible to client - don't need to add /public/ on layout

//Testing - search for querystring test=1
app.use(function(req, res, next) {
  res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
  next();
});

//ROUTES

//home page
app.get('/', function(req, res) {  //path doesn't care about case, slashes, or querystrings
  res.render('home');
});

//about page
app.get('/about', function(req, res) {
  res.render('about', {
    fortune: fortune.getFortune(),
    pageTestScript: '/qa/tests-about.js'
  });
});

app.get('/tours/hood-river', function(req, res) {
  res.render('tours/hood-river');
});

app.get('/tours/request-group-rate', function(req, res) {
  res.render('tours/request-group-rate');
});

// custom 404 page - catch-all handler (middleware)
app.use(function(req, res, next) { //app.use adds middleware - doesn't match route
  res.status(404);
  res.render('404');
});

// custom 500 page - error handler (middleware)
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function() {
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
