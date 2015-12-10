//Protocol / Server Settings
var http = require('http');
var https = require('https');
http.globalAgent.maxSockets = Infinity; // set max sockets to infinity to avoid 5 on node < 0.12.0
https.globalAgent.maxSockets = Infinity;
var env = process.env.NODE_ENV; //TODO: Find out where process.env.NODE_ENV is being set.
var configFile = require('./config');
var config = configFile[env];

//Database Settings
var mysql = require('mysql');
var pool = mysql.createPool({
	host: config.db.hostname,
	user: config.db.username,
	password: config.db.password,
	database: config.db.database
});

//Application Settings
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var compression = require('compression');
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression({threshold: 512}));
app.use('/scripts', express.static(__dirname + '/app/scripts'));
app.use('/images', express.static(__dirname + '/app/images'));
app.use('/css', express.static(__dirname + '/app/css'));
app.use(favicon(__dirname + '/favicon.ico'));
app.enable('trust proxy');

//Get Functions
app.get('/', function(req, res) {
	console.log(res);
	console.log(req);
});

//Post Functions