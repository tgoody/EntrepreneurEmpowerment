angular.module('app.auth').controller('navController', ['$rootScope', '$scope', 'authService', '$location',
  function($rootScope, $scope, authService, $location) {
    $scope.isAdmin = false;
    // highlight correct nav btn
    $scope.$on('$routeChangeStart', function($event, next, current) { 
      // update nav bar active
      $scope.currentPage = $location.$$url.substring(1);
    });
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          console.log('logged in');
          $rootScope.userId = user.uid;
          authService.isAdmin({uid: $rootScope.userId}).then(function(response) {
            // makes sure ng-show actually updates
            $scope.isAdmin = response.data;
          });
          $scope.$apply(function(){
            $rootScope.loggedIn = true;
          });
        } else {
          // No user is signed in.
          console.log('signed out');
          $rootScope.userId = null;
          $scope.$apply(function(){
            $rootScope.loggedIn = false;
          });
          $scope.isAdmin = false;
        }
    });

    $scope.logout = function() {
        authService.logout();
        $rootScope.userId = null;
        $rootScope.loggedIn = false;
    };

    // $scope.setActiveBtn = function(id) {
    //   activebtn(id);
    // };

    // function activebtn(id) {
    //   $('.nav-btn').removeClass('active');
    //   $('#nav-'+id).addClass('active');
    // }
  }]);