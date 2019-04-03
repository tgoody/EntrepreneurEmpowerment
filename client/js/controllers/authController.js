angular.module('app.auth').controller('AuthController', ['$scope', 'authService', '$location',
  function($scope, authService, $location) {
    $scope.addAccount = function() {
        if ($scope.account.email !== '' 
            && $scope.account.password != '' && $scope.confirmPassword != '') {
                if ( $scope.account.password == $scope.confirmPassword) {
                    // Sign in user
                    authService.register($scope.account).then(function(response) {
                        console.log('registered user', response);
                        // Create user object in database
                        $scope.account.uid = response.uid;
                        authService.addUser($scope.account).then(function(response) {
                            console.log('added user', response);
                            $scope.userId = $scope.account.uid;
                
                            // send to home page
                            $location.path('home');
                            // Clear form inputs
                            $scope.account.email = '';
                            $scope.account.password = '';
                            $scope.confirmPassword = '';
                            $scope.account.uid = '';
                        });
                    });
                } else {
                    console.log('Passwords do not match');
                }
        } else {
            console.log('Empty fields');
        }
    }

    $scope.googleLogin = function() {
        authService.googleSignIn().then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            if (user) {
                // check if user exists in db, if not add them
                var displayName = user.displayName;
                var email = user.email;
                var uid = user.uid;
                $scope.userId = uid;

                authService.userExists(uid).then(function(response) {
                    var exists = response.data.exists;
                    if (!exists) {
                        var account = {
                            email: email,
                            uid: uid
                        }
                        
                        authService.addUser(account).then(function(response) {
                            console.log(response);
                        });
                    }
                });
                // send to home page
                $location.path('home');
            }
            $scope.account.name = '';
            $scope.account.password = '';
            $scope.confirmPassword = '';
            $scope.account.uid = '';
          }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
            console.log('error code', errorCode);
            console.log('error msg', errorMessage);
          });
    }

    $scope.login = function() {
        if ($scope.account.email !== '' && $scope.account.password != '') {
            authService.login($scope.account).then(function(response) {
                console.log('logged in', response);
                var id = response.uid;
                $scope.userId = id;
                
                // send to home page
                $location.path('home');
                $scope.account.name = '';
                $scope.account.password = '';
                $scope.confirmPassword = '';
                $scope.account.uid = '';
            });
        }
    };
  }]);