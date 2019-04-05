(function(){
    'use strict';

    angular.module('EntrepreneurApp').config(configFunction);

    configFunction.$inject = ['$routeProvider'];

    function configFunction($routeProvider) {
        $routeProvider.when('/home', {
            templateUrl: '../pages/home.html',
            controller: 'blogController'
        })
        .when('/about', {
            templateUrl: '../pages/about.html'
        })
        .when('/admin', {
            templateUrl: '../pages/adminPanel.html',
            controller: 'adminController'
        })
        .when('/blog', {
            templateUrl: '../pages/blog.html',
            controller: 'blogController'
        })
        .when('/calendar', {
            templateUrl: '../pages/calendar.html',
            controller: 'calendarController'
        })
        .when('/resources', {
            templateUrl: '../pages/docs.html',
            controller: 'docsController'
        })
        .when('/login', {
            templateUrl: '../pages/login.html',
            controller: 'AuthController'
        })
        .when('/register', {
            templateUrl: '../pages/register.html',
            controller: 'AuthController'
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
})();