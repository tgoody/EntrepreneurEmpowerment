angular.module('app.auth').controller('AuthController', ['$scope', 'authService',
  function($scope, authService) {
    $scope.addAccount = function() {
        authService.addUser($scope.account).then(function(response) {
            console.log('added user', response);
            var id = response.data._id;
            localStorage.setItem('userId', id);
            $scope.userId = id;

            // send to home page
            window.location.href = "../../index.html";
            // Clear form inputs
            $scope.account.name = '';
            $scope.account.code = '';
            $scope.account.address = '';
        });
        if ($scope.account.email !== '' 
            && $scope.account.password != '' && $scope.confirmPassword != '') {
                if ( $scope.account.password == $scope.confirmPassword) {
                    // Sign in user
                    // authService.register($scope.account).then(function(response) {
                    //     console.log('registered user', response);
                    //     // Create user object in database
                    // });
                } else {
                    console.log('Passwords do not match');
                }
        } else {
            console.log('Empty fields');
        }
    }

    $scope.logout = function() {
        authService.logout();
        localStorage.setItem('userId', 'false');
        $scope.userId = 'false';
        $scope.isAdmin = false;
    };
  }]);