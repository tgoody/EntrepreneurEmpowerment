angular.module('listings').controller('docsController', ['$rootScope', '$scope', 'Listings',
  function($rootScope, $scope, Listings) { 
      $scope.currentCategory = 0;
      $scope.docs = [];
      $scope.videos = [];
      $scope.resourceType = 'Videos';

      Listings.getDocs($scope.currentCategory).then(function(response) {
          $scope.docs = response.data;
      });

      Listings.getVideos($scope.currentCategory).then(function(response) {
        $scope.videos = response.data;
      });

      $scope.navClicked = function(index) {
        // Update resources
        Listings.getDocs(index).then(function(response) {
          $scope.docs = response.data;
        });
        Listings.getVideos(index).then(function(response) {
          $scope.videos = response.data;
        });
        // update scope index
        $scope.currentCategory = index;
        // Highlight section on side nav
        $('.side-nav-item').removeClass('side-nav-active');
        $('#nav-item-'+index.toString()).addClass('side-nav-active');
      };

      $scope.toggleView = function() {
        if ($scope.resourceType === 'Videos') {
          $scope.resourceType = 'Documents';
          // hide document container and show videos
          $('.docList').addClass('hide');
          $('.vidList').removeClass('hide');
        } else {
          $scope.resourceType = 'Videos';
          // hide video container and show documents
          $('.vidList').addClass('hide');
          $('.docList').removeClass('hide');
        }
      };
      // TODO
      $("#requestUploadFileForm").submit(function(e){
        e.preventDefault();
        // send request to upload doc
      });
    }
]);