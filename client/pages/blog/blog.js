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
    
    
	$scope.addComment = function(blog){
		
		console.log(blog);
		Listings.addComment(blog).then(
		function(response){
		
				//console.log('Successfully tried to log in!');
				console.log(response);
				
			},

			function(error){console.log('Error trying to log in');
		
			
		
		
		})
	
	 };
    

    // $scope.addPost = function() {
		//   Listings.addPost($scope.blogpost).then(function(response) {
		// 	  console.log('Sucessfully tried to add post!');
		//   }, function(error) {
		// 	  console.log('Error in trying to add post!');
		//   });
    // };

    // $scope.getRecentBlog = function() {
    //   Listings.getMostRecentBlog().then(function(response) {
    //     console.log(response);
    //   });
    // }
  }]);
