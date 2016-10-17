var mysql = require('mysql');
var sqldb = require('./mysql');
var winston = require('winston');

var logger = new (winston.Logger)({
	transports: [
		new (winston.transports.Console)(),
		new (winston.transports.File)({ filename: 'ebayLog.log' })
	]
});

exports.addcart = function(req, res){
	
	var name=req.param("name");
	var productid=req.param("productid");
	var price=req.param("price");
	var quantity=req.param("quantity");
	var total=quantity*price;
	logger.log('info', "User with userid: "+req.session.userid+" adding product to cart");
	console.log(quantity);
	var query = "Insert into cart(product_id, name, price, quantityincart, user_id, total) values ('"+productid+"','"+name+"','"+price+"','"+quantity+"','"+req.session.userid+"','"+total+"')";
	sqldb.fetchData(function(err,results){	
		if(err){
			logger.log('error',"Query: " +query);
			console.log("In error");
			throw err;
		}
		else{
			console.log("product added");
			console.log(results);
		}
			    },query);
};