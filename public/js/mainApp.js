var app = angular.module('mainApp', ['ngRoute', 'ngResource']).run(function($rootScope) {
	$rootScope.authenticated = false;
	$rootScope.current_user = {};
	
	$rootScope.signout = function(){
    	$http.get('auth/signout');
    	$rootScope.authenticated = false;
    	$rootScope.current_user = {};
	};
});

app.config(function($routeProvider, $locationProvider){
	$routeProvider
		.when('/', {
			templateUrl: 'pages/dashboard.html',
			controller: 'mainController'
		})		
		.when('/users', {
			templateUrl: 'pages/users.html',
			controller: 'mainController'
		})	
		.when('/companies', {
			templateUrl: 'pages/companies.html',
			controller: 'mainController'
		})
		.when('/events', {
			templateUrl: 'pages/events.html',
			controller: 'mainController'
		})
		.when('/trades', {
			templateUrl: 'pages/trades.html',
			controller: 'mainController'
		})
		.when('/profile/edit', {
			templateUrl: 'pages/profileEdit.html',
			controller: 'mainController'
		});
});

app.factory('postService', function($resource){
	return $resource('/api/posts/:id');
});

app.controller('mainController', function(postService, $scope, $rootScope, $log) {
	if (!$rootScope.authenticated) {
		$location.path('/');
	}
});

app.controller('authController', function(postService, $scope, $rootScope, $log) {	
  $scope.user = {first_name: '', last_name: '', username: '', password: ''};
  $scope.error_message = '';

  $scope.login = function() {
    $http.post('/login', $scope.user).success(function(data){
      if(data.state == 'success'){
        $rootScope.authenticated = true;
        $rootScope.current_user = data.user;
        $location.path('/');
      }
      else{
        $scope.error_message = data.message;
      }
    });
  };

  $scope.signup = function() {
    $http.post('/signup', $scope.user).success(function(data){
      if(data.state == 'success'){
        $rootScope.authenticated = true;
        $rootScope.current_user = data.user.username;
        $location.path('/');
      }
      else{
        $scope.error_message = data.message;
      }
    });
  };
});