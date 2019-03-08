angular.module('listings').controller('ListingsController', ['$scope', 'Listings',
  function($scope, Listings) {
    /* Get all the listings, then bind it to the scope */
    Listings.getAll().then(function(response) {
      $scope.listings = response.data;
    }, function(error) {
      console.log('Unable to retrieve listings:', error);
    });

    $scope.detailedInfo = undefined;

    $scope.addAccount = function() {
	  /*Save the article using the Listings factory. If the object is successfully
	  saved redirect back to the list page. Otherwise, display the error
	 */
      Listings.create($scope.newListing).then(function(response) {
        if (response.status === 200) {
          // response was successful, refresh list
          Listings.getAll().then(function(response) {
            $scope.listings = response.data;
          }, function(error) {
            console.log('Unable to retrieve listings:', error);
          });
          // Clear form inputs
          $scope.newListing.name = '';
          $scope.newListing.code = '';
          $scope.newListing.address = '';
        } else {

        }
      }, function(error) {
        console.log('Unable to add new listing:', error);
      });
    };

    $scope.deleteListing = function(id) {
	   /*Delete the article using the Listings factory. If the removal is successful,
		navigate back to 'listing.list'. Otherwise, display the error.
       */
      Listings.delete(id).then(function(response) {
        if (response.status === 200) {
          // response was successful, refresh list
          Listings.getAll().then(function(response) {
            $scope.listings = response.data;
          }, function(error) {
            console.log('Unable to retrieve listings:', error);
          });
          // set show details to undefined
          $scope.detailedInfo = undefined;
        } else {

        }
      }, function(error) {
        console.log('Unable to delete listing:', error);
      });
    };

    $scope.showDetails = function(index) {
      $scope.detailedInfo = $scope.listings[index];
    };

//------------------------------------------------------------------------------//
//TESTING FUNCTIONS

    $scope.GoToBlog = function() {
      Listings.GoToBlog().then(function(response) {
        console.log('Sucessfully went to blog!');
      }, function(error) {
        console.log('Error in going to blog!');
      });
    };

    $scope.GoToCalendar = function() {
      Listings.GoToCalendar().then(function(response) {
        console.log('Sucessfully went to Calendar!');
      }, function(error) {
        console.log('Error in going to Calendar!');
      });
    };

    $scope.GoToResources = function() {
      Listings.GoToResources().then(function(response) {
        console.log('Successfully went to Resources!');
      }, function(error) {
        console.log('Error in going to Resources!');
      });
    };
  }
]);
