angular.module('teamMotivate')

.config(['$stateProvider', function($stateProvider) {
	$stateProvider.state('login', {
    	url: '/login',
    	templateUrl: '/app/login/login.html',
    	controller: 'SessionCtrl'
    });
}])

.controller('SessionCtrl', [
	'$http',
	'$scope',
	'$location',
	'session',
	function($http, $scope, $location, session) {

		$scope.authenticate = function() {
			if ($scope.name === '') { return; }
			var userFields = {
				username: $scope.name,
				password: $scope.password
			}
			console.log(userFields);
			$http.post('/sessions', userFields).success(function(response) {
			  	console.log(response);
			  	if (response.success === true) {
			  		session.name = userFields.username;
			  		console.log(session);
			  	}
			  });
			$scope.name = '';
			$scope.password = '';
			$location.path('home');
		}
	}
])