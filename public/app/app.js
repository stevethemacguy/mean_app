angular.module('app', ['ngResource', 'ngRoute']);

angular.module('app').config(function($routeProvider, $locationProvider) {
    //Turn on HTML5 mode for routing
    $locationProvider.html5Mode(true);
    $routeProvider
        .when('/',
            {
                templateUrl: '/partials/main', //The view to use
                controller: 'mainCtrl'
            });
});

//basic controller
angular.module('app').controller('mainCtrl', function($scope) {
    $scope.myVar = "Hello Angular";
});