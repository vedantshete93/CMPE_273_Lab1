var mysql = require('mysql');
var sqldb = require('./mysql');
var bcrypt = require('bcrypt-nodejs');
var winston = require('winston');

var logger = new (winston.Logger)({
	transports: [
		new (winston.transports.Console)(),
		new (winston.transports.File)({ filename: 'ebayLog.log' })
	]
});

exports.check=function(req,res)
{
	var email=req.param("email");
	var password=req.param("password");
	logger.log('info', "User trying to login in");
	var userdata={
		username:email,
		password:password
	};
console.log(email+password);
req.session.email = email;
var query = "select * from user where email='"+email+"'";
sqldb.fetchData(function(err,results){
	if(err){
		console.log("In error");
		throw err;
	}
	else if(results.length > 0){
			console.log("valid Login");
			if(bcrypt.compareSync(password, results[0].password)){
			req.session.userid = results[0].id;
			req.session.fname = results[0].fname;
			res.send(results);
			//res.render('homepage');
		        }
	else{
		logger.log('error', "User failed to login");
		console.log("invalid login");
		results = {"statusCode":403};
		res.send(results);
	}
			}
	
		    },query);

	};
	
	exports.reg=function(req,res)
	{
		logger.log('info', "User registering");
		var firstname=req.param("firstname");
		var lastname=req.param("lastname");
		var email=req.param("email");
		var pass=req.param("password");
		req.session.email=email;
		var crypted = bcrypt.hashSync(pass);
		console.log(crypted);
		console.log(email);
//		var userdata={
//			username:email,
//			password:pass,
//			fname:firstname,
//			lname:lastname
//		};
		console.log(email);
		var query="Insert into user(fname,lname,email,password,lastlogin) values ('"+firstname+"','"+lastname+"','"+email+"','"+crypted+"','');";
		console.log("In registration page");
		sqldb.storeData(function(Error,results) 
		{
			if(Error){
		
			console.log("In error");
			throw Error;
		}else{
		console.log("user registered");	
		
		res.render('register1');
		}
		}, query);
		
	};
	
	exports.reg1=function(req,res)
	{
		console.log("register node.js");
		var birthday = req.param("birthday");
		var handle = req.param("handle");
		var mobile = req.param("mobile");
		var place = req.param("place");
		var query="Update user set birthday='"+birthday+"', handle='"+handle+"', mobile='"+mobile+"', place='"+place+"' where email='"+req.session.email+"'";
		console.log("In registration 1 page's node");
		sqldb.storeData(function(Error,results) 
		{
			if(Error){
				logger.log('error', "User failed to register");
			console.log("In error");
			throw Error;
		}else{
		console.log("user registered:"+results);	
		res.render('signin');
		}
		}, query);
		logger.log('info', "User registered");
	};
	
	
	exports.emailnotreg = function(req, res){
		console.log("checking if email is registered: node");
		var email = req.param("email");
		
		var query="select * from user where email='"+email+"'";
		console.log(email);
		sqldb.fetchData(function(Error, results)
				{
					if(Error){
						console.log("In error");
						throw Error;
					}else if(results.length>0){
						results = {"statusCode":202};
						res.send(results);
					        }
				else{
					console.log("Email not registered: node");
					results = {"statusCode":403};
					res.send(results);
				}
				
					    },query);

				};
				

				exports.emailreg = function(req, res){
					console.log("checking that email is not registered: node");
					var email = req.param("email");
					
					var query="select * from user where email='"+email+"'";
					console.log(email);
					sqldb.fetchData(function(Error, results)
							{
								if(Error){
									console.log("In error");
									throw Error;
								}else if(results.length>0){
									results = {"statusCode":403};
									res.send(results);
								        }
							else{
								console.log("Continue registration: node");
								results = {"statusCode":202};
								res.send(results);
							}
							
								    },query);

							};

							exports.check_handle = function(req, res){
								console.log("checking that handle is not registered: node");
								var handle = req.param("handle");
								
								var query="select * from user where handle='"+handle+"'";
								
								sqldb.fetchData(function(Error, results)
										{
											if(Error){
												console.log("In error");
												throw Error;
											}else if(results.length>0){
												results = {"statusCode":403};
												res.send(results);
											        }
										else{
											console.log("Continue registration: node");
											results = {"statusCode":202};
											res.send(results);
										}
										
											    },query);

										};

				
	exports.register1 = function(req, res){
		res.render('register1');
		};
	
	
	exports.signin = function(req, res){
		res.render('signin');
		};
	
	
	