angular.module('listings').controller('ListingsController', ['$scope', 'Listings',
  function($scope, Listings) {
    $scope.userId = localStorage.getItem('userId');
    $scope.isAdmin = false;
    
    if ($scope.userId !== 'false') {
      Listings.getUser($scope.userId).then(function(response) {
        $scope.isAdmin = response.data.admin;
      });
    }

    $scope.logout = function() {
      localStorage.setItem('userId', 'false');
      $scope.userId = 'false';
      $scope.isAdmin = false;
    }
    
    // initialize empty array for blog posts
    $scope.blogPosts = [];

    Listings.getBlogs().then(function(response) {
      console.log(response);
      if (response.status === 200) {
        $scope.blogPosts = response.data;
      }
    });

    // $scope.addPost = function() {
		//   Listings.addPost($scope.blogpost).then(function(response) {
		// 	  console.log('Sucessfully tried to add post!');
		//   }, function(error) {
		// 	  console.log('Error in trying to add post!');
		//   });
    // };
    
    $scope.addComment = function(blog)  {
      
      Listings.addComment(blog).then(function(response)  {
        console.log('Sucessfully added comment!', response);
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
