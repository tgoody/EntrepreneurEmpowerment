angular.module('listings').controller('ListingsController', ['$scope', 'Listings',
  function($scope, Listings) {
      
    $scope.userId = localStorage.getItem('userId');
    $scope.isAdmin = false;
    
    if ($scope.userId !== 'false') {
        Listings.getUser($scope.userId).then(function(response) {
            $scope.isAdmin = response.data.admin;
        });
    }

    $scope.logout = function() {
        localStorage.setItem('userId', 'false');
        $scope.userId = 'false';
        $scope.isAdmin = false;
      }
        $("#uploadFileForm").submit(function(e){
            e.preventDefault();
            // Upload file to database
            var file = $scope.myFile;
            var fileFormData = new FormData();
            fileFormData.append('filename', file.name);
            fileFormData.append('category', $scope.currentCategory);

            Listings.uploadFile({'filename': file.name, 'category': "0"}).then(function(response) {
                console.log(response);
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
                        //   deferred.resolve(uploadTask.snapshot.downloadURL);
                    });
            });

            // $.ajax({
            //     type: "POST",
            //     enctype: 'multipart/form-data',
            //     url: "/resources/create",
            //     data: fileFormData,
            //     processData: false,
            //     contentType: false,
            //     cache: false,
            //     timeout: 600000,
            //     success: function (data) {
            //         console.log("SUCCESS : ", data);
            //     },
            //     error: function (e) {
            //         console.log("ERROR : ", e);
            //     }
            // });
        });

        $scope.addPost = function() {
            Listings.addPost($scope.blogpost).then(function(response) {
                console.log('Sucessfully tried to add post!');
                $scope.blogpost.title='';
				$scope.blogpost.body='';

            }, function(error) {
                console.log('Error in trying to add post!');
            });
        };

        $scope.verifyEvent = function(id) {
            console.log('verify Event');
            Listings.verifyEvent(id).then(function(response) {
                console.log('Sucessfully verified a post!');
            }, function(error) {
                console.log('Error in verifying a post!');
            });
        };

        $scope.deleteEvent = function(id) {
            console.log('Delete Event');
            Listings.deleteEvent(id).then(function(response) {
                console.log('Sucessfully deleted a post!');
            }, function(error) {
                console.log('Error in deleted a post!');
            });
        };

        Listings.getEvents().then(function(response) {
          $scope.eventList = response.data;
          console.log('response: ', response.data);
          for(var i = 0; i < $scope.eventList.length; i++) {
            console.log(response.data.length);
            if(response.data[i].approved) {
              $scope.eventList.splice(i, 1);
              i = i - 1;
            }
          }
          console.log('Sucessfully got events!');
        }, function(error) {
                console.log('Error in trying to get events!');
        });
    }
]);
