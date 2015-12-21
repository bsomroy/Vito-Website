var dbm = require('db-migrate');
var type = dbm.dataType;
var async = require('async');

exports.up = function(db, callback) {
	async.series([
		db.runSql.bind(db, 'CREATE TABLE Naruto (ID int NOT NULL AUTO_INCREMENT PRIMARY KEY, ' +
			'Title VARCHAR(100) NOT NULL, ' +
			'URL VARCHAR(150) NOT NULL,' + 
			'ModifiedAt DATETIME NOT NULL);'),
		db.runSql.bind(db, 'CREATE TABLE Pages (ID int NOT NULL AUTO_INCREMENT PRIMARY KEY, ' +
			'NarutoID int NOT NULL, ' +
			'ImgURL VARCHAR(250) NOT NULL, ' +
			'PageNumber int NOT NULL, ' +
			'ModifiedAt DATETIME NOT NULL);')
	], callback);
};

exports.down = function(db, callback) {
  async.series([
		db.runSql.bind(db, 'DROP TABLE Naruto;'),
		db.runSql.bind(db, 'DROP TABLE Pages;')
	], callback);
};
