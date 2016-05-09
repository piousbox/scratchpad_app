
// From: https://github.com/auth0/angular-jwt
// From: https://www.codementor.io/ruby-on-rails/tutorial/jwt-with-rails-sorcery-angularjs
// From: http://jsfiddle.net/ftfish/KyEr3/ - add divs dynamically

var LoginCtrl = function ($rootScope, $scope, $state, $http, $localStorage, AuthService) {
  $rootScope.current_user.username = $localStorage.username;

  $scope.isAuthed = function () {
    return $localStorage.username;
  };
  $scope.register = function () {
  };
  $scope.login = function () {
    AuthService.login($scope.username, $scope.password);
  };
  $scope.logout = function () {
    delete $localStorage.auth_token;
    delete $localStorage.username;
    delete $rootScope.current_user.username;
    delete $scope.username;
    delete $scope.password;
    $rootScope.addAlert({ text: 'Logged out' });
  }
}

var AuthService = function ($http, $q, $rootScope, $localStorage, AuthEvents) {
    return {
        login: function(username, password) {
            var d = $q.defer();
            $http.post('http://staging.api.piousbox.com/auth', {
                username: username,
                password: password
            }).success(function(resp) {
                $localStorage.auth_token = resp.auth_token;
                $localStorage.username = username;
                $rootScope.$broadcast(AuthEvents.loginSuccess);

                $rootScope.current_user = $rootScope.current_user || {};
                $rootScope.current_user.username = $localStorage.username;

                $rootScope.addAlert({ text: 'Logged in' });

                d.resolve(resp.user);
            }).error(function(resp) {
                $rootScope.$broadcast(AuthEvents.loginFailed);
                d.reject(resp.error);
                $rootScope.addAlert({ text: 'Cannot login' });
            });
            return d.promise;
        }
    };
}

var AuthInterceptor = function ($q, $injector) {
    return {
        // This will be called on every outgoing http request
        request: function (config) {
            var storage = $injector.get('$localStorage');
            var token = storage.auth_token;
            config.headers = config.headers || {};
            if (token) {
                config.headers.Authorization = "Bearer " + token;
            }
            return config || $q.when(config);
        },
        // This will be called on every incoming response that has en error status code
        responseError: function (response) {
            var storage = $injector.get('$localStorage');
            var $rootScope = $injector.get('$rootScope');
            if (response.status === 401 || response.status === 403) {
                delete storage.auth_token;
                $rootScope.addAlert({ text: 'Please login' });
                $injector.get('$state').go('login');
            }
            return $q.reject(response);
        }
    };
}

angular.module('scratchpadApp.auth', [
  'ui.router',
  'angular-jwt'
])
.factory('AuthService', ['$http', '$q', '$rootScope', '$localStorage', 'AuthEvents', AuthService])
.factory('AuthInterceptor', ['$q', '$injector', AuthInterceptor])
.constant('AuthEvents', {})
.directive('alert', ['$timeout', '$rootScope', function ($timeout, $rootScope) {  
  return {
    link: function (scope, element, attr) {
      $timeout(function () {
        delete $rootScope.alerts[scope.alert.text];
      }, 3000);
    },
    templateUrl: 'app/auth/alert.html'
  }
}])
.config(
  [         '$stateProvider', '$urlRouterProvider',
    function($stateProvider,   $urlRouterProvider) {
      $stateProvider
        .state('login', {
          url: '/login',
          templateUrl: 'app/auth/login.html',
          resolve: {
          },
          controller: ['$rootScope', '$scope', '$state', '$http', '$localStorage', 'AuthService', LoginCtrl]
        })
    }
  ]
);
