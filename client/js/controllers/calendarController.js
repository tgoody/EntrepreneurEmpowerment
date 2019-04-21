angular.module('listings').controller('calendarController', ['$rootScope', '$scope', 'Listings',
 function($rootScope, $scope, Listings) {

    var msgModal = document.getElementById('msgModal');
    $scope.msgModalParam = {};

    $scope.addEvent = function() {
        if ($rootScope.loggedIn) {
            Listings.addEvent($scope.event).then(function(response) {
                $scope.event.eventName = '';
                $scope.event.address = '';
                $scope.event.details = '';
                $scope.event.host = '';
                $scope.event.startTime = '';
                $scope.event.endTime = '';
                if (response.data) {
                    $scope.msgModalParam.popupMessage = 'Request Successful!';
                    $scope.msgModalParam.success = true;
                } else {
                    $scope.msgModalParam.popupMessage = 'Request Failed';
                    $scope.msgModalParam.success = false;
                }
                openMsgModal();
                closeMsgModal(2500);
                }, function(error) {
                    $scope.msgModalParam.popupMessage = 'Failed to request event.';
                    $scope.msgModalParam.success = false;            
                    openMsgModal();
                    closeMsgModal(2500);
                });
        } else {
            alert('Not logged in');
        }
    };

    // Modal setup
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
        } else if (event.target == msgModal) {
            closeMsgModal(100);
        }
    }

    function openMsgModal() {
        setTimeout(function() {
            msgModal.style.display = 'block';
        }, 500);
    }

    function closeMsgModal(delay) {
        setTimeout(function() {
            msgModal.style.display = "none";
            $scope.msgModalParam.popupMessage = '';
            $scope.msgModalParam.success = null;
        }.bind(this), delay);
    }
}]);
