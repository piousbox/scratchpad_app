
// From: https://github.com/auth0/angular-jwt
// From: https://www.codementor.io/ruby-on-rails/tutorial/jwt-with-rails-sorcery-angularjs

var LoginCtrl = function ($scope, $state, $http, AuthService) {
  $scope.isAuthed = function () {
    return true;
  };
  $scope.register = function () {
  };
  $scope.login = function () {
    AuthService.login($scope.username, $scope.password);
  };
}

var AuthService = function ($http, $q, $rootScope, $localStorage, AuthEvents) {
    return {
        login: function(username, password) {
            var d = $q.defer();
            $http.post('http://localhost:3020/auth', {
                username: username,
                password: password
            }).success(function(resp) {
                $localStorage.auth_token = resp.auth_token;
                $rootScope.$broadcast(AuthEvents.loginSuccess);
                d.resolve(resp.user);
            }).error(function(resp) {
                $rootScope.$broadcast(AuthEvents.loginFailed);
                d.reject(resp.error);
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
            /* var AuthEvents = $injector.get('AuthEvents');
            var matchesAuthenticatePath = response.config && response.config.url.match(new RegExp('/api/auth'));
            if (!matchesAuthenticatePath) {
                $injector.get('$rootScope').$broadcast({
                    401: AuthEvents.notAuthenticated,
                    403: AuthEvents.notAuthorized,
                    419: AuthEvents.sessionTimeout
                }[response.status], response);
            } */
            if (response.status === 401 || response.status === 403) {
                storage.unset('auth_token');
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
.config(
  [         '$stateProvider', '$urlRouterProvider',
    function($stateProvider,   $urlRouterProvider) {
      $stateProvider
        .state('login', {
          url: '/login',
          templateUrl: 'app/auth/login.html',
          resolve: {
          },
          controller: ['$scope', '$state', '$http', 'AuthService', LoginCtrl]
        })
    }
  ]
);
