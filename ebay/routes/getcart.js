var mysql = require('mysql');
var sqldb = require('./mysql');
var winston = require('winston');

var logger = new (winston.Logger)({
	transports: [
		new (winston.transports.Console)(),
		new (winston.transports.File)({ filename: 'ebayLog.log' })
	]
});

exports.getcart = function(req, res){
	
	var query = "select product.quantity, cart.cart_id, cart.product_id, cart.name, cart.price, cart.quantityincart, cart.user_id, cart.total from product join cart where product.product_id = cart.product_id and cart.user_id='"+req.session.userid+"'";
	
	sqldb.fetchData(function(err,results){	
		if(err){
			logger.log('error',"Query: " +query);
			console.log("In error");
			throw err;
		}
		else{
			console.log("In getcart node");
			res.send(results);
		}
			    },query);
};

exports.removeitem = function(req, res){
	var product_id = req.param("product_id");
	var cart_id = req.param("cart_id");
	console.log(product_id);
	logger.log('info', "User with userid: "+req.session.userid+" removing products from cart");
	var query = "delete from cart where product_id='"+product_id+"' and cart_id='"+cart_id+"' and user_id='"+req.session.userid+"'";
	sqldb.fetchData(function(err,results){	
		if(err){
			logger.log('error',"Query: " +query);
			console.log("In error");
			throw err;
		}
		else{
			console.log("Item deleted successfully");
			//console.log(results.length);
			res.render("cart");
		}
			    },query);
	
};

exports.checkout = function(req, res){
	var getcartitems = req.param("getcartitems");
	
	for(i=0;i<getcartitems.length;i++){
		var query="Update cart set quantityincart='"+getcartitems[i].quantityincart+"', total='"+getcartitems[i].total+"' where product_id='"+getcartitems[i].product_id+"' and cart_id='"+getcartitems[i].cart_id+"'";
	//var query = "Update cart set quantityincart='"+quantityincart+"' where cart_id='"+cart_id+"' and product_id='"+product_id+"'";
	sqldb.fetchData(function(err,results){	
		if(err){
			console.log("In error");
			throw err;
		}
		else{
		console.log("Quantity updated successfully");
			//console.log(results.length);
			//res.render("cart");
		}
			    },query);}
	res.render("payment");
};

exports.payment=function(req,res){
	res.render("payment");
}


exports.cart=function(req,res){
	logger.log('info', "User with userid: "+req.session.userid+" checking their cart");
	res.render("cart");
};