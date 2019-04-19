angular.module('listings').controller('docsController', ['$rootScope', '$scope', 'Listings',
  function($rootScope, $scope, Listings) { 
      $scope.currentCategory = 0;
      $scope.docs = [];
      $scope.videos = [];
      $scope.resourceType = 'Videos';

      Listings.getDocs($scope.currentCategory).then(function(response) {
          $scope.docs = response.data;
      });

      Listings.getVideos($scope.currentCategory).then(function(response) {
        $scope.videos = response.data;
      });

      $scope.navClicked = function(index) {
        // Update resources
        Listings.getDocs(index).then(function(response) {
          $scope.docs = response.data;
        });
        Listings.getVideos(index).then(function(response) {
          $scope.videos = response.data;
        });
        // update scope index
        $scope.currentCategory = index;
        // Highlight section on side nav
        $('.side-nav-item').removeClass('side-nav-active');
        $('#nav-item-'+index.toString()).addClass('side-nav-active');
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

      $("#requestUploadFileForm").submit(function(e){
        e.preventDefault();
        // send request to upload doc
        var file = $scope.resource;
        if (file) {
          const request = {
            name: file.name,
            category: $scope.currentCategory,
            type: 'file'
          };
          Listings.requestResource(request)
          .then(function(response) {
            console.log('resource request sent', response.data);
            // Clear file input
            $('#resource').val('');
            // Save file in storage
            if (!response.data) {
              console.log('no data');
              return;
            }
            var storageRef = firebase.storage().ref();
            var fileRef = storageRef.child('resources').child(response.data._id);
            var uploadTask = fileRef.put(file);

            uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
              function(snapshot) {
                  var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                  console.log('Upload is ' + progress + '% done');
                  switch (snapshot.state) {
                      case firebase.storage.TaskState.PAUSED:
                      console.log('Upload is paused');
                      break;
                      case firebase.storage.TaskState.RUNNING:
                      console.log('Upload is running');
                      break;
                  }
              },
              function(error) {
                  switch (error.code) {
                      case 'storage/unauthorized':
                          console.log('User does not have permission to access the object.');
                          break;
                      case 'storage/canceled':
                          console.log('User canceled the upload.');
                          break;
                      case 'storage/unknown':
                          console.log(' Unknown error occurred, Please try later.');
                          break;
                  }
              }, function() {
                  // TODO: Alert user that it was successful and clear input field
              });
          });
        }
      });

      $scope.requestVideoUpload = function() {
        console.log("video", $scope.videoData);
        if ($scope.videoData 
          && $scope.videoData.name !== '' && $scope.videoData.link !== '') {
            $scope.videoData.category = $scope.currentCategory;
            $scope.videoData.type = 'video';
            Listings.requestResource($scope.videoData).then(function(response) {
              console.log('video request sent', response.data);
              $scope.videoData.name = '';
              $scope.videoData.link = '';
            });
        } else {
          console.log ('Please fill in all the fields');
        }
      };

      $scope.removeDoc = function(id) {
        // Delete from storage
        if (!id) {
          console.log('id does not exist');
          return;
        }
        var storageRef = firebase.storage().ref();
        var fileRef = storageRef.child('resources').child(id);
        // Delete the file
        fileRef.delete().then(function() {
            // File deleted successfully
            console.log('file removed');
            Listings.removeFile(id).then(function(response) {
              console.log(response.data);
            });
        }).catch(function(error) {
            // Uh-oh, an error occurred!
            console.log('file not removed: ', error);
        });
      };

      $scope.removeVid = function(id) {
        Listings.removeVideo(id).then(function(response) {
          console.log(response.data);
        })
      };
    }
]);