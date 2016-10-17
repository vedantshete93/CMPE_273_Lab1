/**
 * http://usejsdoc.org/
 */

exports.answer = function(req, res){
	var num1 = req.param("n1");
	var num2 = req.param("n2");
	var operator ="" +  req.param("op");
	var ans;
	var result;
	if(operator == '/' && num2 == 0){
		result = {"statusCode": 403};
		res.send(result);
	}else if(operator == null || num1 == null || num2 == null){
		result = {"statusCode": 403};
		res.send(result);
	}else{
		 //ans = (num1 + num2); console.log("aaa" + ans);
		switch(operator){
		case "+": ans = (num1 + num2);
		break;
		case "-": ans = (num1 - num2);
		break;
		case "*": ans = (num1 * num2);
		break;
		case "/": ans = (num1 / num2);
		break;
		}
		result = {answer:ans};
		res.send(result);
		
	}
};
	exports.getcalculator = function(req, res){
		res.render('calculator');
	}