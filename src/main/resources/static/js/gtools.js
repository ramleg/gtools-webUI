angular.module('gtools', [ 'ngRoute' ])
  .config(function($routeProvider, $httpProvider) {

    $routeProvider.when('/', {
      templateUrl : 'home.html',
      controller : 'home',
      controllerAs: 'controller'
    }).when('/login', {
      templateUrl : 'login.html',
      controller : 'navigation',
      controllerAs: 'controller'
    }).otherwise('/');

    $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    
  })
  .controller('home', function($http) {
        var self = this;
        $http.get('token').then(function (response) {
            console.log(response.data.token);
            $http({
//                url:'http://10.80.10.148:8080/resourceapi/greetings',
                url:'http://localhost:8181//resource-api/hello',
                method:'GET',
                headers:{'X-Auth-Token':response.data.token}
            })
            .then(function (response){
                self.greeting = response.data;
            });
        })
    })
  .controller('navigation', function($rootScope, $http, $location) {
            
        var self = this;

        var authenticate = function(credentials, callback) {

            var headers = credentials ? {authorization : "Basic "
                + btoa(credentials.username + ":" + credentials.password)
                } : {};

            $http.get('auth', {headers : headers}).then(function(response) {
                if (response.data.name) {
                    $rootScope.authenticated = true;
                } else {
                    $rootScope.authenticated = false;
                }
                callback && callback();
            }, function() {
                $rootScope.authenticated = false;
                callback && callback();
            });

        }

        authenticate();
        self.credentials = {};
        self.login = function() {
                authenticate(self.credentials, function() {
                if ($rootScope.authenticated) {
                    $location.path("/");
                    self.error = false;
                } else {
                    $location.path("/login");
                    self.error = true;
                }
            });
        };

        self.logout = function() {
            $http.post('logout', {}).finally(function() {
                $rootScope.authenticated = false;
                $location.path("/");
            });
        }

    });