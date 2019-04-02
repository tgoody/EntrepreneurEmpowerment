function onSignIn(googleUser) {
  // Useful data for your client-side scripts:


  // Do not use a user's email address or user ID to communicate the currently
  // signed-in user to your app's backend server. Instead, send the user's ID token
  // to your backend server and validate the token on the server, or use the server
  // auth code flow.

  var profile = googleUser.getBasicProfile();
  console.log("ID: " + profile.getId()); // Don't send this directly to your server!
  console.log('Full Name: ' + profile.getName());
  console.log('Given Name: ' + profile.getGivenName());
  // console.log('Family Name: ' + profile.getFamilyName());
  // console.log("Image URL: " + profile.getImageUrl());
  console.log("Email: " + profile.getEmail());

  // The ID token you need to pass to your backend:
  var id_token = googleUser.getAuthResponse().id_token;
  console.log("ID Token: " + id_token);
}

angular.module('listings').controller('ListingsController', ['$scope', 'Listings',
  function($scope, Listings) {
    /* Get all the listings, then bind it to the scope */
    // Listings.getAll().then(function(response) {
    //   $scope.accountList = response.data;
    // }, function(error) {
    //   console.log('Unable to retrieve listings:', error);
    // });

    $scope.detailedInfo = undefined;

    $scope.userId = localStorage.getItem('userId');
    $scope.isAdmin = false;

    if ($scope.userId !== 'false') {
      Listings.getUser($scope.userId).then(function(response) {
        $scope.isAdmin = response.data.admin;
      });
    }

    $scope.addAccount = function() {
      if ($scope.account.password !== $scope.confirmPassword) {
        return;
      }
	  /*Save the article using the Listings factory. If the object is successfully
	  saved redirect back to the list page. Otherwise, display the error
	 */
      Listings.create($scope.account).then(function(response) {
        if (response.status === 200) {
          // response was successful, refresh list
          var id = response.data._id;
          localStorage.setItem('userId', id);
          $scope.userId = id;

          // send to home page
          window.location.href = "../../index.html";
          // Clear form inputs
          $scope.account.name = '';
          $scope.account.code = '';
          $scope.account.address = '';
        } else {

        }
      }, function(error) {
        console.log('Unable to add new listing:', error);
      });
      // window.location.href = '../../index.html';
    };

    $scope.deleteAccount = function(id) {
	   /*Delete the article using the Listings factory. If the removal is successful,
		navigate back to 'listing.list'. Otherwise, display the error.
       */
      Listings.delete(id).then(function(response) {
        if (response.status === 200) {
          // response was successful, refresh list
          Listings.getAll().then(function(response) {
            $scope.accountList = response.data;
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
      $scope.detailedInfo = $scope.accountList[index];
    };

//------------------------------------------------------------------------------//
//TESTING FUNCTIONS
		
	$scope.addEvent = function() {
		  Listings.addEvent($scope.event).then(function(response) {
			console.log('Sucessfully tried to add event!');
		  }, function(error) {
			console.log('Error in trying to add event!');
		  });
    };
    
	$scope.checkLogin = function(){
	
		//console.log("CHECKING LOGIN");
		//console.log($scope.account);
		Listings.checkLogin($scope.account).then(
			function(response){
				//console.log('Successfully tried to log in!');
				var id = response.data._id;
        localStorage.setItem('userId', id);
        $scope.userId = id;
        // send to home page
        window.location.href = "../../index.html";
			},
			function(error){console.log('Error trying to log in');
		});
	
  };
  
  $scope.logout = function() {
    localStorage.setItem('userId', 'false');
    $scope.userId = 'false';
    $scope.isAdmin = false;
  }
	


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
