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
      if ($scope.appliedTags.length === 0) {
        // show all if no tags selected
        Listings.getBlogs().then(function(response) {
          console.log(response);
          if (response.status === 200) {
            $scope.blogPosts = response.data;
          }
        });
        return;
      }
      Listings.getBlogs().then(function(response) {
        if (response.status === 200) {
          for (var i = 0; i < response.data.length; i++) {
            if ($scope.compareTags($scope.appliedTags, response.data[i].tags)) {
              $scope.blogPosts.push(response.data[i]);
            }
          }
        }
      });
    };

    $scope.removeFilter = function() {
      $scope.appliedTags = [];
      // set all checkbox states to false
      for (var i = 0; i < $scope.tagList.length; i++) {
        $scope.tagList[i].state = false;
      }
      Listings.getBlogs().then(function(response) {
        console.log(response);
        if (response.status === 200) {
          $scope.blogPosts = response.data;
        }
      });
    };

    //Helper function for applyFilter()
    $scope.compareTags = function(tagList, blogTags) {
      // TODO: Should we show only blogs that meet all conditions
      // or as long as they meet one of the conditions
      for (var i = 0; i < tagList.length; i++) {
        if (blogTags.indexOf(tagList[i]) > -1) {
          return true;
        }
      }
    };

    Listings.getMostRecentBlog().then(function(response) {
      console.log(response);
      $scope.latestPost = response.data;
    });
  }]);
