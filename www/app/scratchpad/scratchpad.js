
var ScratchpadController = function ($scope, $rootScope, $state, $http, Config) {
  $http.get(Config.api_endpoint + '/scratchpad').then(function (data) {
    $scope.scratchpadData = data.data;
  });
  $scope.save = function () {
    $http.post(Config.api_endpoint + '/scratchpad', {
      data: $scope.scratchpadData
    }).then(function (data) {
      $rootScope.addAlert({ text: 'Saved' });
    });
  }
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
          controller: ['$scope', '$rootScope', '$state', '$http', 'Config', ScratchpadController]
        })
    }
  ]
);
