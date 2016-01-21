//A basic Express Webserver created with Node.
var express = require('express');

//If node already has an enviornment variable set, use that one, otherwise use development
var env = process.env.NODE_ENV = process.env.NODE_ENV  || 'development';

var app = express();

//Configuration

//Path where you'll store your views
app.set('views', __dirname + '/server/views');

//set the view engine to jade
app.set('view engine', 'jade');

//Create a route that delivers the re-routes everything to the index page
// app.get('/'); //Normally you would use this

app.get('*', function(request, response)
{
    request.render('index');
}); //Since we're using angular, we'll handle routing on the clientside
//So this will Match all routes...image requests, JS, CSS requests, everything and send them to the index page.
//This just means you have to be careful to set up your angular routes, including 404, etc.


//Create a public folder that can be viewable on the server. See http://expressjs.com/en/starter/static-files.html
//The path you provide is relative to the directory from where you launch node (i.e the folder containing server.controllers)
//NOTE: The __dirname here IS REQUIRED! Even though it's not initialized to anything!
app.use(express.static(__dirname + '/'));

app.listen(3000, function () {
    console.log('Listening on port 3000');
});

