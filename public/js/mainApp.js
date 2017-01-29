var app = angular.module('mainApp', ['ngRoute', 'ngResource', 'ngCookies']).run(function($rootScope, $cookieStore, $http, $window) {

	var sessionCookieJson = $cookieStore.get('session_data');
	$rootScope.session_data = null;
	if (sessionCookieJson) $rootScope.session_data = JSON.parse(sessionCookieJson);

	$rootScope.signout = function(){
    	$http.get('/signout');
       	$cookieStore.remove('session_data');
    	$rootScope.session_data = null;
    	$window.location = '/login';
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
			controller: 'usersController'
		})	
		.when('/companies', {
			templateUrl: 'pages/companies.html',
			controller: 'companiesController'
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

app.directive("bsActiveLink", function($location) {
	return {
	    restrict: 'A', //use as attribute 
	    replace: false,
	    link: function (scope, elem) {
	        //after the route has changed
	        scope.$on("$routeChangeSuccess", function () {
	            var hrefs = ['/#' + $location.path(),
	                         '#' + $location.path(), //html5: false
	                         $location.path()]; //html5: true
	            angular.forEach(elem.find('a'), function (a) {
	                a = angular.element(a);
	                if (-1 !== hrefs.indexOf(a.attr('href'))) {
	                    a.addClass('active');
	                } else {
	                    a.removeClass('active');   
	                };
	            });     
	        });
	    }
	}
});

app.controller('mainController', function(postService, $scope, $rootScope, $log, $window) {
	if (!$rootScope.session_data || !$rootScope.session_data.authenticated) {
		$window.location = '/login';
		return;
	}
});

app.controller('usersController', function(postService, $scope, $rootScope, $http, $window) {
	if (!$rootScope.session_data || !$rootScope.session_data.authenticated) {
		$window.location = '/login';
		return;
	}

    $http.get('/users').success(function(data) {
     	$scope.users = data;
    });
});

app.controller('companiesController', function(postService, $scope, $rootScope, $http, $window) {
	if (!$rootScope.session_data || !$rootScope.session_data.authenticated) {
		$window.location = '/login';
		return;
	}

    $http.get('/companies').success(function(data) {
    	console.log(data);
     	$scope.companies = data;
    });
});


app.controller('authController', function(postService, $scope, $rootScope, $cookieStore, $http, $window) {	
  $scope.user = {first_name: '', last_name: '', username: '', password: ''};
  $scope.error_message = '';

  $scope.login = function() {
    $http.post('/login', $scope.user).success(function(data) {
      if(data.state == 'success') {
       	$cookieStore.put('session_data', JSON.stringify({ current_user: { name: data.name, username: data.username }, authenticated: true }));
        $window.location = '/';
      }
      else{
        $scope.error_message = data.error_message;
      }
    });
  };

  $scope.signup = function() {
    $http.post('/signup', $scope.user).success(function(data) {
      if(data.state == 'success'){
       	$cookieStore.put('session_data', JSON.stringify({ current_user: { name: data.name, username: data.username }, authenticated: true }));
        $window.location = '/';
      }
      else{
        $scope.error_message = data.error_message;
      }
    });
  };
});