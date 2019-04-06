angular.module('listings').controller('blogController', ['$rootScope', '$scope', 'Listings', '$location',
  function($rootScope, $scope, Listings, $location) {
    // initialize empty array for blog posts
    $scope.blogPosts = [];
    $scope.tags = [
      {val: 'getting started', state: false},
      {val: 'models', state: false},
      {val: 'marketing', state: false},
      {val: 'financing', state: false},
      {val: 'government', state: false},
    ];
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

    $scope.tagFilter = function(tagState, id) {
      $scope.tags[id].state = tagState;
      // TODO: Filter blogs
    };

    Listings.getMostRecentBlog().then(function(response) {
      console.log(response);
      $scope.latestPost = response.data;
    });
  }]);
