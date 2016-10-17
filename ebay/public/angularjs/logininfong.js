var logininfo = angular.module('logininfoapp', []);
logininfo.controller('logininfo', function($scope,$http){

	$scope.getlogininfo=function(req, res){
		console.log("in logininfo angular");
		$http({
			method:'post',
			url:'/logininfo'
			
	}).success(function(data){
		console.log("sending logininfo to logininfo page: angular");
		//console.log(data);
		$scope.getlogininfo=data;
		console.log($scope.getlogininfo);
		//$window.location.assign('/profile');
		})
	}
	
});