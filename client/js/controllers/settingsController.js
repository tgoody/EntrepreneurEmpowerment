angular.module('app.auth').controller('SettingsController', ['$rootScope', '$scope', 'authService', '$location',
  function($rootScope, $scope, authService, $location) {
    setTimeout(function() {
        if(!$rootScope.loggedIn) {
            $scope.$apply(function() {
                $location.path("home");
            });
        }
        $scope.settingsEmail = $rootScope.email;
    }, 100);

    $scope.updateEmail = function() {
        if ($scope.settingsEmail !== '' && $scope.settingsEmail !== $rootScope.email) {
            authService.updateEmail($scope.settingsEmail)
            .then(function(response) {
                console.log(response)
            });
        }
    };

    $scope.updatePassword = function() {
        if ($scope.settingsPassword !== '' && $scope.settingsConfirmPassword !== '') {
            if ($scope.settingsPassword == $scope.settingsConfirmPassword) {
                authService.updatePassword($scope.settingsPassword)
                .then(function(response) {
                    console.log(response)
                });
            }
        }
    };
  }]);