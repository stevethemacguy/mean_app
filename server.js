//Create the express server. Include the dependencies we'll be using
var express = require('express'),
    stylus = require('stylus'),
    logger = require('morgan'),
    bodyParser = require('body-parser');   //pre-req for other middleware

//If node already has an enviornment variable set, use that one, otherwise use development
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

//Set up stylus
function compile(str, path) {
    return stylus(str).set('filename', path);
}

//Configuration

//Path where you'll store your views
app.set('views', __dirname + '/server/views');

//set the view engine to jade
app.set('view engine', 'jade');

//Other crap. Turn on express logging and configure stylus.
app.use(logger('dev'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(stylus.middleware(
    {
        src: __dirname + '/public',
        compile: compile
    }
));

//Create a public folder that can be viewable on the server. See http://expressjs.com/en/starter/static-files.html
//The path you provide is relative to the directory from where you launch node (i.e the folder containing server.controllers)
//NOTE: The __dirname here IS REQUIRED! Even though it's not initialized to anything!
app.use(express.static(__dirname + '/public'));     //This makes public the root folder. For example, localhost:3030/favicon.ico would work,

//Create a route that re-routes everything to the index page
// app.get('/'); //Normally you would use this
app.get('*', function(request, response)
{
    response.render('index');
}); //Since we're using angular, we'll handle routing on the clientside
//So this will Match all routes...image requests, JS, CSS requests, everything and send them to the index page.
//This just means you have to be careful to set up your angular routes, including 404, etc.

var port = 3030;
app.listen(port, function () {
    console.log('Listening on port' + port + "...");
});

