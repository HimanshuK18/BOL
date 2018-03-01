
// Required Modules
var express = require("express");
var morgan = require("morgan");
var bodyParser = require("body-parser");
var mongojs = require('mongojs');
var favicon = require('serve-favicon');

var app = express();
var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
  
require('./app/routes')(app);
require('./app/Contractroutes')(app);
require('./app/paymentroute')(app);

app.use(favicon(__dirname + '/public/Images/icon_favicons.ico'));

app.use(morgan("dev"));
//error hadler
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
});
process.on('uncaughtException', function (err) {
    console.log(err);
});

// Start Server
var server = app.listen(port, function () {
    console.log("Express server listening on port " + port);
});

var io = require('socket.io').listen(server);

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('chat message', function(msg){
      console.log('message:' + msg);
      io.emit('chat message', msg);
    });
  });
