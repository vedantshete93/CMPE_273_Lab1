var mysql = require('mysql');
var sqldb = require('./mysql');
var winston = require('winston');

var logger = new (winston.Logger)({
	transports: [
		new (winston.transports.Console)(),
		new (winston.transports.File)({ filename: 'ebayLog.log' })
	]
});

exports.profile = function(req, res){
	var query = "select * from user where email='"+req.session.email+"'";
	sqldb.fetchData(function(err,results){	
		if(err){
			logger.log('error',"Query: " +query);
			console.log("In error");
			throw err;
		}
		else{
			console.log("profile retrieved");
			console.log(results);
			res.send(results);
			//res.render('profile');
	
		}
			    },query);
		
};


exports.getprofilepage = function(req,res){
	logger.log('info', "User with userid: "+req.session.userid+" checking their profile");
	res.render('profile');
};