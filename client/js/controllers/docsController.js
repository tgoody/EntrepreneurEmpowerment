angular.module('listings').controller('docsController', ['$rootScope', '$scope', 'Listings',
  function($rootScope, $scope, Listings) { 
      $scope.currentCategory = 0;
      $scope.docs = [];
      $scope.videos = [];
      $scope.resourceType = 'Videos';
      $scope.categorySelect = {
        availableOptions: [
          {id: 0, name: 'Business Plans and Business Models'},
          {id: 1, name: 'Entrepreneurial Marketing'},
          {id: 2, name: 'Developing the Entrepreneur'},
          {id: 3, name: 'Financing'},
          {id: 4, name: 'Getting Started'},
          {id: 5, name: 'Government Support Programs'},
          {id: 6, name: 'Women Entrepreneurs'},
          {id: 7, name: 'Social Entrepreneurship'},
          {id: 8, name: 'Videos on Entrepreneurship'}
        ],
        selectedOption: {id: 0, name: 'Business Plans and Business Models'} //This sets the default value of the select in the ui
    };

      Listings.getDocs($scope.categorySelect.selectedOption.id).then(function(response) {
          $scope.docs = response.data;
      });

      Listings.getVideos($scope.categorySelect.selectedOption.id).then(function(response) {
        $scope.videos = response.data;
      });

      $scope.categorySelected = function() {
        // Update resources
        Listings.getDocs($scope.categorySelect.selectedOption.id).then(function(response) {
          $scope.docs = response.data;
        });
        Listings.getVideos($scope.categorySelect.selectedOption.id).then(function(response) {
          $scope.videos = response.data;
        });
      };

      $scope.toggleView = function() {
        if ($scope.resourceType === 'Videos') {
          $scope.resourceType = 'Documents';
          // hide document container and show videos
          $('.docList').addClass('hide');
          $('.vidList').removeClass('hide');
        } else {
          $scope.resourceType = 'Videos';
          // hide video container and show documents
          $('.vidList').addClass('hide');
          $('.docList').removeClass('hide');
        }
      };

      // Modal setup
      // Get the modal
      var modal = document.getElementById('alertModal');
      var msgModal = document.getElementById('msgModal');
      $scope.modalParams = {};
      $scope.msgModalParam = {};

      $("#requestUploadFileForm").submit(function(e){
        e.preventDefault();
        // send request to upload doc
        var file = $scope.resource;
        if (file) {
          const request = {
            name: file.name,
            category: $scope.categorySelect.selectedOption.id,
            type: 'file'
          };
          Listings.requestResource(request)
          .then(function(response) {
            console.log('resource request sent', response.data);
            // Save file in storage
            if (!response.data) {
              console.log('no data');
              $scope.msgModalParam.popupMessage = "Failed to send request";
              $scope.msgModalParam.success = false;
              $('#resource').val('');
              setTimeout(function() {
                msgModal.style.display = 'block';
              }, 500);
              return;
            }
            var storageRef = firebase.storage().ref();
            var fileRef = storageRef.child('resources').child(response.data._id);
            var uploadTask = fileRef.put(file);

            $scope.msgModalParam.popupMessage = "Resource request sent";
            $scope.msgModalParam.success = true;
            $('#resource').val('');
            setTimeout(function() {
              msgModal.style.display = 'block';
            }, 500);
        
          });
        }
      });

      $scope.requestVideoUpload = function() {
        console.log("video", $scope.videoData);
        if ($scope.videoData 
          && $scope.videoData.name !== '' && $scope.videoData.link !== '') {
            $scope.videoData.category = $scope.categorySelect.selectedOption.id;
            $scope.videoData.type = 'video';
            Listings.requestResource($scope.videoData).then(function(response) {
              if (!response.data) {
                $scope.msgModalParam.popupMessage = "Resource request failed";
                $scope.msgModalParam.success = false;
              } else {
                $scope.msgModalParam.popupMessage = "Resource request sent";
                $scope.msgModalParam.success = true;
              }
              $scope.videoData.name = '';
              $scope.videoData.link = '';
              setTimeout(function() {
                msgModal.style.display = 'block';
              }, 500);
            });
        } else {
          $scope.msgModalParam.popupMessage = "Please fill in all the fields";
          $scope.msgModalParam.success = false;
          setTimeout(function() {
            msgModal.style.display = 'block';
          }, 500);
        }
      };

      $scope.removeDoc = function(index, id) {
        $scope.modalParams.type = 'file';
        $scope.modalParams.id = id;
        $scope.modalParams.index = index;
        setTimeout(function() {
          modal.style.display = 'block';
        }, 500);
      };

      $scope.removeVid = function(index, id) {
        $scope.modalParams.type = 'video';
        $scope.modalParams.id = id;
        $scope.modalParams.index = index;
        setTimeout(function() {
          modal.style.display = 'block';
        }, 500);
      };

      $scope.cancelDelete = function() {
        modal.style.display = 'none';
        $scope.modalParams.type = null;
        $scope.modalParams.id = null;
        $scope.modalParams.index = null;
      };

      $scope.confirmDelete = function() {
        if ($scope.modalParams.type && $scope.modalParams.id && $scope.modalParams.index !== null) {
          if($scope.modalParams.type == 'file') {
            // Delete from storage
            if (!$scope.modalParams.id) {
              console.log('id does not exist');
              return;
            }
            var id = $scope.modalParams.id;
            var index = $scope.modalParams.index;
            var storageRef = firebase.storage().ref();
            var fileRef = storageRef.child('resources').child(id);
            // Delete the file
            fileRef.delete().then(function() {
                // File deleted successfully
                Listings.removeFile(id).then(function(response) {
                  if (response.data) {
                    // Show message
                    $scope.msgModalParam.popupMessage = "File removed";
                    $scope.msgModalParam.success = true;
                    // remove item from list
                    $scope.docs.splice(index, 1);
                  } else {
                    $scope.msgModalParam.popupMessage = "Failed to remove file";
                    $scope.msgModalParam.success = false;
                  }
                  setTimeout(function() {
                    msgModal.style.display = 'block';
                  }, 500);
                });
            }.bind(this)).catch(function(error) {
              $scope.msgModalParam.success = false;
              $scope.msgModalParam.popupMessage = "Failed to remove file";
              setTimeout(function() {
                msgModal.style.display = 'block';
              }, 500);
            });
          } else {
            // video
            Listings.removeVideo($scope.modalParams.id).then(function(response) {
              if (response.data) {
                // Show message
                  $scope.msgModalParam.success = true;
                  $scope.msgModalParam.popupMessage = "Video removed";
                  // remove item from list
                  $scope.videos.splice($scope.modalParams.index, 1);
              } else {
                  $scope.msgModalParam.success = false;
                  $scope.msgModalParam.popupMessage = "Failed to remove video";
              }
              setTimeout(function() {
                msgModal.style.display = 'block';
              }, 500);
            });
          }
        }

        modal.style.display = 'none';
        $scope.modalParams.type = null;
        $scope.modalParams.id = null;
        $scope.modalParams.index = null;
      };

      // Get the <span> element that closes the modal
      var span = document.getElementsByClassName("close")[0];

      // When the user clicks on <span> (x), close the modal
      span.onclick = function() {
          modal.style.display = "none";
          $scope.modalParams.type = null;
          $scope.modalParams.id = null;
          $scope.modalParams.index = null;
      }

      // When the user clicks anywhere outside of the modal, close it
      window.onclick = function(event) {
          if (event.target == modal) {
            modal.style.display = 'none';
            $scope.modalParams.type = null;
            $scope.modalParams.id = null;
            $scope.modalParams.index = null;
          } else if (event.target == msgModal) {
            msgModal.style.display = "none";
            $scope.msgModalParam.type = null;
            $scope.msgModalParam.id = null;
          }
      }
    }
]);