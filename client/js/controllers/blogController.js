angular.module('listings').controller('blogController', ['$rootScope', '$scope', 'Listings', '$location',
  function($rootScope, $scope, Listings, $location) {
    // initialize empty array for blog posts
    $scope.blogPosts = [];
    $scope.latestPost = null;

    Listings.getBlogs().then(function(response) {
      console.log(response);
      if (response.status === 200) {
        $scope.blogPosts = response.data;
      }
    });

    $scope.viewPost = function(id) {
      $location.path('blog/'+id);
    };

    Listings.getMostRecentBlog().then(function(response) {
      console.log(response);
      $scope.latestPost = response.data;
    });
  }]);
