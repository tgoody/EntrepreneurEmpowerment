angular.module('listings').controller('blogController', ['$rootScope', '$scope', 'Listings',
  function($rootScope, $scope, Listings) {
    // initialize empty array for blog posts
    $scope.blogPosts = [];
    $scope.latestPost = null;

    Listings.getBlogs().then(function(response) {
      console.log(response);
      if (response.status === 200) {
        $scope.blogPosts = response.data;
      }
    });
    
    $scope.addComment = function(blog)  {
      if ($rootScope.loggedIn) {
        blog.user_id = $rootScope.userId;
        Listings.addComment(blog).then(function(response)  {
          console.log('Sucessfully added comment!', response);
        }, function(error) {
          console.log('Error in commenting!');
        });
      } else {
        alert('not logged in');
      }
    };

    Listings.getMostRecentBlog().then(function(response) {
      console.log(response);
      $scope.latestPost = response.data;
    });
  }]);
