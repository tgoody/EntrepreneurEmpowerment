angular.module('app.auth').controller('navController', ['$scope', 'authService', '$location',
  function($scope, authService, $location) {
    $scope.isAdmin = false;
    // console.log(authService.firebaseAuthObject);
    // highlight correct nav btn
    activebtn($location.$$url.substring(1));
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          console.log('logged in');
          $scope.userId = user.uid;
          authService.isAdmin({uid: $scope.userId}).then(function(response) {
            // makes sure ng-show actually updates
            $scope.isAdmin = response.data;
          });
          $scope.$apply(function(){
            $scope.loggedIn = true;
          });
        } else {
          // No user is signed in.
          console.log('signed out');
          $scope.userId = null;
          $scope.$apply(function(){
            $scope.loggedIn = false;
          });
          $scope.isAdmin = false;
        }
    });

    $scope.logout = function() {
        authService.logout();
        $scope.userId = null;
        $scope.loggedIn = false;
    };

    $scope.setActiveBtn = function(id) {
      activebtn(id);
    };

    function activebtn(id) {
      $('.nav-btn').removeClass('active');
      $('#nav-'+id).addClass('active');
    }
  }]);