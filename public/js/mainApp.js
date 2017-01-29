var app = angular.module('mainApp', ['ngRoute', 'ngResource']).run(function($rootScope) {
	$rootScope.authenticated = false;
	$rootScope.current_user = '';
	
	$rootScope.signout = function(){
    	$http.get('auth/signout');
    	$rootScope.authenticated = false;
    	$rootScope.current_user = '';
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

app.controller('mainController', function(postService, $scope, $rootScope, $log){	
	$scope.subRoute = "AJskdl";
});