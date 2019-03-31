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
    

    // $scope.getRecentBlog = function() {
    //   Listings.getMostRecentBlog().then(function(response) {
    //     console.log(response);
    //   });
    // }
  }]);
