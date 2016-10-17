var moment = require('moment');
var mysql = require('mysql');
var sqldb = require('./mysql');
var winston = require('winston');

var logger = new (winston.Logger)({
	transports: [
		new (winston.transports.Console)(),
		new (winston.transports.File)({ filename: 'ebayLog.log' })
	]
});

exports.logout = function(req,res){
	var lastlogin = moment().format('LLLL');
	console.log(lastlogin);
	logger.log('info', "User with userid "+req.session.userid+" is logged out");
	var query="Update user set lastlogin = '"+lastlogin+"' where email = '"+req.session.email+"'";
	sqldb.storeData(function(Error,results) 
			{
				if(Error){
				console.log("In error");
				throw Error;
			}else{
			console.log("lastlogin stored");	
			}
			}, query);
	
	req.session.destroy();
	res.render('signin');
};