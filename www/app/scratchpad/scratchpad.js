
var ScratchpadController = function ($scope, $state, $http) {
  $http.get('http://localhost:3020/api/scratchpad').then(function(data) {
    $scope.someData = data;
  });;
}

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
          controller: ['$scope', '$state', '$http', ScratchpadController]
        })
    }
  ]
);
