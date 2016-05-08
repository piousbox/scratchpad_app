
angular.module('scratchpadApp.login', [
  'ui.router'
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
          controller: ['$scope', '$state',
            function (  $scope,   $state) {
              console.log('login ctrl');
            }]
        })
    }
  ]
);
