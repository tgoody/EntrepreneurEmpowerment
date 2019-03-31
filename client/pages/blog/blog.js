angular.module('listings').controller('ListingsController', ['$scope', 'Listings',
  function($scope, Listings) {
    // initialize empty array for blog posts
    $scope.blogPosts = [];

    Listings.getBlogs().then(function(response) {
      console.log(response);
      if (response.status === 200) {
        $scope.blogPosts = response.data;
      }
    });

    // $scope.getRecentBlog = function() {
    //   Listings.getMostRecentBlog().then(function(response) {
    //     console.log(response);
    //   });
    // }
  }]);