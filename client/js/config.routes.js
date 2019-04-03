(function(){
    'use strict';

    angular.module('EntrepreneurApp').config(configFunction);

    configFunction.$inject = ['$routeProvider'];

    function configFunction($routeProvider) {
        $routeProvider.when('/home', {
            templateUrl: '../pages/home.html'
            // resolve: { user: resolveUser }
        })
        .when('/about', {
            templateUrl: '../pages/about.html'
            // resolve: { user: resolveUser }
        })
        .when('/admin', {
            templateUrl: '../pages/adminPanel.html',
            controller: 'adminController'
            // resolve: { user: resolveUser }
        })
        .when('/blog', {
            templateUrl: '../pages/blog.html',
            controller: 'blogController'
            // resolve: { user: resolveUser }
        })
        .when('/calendar', {
            templateUrl: '../pages/calendar.html',
            controller: 'calendarController'
            // resolve: { user: resolveUser }
        })
        .when('/resources', {
            templateUrl: '../pages/docs.html',
            controller: 'docsController'
            // resolve: { user: resolveUser }
        })
        .when('/login', {
            templateUrl: '../pages/login.html',
            controller: 'AuthController'
            // resolve: { user: resolveUser }
        })
        .when('/register', {
            templateUrl: '../pages/register.html',
            controller: 'AuthController'
            // resolve: { user: resolveUser }
        })
        .when('/partners', {
            templateUrl: '../pages/partners.html'
        })
        .when('/research', {
            templateUrl: '../pages/research.html'
        })
        .when('/spoder', {
            templateUrl: '../pages/spoder.html'
        })
        .otherwise({
            redirectTo: 'home'
        })
    }

    // resolveUser.$inject = ['authService'];

    // function resolveUser(authService) {
    //     return authService.firebaseAuthObject.$requireSignIn();
    // }
})();