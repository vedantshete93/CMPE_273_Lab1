var productdetail = angular.module('productdetailapp', []);
productdetail.controller('productdetail', function($scope,$http){

	$scope.productdetail=function(req, res){
		
		console.log("in profile angular");
		$http({
			method:'post',
			url:'/productdetail'
			
	}).success(function(data){
		console.log("getting product detail on product detail page");
		$scope.getproduct = data;
		})
	}
	
	$scope.addcart = function(req,res){
		console.log($scope.name);
		alert("Product is successfully added to cart!");
		$http({
			method:'post',
			url:'/addcart',
			data:{
				"name":$scope.name,
				"productid":$scope.product_id,
				"price":$scope.price,
				"quantity":$scope.quantity,
				"seller":$scope.seller
				}
			}).success(function(data){
				//console.log(data);
				
	}).error(function(error) {
			console.log("error");
		})
		
	}
	
$scope.productbid=function(req, res){
		
		console.log("in productbid angular");
		$http({
			method:'post',
			url:'/productbid'
			
	}).success(function(data){
		console.log("getting product detail on product detail page");
		$scope.getbidproduct = data;
		})
	}
	
	
});