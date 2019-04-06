angular.module('listings').controller('blogPostController',
    ['$rootScope', '$scope', 'Listings', '$routeParams',
  function($rootScope, $scope, Listings, $routeParams) {
    $scope.blog = null;

    Listings.getBlog($routeParams.blogId).then(function(response) {
        console.log(response);
        $scope.blog = response.data;
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
  }]);