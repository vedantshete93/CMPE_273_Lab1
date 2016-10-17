var cal = angular.module('calculatorapp',[]);
cal.controller('calcontrol', function($scope, $http){
	$scope.zeroerror = true;
	$scope.showanswer = true;
	$scope.answer;
	$scope.submit = function() { 
		$http({	
			method : "POST",
			url : '/answer',
			data : {
				"n1" : $scope.num1,
				"n2": $scope.num2,
			}
		}).success(function(data) {
			//checking the response data for statusCode
			if (data.statusCode == 403) {
				$scope.zeroerror = false;
				$scope.showanswer = true;
			}else{
				$scope.showanswer = false;
				$scope.zeroerror = true;
				$scope.answer = data.answer;
			}
			
				//Making a get call to the '/redirectToHomepage' API
				//window.location.assign("/homepage"); 
		}).error(function(error) {
			$scope.zeroerror = true;
			$scope.showanswer = true;
		})
	};
})