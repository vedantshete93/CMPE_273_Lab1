var mysql = require('mysql');
var sqldb = require('./mysql');
var winston = require('winston');
var moment = require('moment');

var logger = new (winston.Logger)({
	transports: [
		new (winston.transports.Console)(),
		new (winston.transports.File)({ filename: 'ebayLog.log' })
	]
});

exports.sellitem = function(req,res){
	var name = req.param("name");
	var description = req.param("description");
	var price = req.param("price");
	var quantity = req.param("quantity");
	var isCreated=Date.now()/1000;
	var shippedfrom = req.param("shippedfrom");
	var query="Insert into product (name, description, price, quantity, shippedfrom, seller_id, isCreated, forBid) values ('"+name+"','"+description+"','"+price+"','"+quantity+"','"+shippedfrom+"','"+req.session.userid+"','"+isCreated+"',0)";
	console.log("Product registered");
	sqldb.storeData(function(Error,results) 
	{
	if(Error){
		logger.log('error',"Query: " +query);
		throw Error;
	}
	else{
		res.render('homepage');
		//console.log(results);
	}
	}, query);

}

exports.postbid = function(req,res){
	var name = req.param("name");
	var description = req.param("description");
	var price = req.param("price");
	var isCreated=Date.now()/1000;
	var quantity = req.param("quantity");
	var shippedfrom = req.param("shippedfrom");
	var query="Insert into product (name, description, price, quantity, shippedfrom, seller_id, isCreated, isStopped, forBid) values ('"+name+"','"+description+"','"+price+"','"+quantity+"','"+shippedfrom+"','"+req.session.userid+"','"+isCreated+"','"+isCreated+96*60*60+"',1)";
	console.log("Product registered");
	sqldb.storeData(function(Error,results) 
	{
	if(Error){
		logger.log('error',"Query: " +query);
		throw Error;
	}
	else{
		res.render('homepage');
		//console.log(results);
	}
	}, query);

}

exports.sell = function(req,res){
	logger.log('info', "User with userid: "+req.session.userid+" posting ads to sell product");
	res.render('sell');
}