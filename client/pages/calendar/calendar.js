// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
angular.module('listings').controller('ListingsController', ['$scope', 'Listings', function($scope, Listings) {
  $scope.addEvent = function() {
    console.log('add event');
    Listings.addEvent($scope.event).then(function(response) {
      console.log('Sucessfully tried to add event!');
      }, function(error) {
      console.log('Error in trying to add event!');
      });
    };

    $scope.verifyEvent = function() {
      console.log('verify Event');
  	  Listings.verifyPost().then(function(response) {
  			console.log('Sucessfully verified a post!');
  		  }, function(error) {
  			console.log('Error in verifying a post!');
  		  });
  		};
}]);

function submitEvent() {
    console.log('test');
}
