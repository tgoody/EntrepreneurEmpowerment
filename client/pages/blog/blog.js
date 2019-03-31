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

    $scope.addPost = function() {
		  Listings.addPost($scope.blogpost).then(function(response) {
			  console.log('Sucessfully tried to add post!');
		  }, function(error) {
			  console.log('Error in trying to add post!');
		  });
    };
    
    $scope.addComment = function(blog)  {

      // this is my request.body.blog variable
      var blogpostdata = {
        blog: blog,
        comment: $scope.commentMsg
      };
      Listings.addComment(blogpostdata).then(function(response)  {
        console.log('Sucessfully added comment!');
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