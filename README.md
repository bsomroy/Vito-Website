# Vito-Website

## SETUP

#### Run Local

1. Install NodeJS, npm - If on server, check proper way to install node.
2. npm install -g bower nodemon mysql db-migrate handlebars
3. npm install
4. bower install
5. handlebars app/scripts/tpl/ -f app/scripts/templates.js -a -m

#### NOTES

If using SourceTree, make sure that "Do not fast-foward when merging, always create commit" is selected in Git options.

#### DATABASE MIGRATIONS

1. db-migrate up
2. db-migrate down
3. db-migrate create name_of_migration

#### Example DB Migration With Single Statement

	var dbm = require('db-migrate');
	var type = dbm.dataType;
	exports.up = function(db, callback) {
		db.runSql('CREATE TABLE imatable (dog int, cow varchar(5));',callback);
	};

	exports.down = function(db, callback) {
		db.runSql('DROP TABLE imatable', callback);
	};

#### Example DB Migration With Multiple Statements

	var dbm = require('db-migrate');
	var type = dbm.dataType;
	var async = require('async');

	exports.up = function (db, callback) {
		async.series([
			db.runSql.bind(db, 'CREATE TABLE imatablega (dog int, cow varchar(5));'),
			db.runSql.bind(db, 'CREATE TABLE imatableg (dog int, cow varchar(5));')
		], callback);
	};

	exports.down = function(db, callback) {
		async.series([
			db.runSql.bind(db, 'DROP TABLE imatablega;'),
			db.runSql.bind(db, 'DROP TABLE imatableg;')
		], callback);
	};
