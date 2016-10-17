var mysql = require('mysql');
var sqldb = require('./mysql');
var winston = require('winston');

var logger = new (winston.Logger)({
	transports: [
		new (winston.transports.Console)(),
		new (winston.transports.File)({ filename: 'ebayLog.log' })
	]
});

exports.ended=function(req,res){
	"use strict";
	var getcart = "Select * from cart where user_id='"+req.session.userid+"'";
	sqldb.fetchData(function(err,results){
		if(err){
			console.log("In error");
			throw err;
		}
		else {
			for(let i=0;i<results.length;i++){
				
				var inserthistory = "Insert into history (product_id, name, price, quantity, user_id) values ('"+results[i].product_id+"','"+results[i].name+"','"+results[i].price+"','"+results[i].quantityincart+"','"+req.session.userid+"')";
				sqldb.storeData(function(err,results1){
					if(err){
						logger.log('error',"Query: " +inserthistory);
						console.log("In error");
						throw err;
					}
					else {
						console.log(results[i]);
						console.log("History stored");
						var updateproduct = "Update product set quantity=quantity-'"+results[i].quantityincart+"' where product_id='"+results[i].product_id+"'";
						sqldb.storeData(function(err,results3){
							if(err){
								logger.log('error',"Query: " +updateproduct);
								console.log("In error");
								throw err;
							}
							else {
								console.log("quantity updated in cart table");
									var emptycart = "delete from cart where user_id='"+req.session.userid+"' and product_id='"+results[i].product_id+"'";
									sqldb.storeData(function(err,results2){
										if(err){
											logger.log('error',"Query: " +emptycart);
											console.log("In error");
											throw err;
										}
										else {
												console.log("transaction done!");
												logger.log('info', "User with userid: "+req.session.userid+" has completed their transaction");
												res.render('homepage');
											        }

											    },emptycart);
								 }

								    },updateproduct);
			 }
		},inserthistory);
	}
}

},getcart);

};