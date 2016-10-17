var profile = angular.module('profileapp', []);
profile.controller('profile', function($scope,$http){

	$scope.getprofile=function(req, res){
		console.log("in profile angular");
		$http({
			method:'post',
			url:'/profile'
			
	}).success(function(data){
		console.log("sending profile to profile page: angular");
		//console.log(data);
		$scope.getprofile=data;
		console.log($scope.getprofile);
		//$window.location.assign('/profile');
		})
	}
	
});