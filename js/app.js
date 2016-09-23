// ----------------------------------------
// App
// ----------------------------------------

var MyApp = angular.module('MyApp', []);


MyApp.factory('_', ['$window', function($window) {
  return $window._;
}]);


MyApp.run(['_', '$rootScope', function(_, $rootScope) {
  $rootScope.isEmpty = _.isEmpty;
}]);




