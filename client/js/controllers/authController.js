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
                            localStorage.setItem('userId', $scope.account.uid);
                            $scope.userId = $scope.account.uid;
                
                            // send to home page
                            $location.path('home');
                            // Clear form inputs
                            $scope.account.name = '';
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

    $scope.login = function() {
        authService.login($scope.account).then(function(response) {
            console.log('logged in', response);
            var id = response.uid;
            localStorage.setItem('userId', id);
            $scope.userId = id;
            
            // send to home page
            $location.path('home');
        });
    };
  }]);