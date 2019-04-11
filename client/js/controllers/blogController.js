angular.module('listings').controller('blogController', ['$rootScope', '$scope', 'Listings', '$location',
  function($rootScope, $scope, Listings, $location) {
    // initialize empty array for blog posts
    $scope.blogPosts = [];
    $scope.tagList = [
      {name: 'Getting Started', state: false},
      {name: 'Models', state: false},
      {name: 'Marketing', state: false},
      {name: 'Financing', state: false},
      {name: 'Government', state: false},
    ];
    $scope.latestPost = null;
    $scope.appliedTags = [];

    if ($scope.appliedTags.length === 0) {
      Listings.getBlogs().then(function(response) {
        console.log(response);
        if (response.status === 200) {
          $scope.blogPosts = response.data;
        }
      });
    }

    $scope.viewPost = function(id) {
      $location.path('blog/'+id);
    };

    $scope.applyFilter = function() {
      $scope.blogPosts = [];
      $scope.appliedTags = [];
      //Adds all applied filters into an array
      for (var i = 0; i < $scope.tagList.length; i++) {
        if ($scope.tagList[i].state === true) {
          $scope.appliedTags.push($scope.tagList[i].name);
        }
      }
      console.log('applied tags: ', $scope.appliedTags.length);
      console.log('length of applied tags: ', $scope.appliedTags.length);
      Listings.getBlogs().then(function(response) {
        if (response.status === 200) {
          for (var i = 0; i < response.data.length; i++) {
            if ($scope.compareTags($scope.appliedTags, response.data[i].tags) === true) {
              $scope.blogPosts.push(response.data[i]);
              console.log("Added blog post!");
            }
          }
        }
      });
      console.log("Filtered Blogs: ", $scope.blogPosts);
    };

    $scope.removeFilter = function() {
      $scope.appliedTags = [];
      Listings.getBlogs().then(function(response) {
        console.log(response);
        if (response.status === 200) {
          $scope.blogPosts = response.data;
        }
      });
    };

    //Helper function for applyFilter()
    $scope.compareTags = function(tagList, blogTags) {
      for (var i = 0; i < tagList.length; i++) {
        if (blogTags.indexOf(tagList[i]) > -1) {
          return true;
        }
      }
    };

    /*$scope.tagFilter = function(tagState, id) {
      $scope.tags[id].state = tagState;
      // TODO: Filter blogs
    };*/

    Listings.getMostRecentBlog().then(function(response) {
      console.log(response);
      $scope.latestPost = response.data;
    });
  }]);
