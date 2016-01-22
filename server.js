//Create the express server. Include the dependencies we'll be using
var express = require('express'),
    stylus = require('stylus'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),  //pre-req for other middleware
    mongoose = require('mongoose');

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

//Set the public "root" folder that will contain static assets on the server (images, CSS, JS files, etc)
//The path is relative to the directory from where you launch node (i.e the folder containing server.js)
//With this in place, you can go directly to a url like http://localhost:3000/css/styles.css
app.use(express.static(__dirname + '/public'));     //This makes public the root folder. For example, localhost:3030/favicon.ico would work,

//Create a route for partials
app.get('/partials/:partialPath', function(req, res) {
    res.render('partials/' + req.params.partialPath);
});

//Connect to the Mongo DB using mongooes. Note, the name that comes after local host, is the name of your database
mongoose.connect('mongodb://localhost/mean_app'); //If it doesn't already exists, then mongo will create the database
//Listen for other events and do some console logs to show what's going on
var db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error"));
db.once('open', console.error.bind(console, "mean_app db is now open"));//listen for the open event, but only once


//Since our routing is handled by angular, this sends ALL page requests to index.html, and then angular
//takes it from there. Because of this, make sure you handle routes that lead no-where (e.g. with a 404 or
//just route them to index. Note: NO true, server-side 404 will ever be rendered with this method.
//Also, this MUST be "/index", it can't be "/home", etc
app.get('/*', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

var port = 3030;
app.listen(port, function () {
    console.log('Listening on port' + port + "...");
});

