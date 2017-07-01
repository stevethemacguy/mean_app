//Create the express server. Include the dependencies we'll be using
var express = require('express'),
    stylus = require('stylus'),
    logger = require('morgan'),
    bodyParser = require('body-parser');  //pre-req for other middleware

//If node already has an enviornment variable set, use that one, otherwise use development
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' === req.method) {
        res.send(200);
    }
    else {
        next();
    }
};

//Set up stylus
function compile(str, path) {
    return stylus(str).set('filename', path);
}

//Path where you'll store your views
app.set('views', __dirname + '/server/views');

//set the view engine to jade
app.set('view engine', 'jade');

//Other crap. Turn on express logging and configure stylus.
app.use(logger('dev'));

app.use(stylus.middleware(
    {
        src: __dirname + '/public',
        compile: compile
    }
));

app.use(allowCrossDomain);

//Set the public "root" folder that will contain static assets on the server (images, CSS, JS files, etc)
//The path is relative to the directory from where you launch node (i.e the folder containing server.js)
//With this in place, you can go directly to a url like http://localhost:3000/css/styles.css
app.use(express.static(__dirname + '/public'));     //This makes public the root folder. For example, localhost:3030/favicon.ico would work,

app.get('/', function(req, res) {
    res.json("Use /products to get a list of JSON objects or /shipping to retrieve shipping data");
});

app.get('/products', function(req, res) {
    res.sendFile(__dirname + '/public/products.json');
});

app.get('/shipping', function(req, res) {
    res.sendFile(__dirname + '/public/data.json');
});

var port = process.env.PORT || 3030;

app.listen(port, function () {
    console.log('Listening on port' + port + "...");
});

