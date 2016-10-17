var mysql = require('mysql');
var sqldb = require('./mysql');
var winston = require('winston');

var logger = new (winston.Logger)({
	transports: [
		new (winston.transports.Console)(),
		new (winston.transports.File)({ filename: 'ebayLog.log' })
	]
});

exports.getbought=function(req,res){
	var query="select * from history where user_id='"+req.session.userid+"'";
	sqldb.fetchData(function(err,results){
		if(err){
			logger.log('error',"Query: " +query);
			console.log("In error");
			throw err;
		}
		else {
				console.log("sending bought products from node");
				res.send(results);
			        }

			    },query);

}

exports.getsold=function(req,res){
	var query="select product.product_id, product.name, history.product_id, history.quantity, history.price from history left join product on history.product_id=product.product_id where history.product_id in (select product_id from product where product.seller_id='"+req.session.userid+"')";
	sqldb.fetchData(function(err,results){
		if(err){
			logger.log('error',"Query: " +query);
			console.log("In error");
			throw err;
		}
		else {
				console.log("sending sold products from node");
				res.send(results);
			        }

			    },query);

}


exports.mysold=function(req,res){
	logger.log('info', "User with userid: "+req.session.userid+" checking products they have sold");
	res.render("sold");
}

exports.mybought = function(req, res){
	logger.log('info', "User with userid: "+req.session.userid+" checking products they bought");
	res.render("bought");
}