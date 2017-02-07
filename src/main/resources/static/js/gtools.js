angular.module('gtools', [])
  .controller('home', function($http) {
  var self = this;
  $http.get('http://localhost:8181/webui/resource/').then(function(response) {
    self.greeting = response.data;
  })
});