
angular.module('scratchpadApp.scratchpad', [
  'ui.router'
])

.config(
  [         '$stateProvider', '$urlRouterProvider',
    function($stateProvider,   $urlRouterProvider) {
      $stateProvider
        .state('scratchpad', {
          url: '/scratchpad',
          templateUrl: 'app/scratchpad/scratchpad.html',
          resolve: {
          },
          controller: ['$scope', '$state', '$http',
            function (  $scope,   $state,   $http) {
              console.log('aaa');
              $http.get('https://crossorigin.me/https://google.com').then(function(data) {
                $scope.someData = data;
              });;
            }]
        })
    }
  ]
);
