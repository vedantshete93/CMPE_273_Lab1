var mysql = require('mysql');
var sqldb = require('./mysql');
var winston = require('winston');

var logger = new (winston.Logger)({
	transports: [
		new (winston.transports.Console)(),
		new (winston.transports.File)({ filename: 'ebayLog.log' })
	]
});

exports.productdetail = function(req, res){
	var productid = req.param("productid");
	console.log(productid);
	var query = "select product.name, product.description, product.price, product.product_id, product.quantity, product.shippedfrom, user.id, user.fname, user.lname, user.mobile from product join user where product.seller_id = user.id and product.product_id='"+productid+"'";
	sqldb.fetchData(function(err,results){	
		if(err){
			logger.log('error',"Query: " +query);
			console.log("In error");
			throw err;
		}
		else{
			logger.log('info', "User with userid: "+req.session.userid+" checking product details");
			console.log("productdetail page retrieved");
			console.log(results);
			res.render("productdetail.ejs",{result:results});
		}
			    },query);
};

exports.productbid = function(req, res){
	var productid = req.param("productid");
	console.log(productid);
	var query = "select product.name, product.description, product.price, product.product_id, product.quantity, product.shippedfrom, user.id, user.fname, user.lname, user.mobile from product join user where product.seller_id = user.id and product.product_id='"+productid+"'";
	sqldb.fetchData(function(err,results){	
		if(err){
			logger.log('error',"Query: " +query);
			console.log("In error");
			throw err;
		}
		else{
			logger.log('info', "User with userid: "+req.session.userid+" checking posting a bid");
			console.log("productdetail page retrieved");
			console.log(results);
			res.render("productbid.ejs",{result:results});
		}
			    },query);
};