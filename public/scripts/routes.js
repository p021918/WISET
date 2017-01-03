/**
 * Router Config
 * This is the router definition that defines all application routes.
 */
define(['angular', 'angular-ui-router'], function (angular) {
    'use strict';
    return angular.module('app.routes', ['ui.router']).config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {

        //Turn on or off HTML5 mode which uses the # hash
        $locationProvider.html5Mode(true).hashPrefix('!');

        /**
         * Router paths
         * This is where the name of the route is matched to the controller and view template.
         */
        $stateProvider
            .state('secure', {
                template: '<ui-view/>',
                abstract: true,
                resolve: {
                    authenticated: ['$q', 'PredixUserService', function ($q, predixUserService) {
                        var deferred = $q.defer();
                        predixUserService.isAuthenticated().then(function (userInfo) {
                            deferred.resolve(userInfo);
                        }, function () {
                            deferred.reject({code: 'UNAUTHORIZED'});
                        });
                        return deferred.promise;
                    }]
                }
            })
            .state('live-dustdensity', {
                parent: 'secure',
                url: '/live-dustdensity',
                templateUrl: 'views/live-dustdensity.html',
                controller: 'LiveDustDensityCtrl'
            })
            .state('dust-density', {
                parent: 'secure',
                url: '/dust-density',
                templateUrl: 'views/dust-density.html',
                controller: 'DustDensityCtrl'
            })
            .state('blank-sub-page', {
                url: '/blank-sub-page',
                templateUrl: 'views/blank-sub-page.html'
            })
            .state('about', {
                url: '/about',
                templateUrl: 'views/about.html'
            });

        $urlRouterProvider.otherwise(function ($injector) {
            var $state = $injector.get('$state');
            document.querySelector('px-app-nav').markSelected('/dashboards');
            $state.go('live-dustdensity');
        });

    }]);
});
