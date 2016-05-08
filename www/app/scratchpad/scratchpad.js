
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
          controller: ['$scope', '$state',
            function (  $scope,   $state) {
              console.log('scratchpad ctrl');
            }]
        })
    }
  ]
);
