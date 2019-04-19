angular.module('listings').controller('blogPostController',
    ['$rootScope', '$scope', 'Listings', '$routeParams', '$location',
  function($rootScope, $scope, Listings, $routeParams, $location) {
    $scope.blog = null;

    Listings.getBlog($routeParams.blogId).then(function(response) {
        $scope.blog = response.data;
    }, function(err) {
        if (err.status == 404) {
            // if blog post not found redirect to blog page
            $location.path('blog');
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

    $scope.deleteComment = function(blogId, id) {
        Listings.deleteComment(blogId, id).then(function(response) {
            console.log(response.data);
        });
    };

    $scope.editBlog = function(blog) {
        Listings.editBlog(blog).then(function(response) {
            console.log(response.data);
        });
    };

    $scope.deleteBlog = function(id) {
        Listings.deleteBlog(id).then(function(response) {
            console.log(response.data);
        });
    };    
  }]);