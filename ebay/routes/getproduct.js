var mysql = require('mysql');
var sqldb = require('./mysql');
var winston = require('winston');

var logger = new (winston.Logger)({
	transports: [
		new (winston.transports.Console)(),
		new (winston.transports.File)({ filename: 'ebayLog.log' })
	]
});

exports.getproduct = function(req,res){
	
	var query = "select product.name, product.description, product.price, product.product_id, product.quantity ,user.id, user.fname, product.forBid from product join user where product.seller_id = user.id and user.id<>'"+req.session.userid+"'";
	sqldb.fetchData(function(err,results){
		if(err){
			logger.log('error',"Query: " +query);
			console.log("In error");
			throw err;
		}
		else {
				console.log("sending products from node");
				res.send(results);
				//res.render('homepage');
			        }

			    },query);

}

exports.getMyAds = function(req,res){
	var query = "select * from product where seller_id = '"+req.session.userid+"'";
	sqldb.fetchData(function(err,results){
		if(err){
			logger.log('error',"Query: " +query);
			console.log("In error");
			throw err;
		}
		else {
				console.log("sending myAds from node");
				res.send(results);
				//res.render('homepage');
			        }

			    },query);

}



exports.myAds = function(req, res){
	logger.log('info', "User with userid "+req.session.userid+" checking the ads they posted");
	console.log("in homepage");
	res.render('myAds');
	}

exports.homepage = function(req, res){
	console.log("in homepage");
	logger.log('info', "User with userid "+req.session.userid+" at homepage");
	res.render('homepage');
	}