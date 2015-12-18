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
var favicon = require('serve-favicon');
var UAParser = require('ua-parser-js');
var request = require('request');
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
app.use('/dist', express.static(__dirname + '/dist'));
app.use(favicon(__dirname + '/favicon.ico'));
app.enable('trust proxy');

var notLoadableBrowsers = { 'IE': 8 };

//Get Functions
app.get('/', function(req, res) {
	var styles = [];
	var parser = new UAParser(req.headers['user-agent']);
	var parserResult = parser.getResult();
	if (notLoadableBrowsers[parserResult.browser.name] && parseInt(parserResult.browser.version, 10) <= notLoadableBrowsers[parserResult.browser.name]) {
		res.render('unsupported_browser');
	} else {
		if (config.use_compiled) {
			require_location = 'dist/scripts/vendor/requirejs/require.js';
			styles.push('dist/css/main.css');
			data_main_location = 'dist/scripts/main';
		} else {
			require_location = 'scripts/vendor/requirejs/require.js';
			styles.push('css/main.css');
			data_main_location = 'scripts/main';
		}
		res.render('main', {
			require_location: require_location,
			styles: styles,
			data_main_location: data_main_location,
			mainURL: config.domain,
			env: env
		});
	}
});

app.get('/session/naruto', function(req, res) {
	request('http://www.mangapanda.com/naruto', function(err, response, html) {
		if (!err && response.statusCode == 200) {
	        res.json(html);
	    } else {
	    	res.status(500).json({OK: false});
	    }
	});
});

var server = app.listen(4000, config.privateIP, function() {
	console.log('Listening on port %d', server.address().port);
});