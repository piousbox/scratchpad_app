
// From: https://github.com/auth0/angular-jwt

var LoginCtrl = function($scope, $state, $httpProvider, jwtInterceptorProvider) {
  jwtInterceptorProvider.tokenGetter = [function () {}];
}

angular.module('scratchpadApp.login', [
  'ui.router',
  'angular-jwt'
])

.config(
  [         '$stateProvider', '$urlRouterProvider',
    function($stateProvider,   $urlRouterProvider) {
      $stateProvider
        .state('login', {
          url: '/login',
          templateUrl: 'app/login/login.html',
          resolve: {
          },
          controller: ['$scope', '$state', '$http', 'jwtInterceptor', LoginCtrl]
        })
    }
  ]
);
