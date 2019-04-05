angular.module('listings').controller('blogController', ['$scope', 'Listings',
  function($scope, Listings) {
    // initialize empty array for blog posts
    $scope.blogPosts = [];

    Listings.getBlogs().then(function(response) {
      console.log(response);
      if (response.status === 200) {
        $scope.blogPosts = response.data;
      }
    });
    
    $scope.addComment = function(blog)  {
      
      Listings.addComment(blog).then(function(response)  {
        console.log('Sucessfully added comment!', response);
        window.location.href = "./blog.html";
		  }, function(error) {
			  console.log('Error in commenting!');
		  });
    };

    // $scope.getRecentBlog = function() {
    //   Listings.getMostRecentBlog().then(function(response) {
    //     console.log(response);
    //   });
    // }
  }]);
