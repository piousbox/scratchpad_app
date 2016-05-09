
angular.module('scratchpadApp', [
  'scratchpadApp.scratchpad',
  'scratchpadApp.auth',

  // 'uiRouterSample.contacts',
  // 'uiRouterSample.contacts.service',
  // 'uiRouterSample.utils.service',
  'ui.router', 
  'ngAnimate',
  'ngStorage',

  'angular-jwt',
])

.run(
  [          '$rootScope', '$state', '$stateParams', 'AuthEvents',
    function ($rootScope,   $state,   $stateParams,   AuthEvents) {

    // It's very handy to add references to $state and $stateParams to the $rootScope
    // so that you can access them from any scope within your applications.For example,
    // <li ng-class="{ active: $state.includes('contacts.list') }"> will set the <li>
    // to active whenever 'contacts.list' or one of its decendents is active.
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;

    $rootScope.alerts = $rootScope.alerts || {};
    $rootScope.current_user = $rootScope.current_user || {};
    // var alertCounter = 0;
    $rootScope.addAlert = function (obj) {
      if (!$rootScope.alerts[obj.text]) {
        $rootScope.alerts[obj.text] = obj;
      }
    };

    /* $rootScope.$on(AuthEvents.notAuthorized, function () {
      console.log('Not Authorized! Take care of it.');
    }); */

    }
  ]
)

.config(
  [          '$stateProvider', '$urlRouterProvider', '$httpProvider',
    function ($stateProvider,   $urlRouterProvider,   $httpProvider) {

      $httpProvider.interceptors.push('AuthInterceptor');

      /////////////////////////////
      // Redirects and Otherwise //
      /////////////////////////////

      // Use $urlRouterProvider to configure any redirects (when) and invalid urls (otherwise).
      $urlRouterProvider

        // The `when` method says if the url is ever the 1st param, then redirect to the 2nd param
        // Here we are just setting up some convenience urls.
        .when('/c?id', '/contacts/:id')
        .when('/user/:id', '/contacts/:id')

        // If the url is ever invalid, e.g. '/asdf', then redirect to '/' aka the home state
        .otherwise('/');

      $stateProvider

        .state("home", {

          // Use a url of "/" to set a state as the "index".
          url: "/",

          // Example of an inline template string. By default, templates
          // will populate the ui-view within the parent state's template.
          // For top level states, like this one, the parent template is
          // the index.html file. So this template will be inserted into the
          // ui-view within index.html.
          template: '<p class="lead">Welcome to the UI-Router Demo</p>' +
            '<p>Use the menu above to navigate. ' +
            'Pay attention to the <code>$state</code> and <code>$stateParams</code> values below.</p>' +
            '<p>Click these links—<a href="#/c?id=1">Alice</a> or ' +
            '<a href="#/user/42">Bob</a>—to see a url redirect in action.</p>'

        })

        .state('about', {
          url: '/about',

          // Showing off how you could return a promise from templateProvider
          templateProvider: ['$timeout',
            function (        $timeout) {
              return $timeout(function () {
                return '<p class="lead">UI-Router Resources</p><ul>' +
                         '<li><a href="https://github.com/angular-ui/ui-router/tree/master/sample">Source for this Sample</a></li>' +
                         '<li><a href="https://github.com/angular-ui/ui-router">Github Main Page</a></li>' +
                         '<li><a href="https://github.com/angular-ui/ui-router#quick-start">Quick Start</a></li>' +
                         '<li><a href="https://github.com/angular-ui/ui-router/wiki">In-Depth Guide</a></li>' +
                         '<li><a href="https://github.com/angular-ui/ui-router/wiki/Quick-Reference">API Reference</a></li>' +
                       '</ul>';
              }, 100);
            }]
        })

        /* .state('login', {
          url: '/login',
          templateUrl: "/templates/login.html",
          controller: 'LoginCtrl'
        })

        .state('scratchpad', {
          url: '/scratchpad',
          templateUrl: "/templates/scratchpad.html"
        }) */

    }
  ]
);
