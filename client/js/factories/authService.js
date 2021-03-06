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
            userExists: userExists,
            isAdmin: isAdmin,
            updateEmail: updateEmail,
            updatePassword: updatePassword,
            login: login,
            googleSignIn: googleSignIn,
            logout: logout
        };

        return service;

        ////////////

        function register(user) {
            return firebaseAuthObject.$createUserWithEmailAndPassword(user.email, user.password);
        }

        function addUser(user) {
            return $http.post('/api/accounts', user);
        }

        function userExists(uid) {
            return $http.post('/api/accounts/exists', uid);
        }

        function isAdmin(uid) {
            return $http.post('/api/accounts/checkAdmin', uid);
        }

        function updateEmail(email) {
            return firebaseAuthObject.$updateEmail(email);
        }

        function updatePassword(password) {
            return firebaseAuthObject.$updatePassword(password);
        }

        function login(user) {
            return firebaseAuthObject.$signInWithEmailAndPassword(user.email, user.password);
        }

        function googleSignIn() {
            var provider = new firebase.auth.GoogleAuthProvider();
            return firebase.auth().signInWithPopup(provider);
        }

        function logout() {
            firebaseAuthObject.$signOut();
        }

    }
})();
