(function(){
    'use strict';
    angular.module('app.auth')
    .factory('authService', authService);

    authService.$inject = ['$firebaseAuth', '$http'];

    function authService($firebaseAuth, $http) {
        var authObject = firebase.auth();
        var firebaseAuthObject = $firebaseAuth(authObject);

        var service = {
            firebaseAuthObject: firebaseAuthObject,
            authObject: authObject,
            register: register,
            addUser: addUser,
            login: login,
            logout: logout,
            isLoggedIn: isLoggedIn
        };

        return service;

        ////////////

        function register(user) {
            return firebaseAuthObject.$createUserWithEmailAndPassword(user.email, user.password);
        }

        function addUser(user) {
            return $http.post('/api/accounts', user);
        }

        function login(user) {
            return firebaseAuthObject.$signInWithEmailAndPassword(user.email, user.password);
        }

        function logout() {
            firebaseAuthObject.$signOut();
        }

        function isLoggedIn() {
            return firebaseAuthObject.$getAuth();
        }

    }
})();