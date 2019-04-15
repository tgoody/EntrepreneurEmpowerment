angular.module('listings').controller('adminController', ['$rootScope', '$scope', 'Listings', '$location',
  function($rootScope, $scope, Listings, $location) {
        $scope.currentCategory = 0;
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
        $scope.vidCategorySelect = {
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
        $scope.requests = [];

        // Small delay to make sure loggedIn value is updated
        setTimeout(function() {
            if(!$rootScope.loggedIn) {
                $scope.$apply(function() {
                    $location.path("home");
                });
            }
        }, 100);

        Listings.getRequests().then(function(response) {
            console.log(response.data);
            $scope.requests = response.data;
        });
        
        $("#uploadFileForm").submit(function(e){
            e.preventDefault();
            // Upload file to database
            var file = $scope.myFile;
            var category = $scope.categorySelect.selectedOption.id;
            if (!file) {
                console.log('No file selected');
                return;
            }

            Listings.uploadFile({filename: file.name, category: category, url: ''}).then(function(response) {
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
                        // update resource on database to have download url
                        storageRef.child('resources/'+response.data._id)
                        .getDownloadURL().then(function(url) {
                            Listings.updateDocUrl(url, response.data._id)
                            .then(function(response) {
                                console.log('Updated doc url: ', response.data);
                                $('#myFile').val('');
                            });
                        }).catch(function(error) {
                            // Handle any errors
                        });
                    });
            });
        });

        $scope.addPost = function() {
            Listings.addPost($scope.blogpost).then(function(response) {
                console.log('Sucessfully tried to add post!');
                $scope.blogpost.title = '';
                $scope.blogpost.body = '';
                                                    
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

        $scope.uploadVideo = function() {
            if (!$scope.videoData || !$scope.videoData.link || !$scope.videoData.name) {
                console.log('Fill out all the fields');
                return;
            }
            $scope.videoData.category = $scope.vidCategorySelect.selectedOption.id;
            Listings.uploadVideo($scope.videoData).then(function(response) {
                // Reset fields
                $scope.videoData.link = '';
                $scope.videoData.name = '';
                $scope.vidCategorySelect.selectedOption = {id: 0, name: 'Business Plans and Business Models'};
            });
        };

        Listings.getEvents().then(function(response) {
            $scope.eventList = response.data;
            for(var i = 0; i < $scope.eventList.length; i++) {
            if(response.data[i].approved) {
                $scope.eventList.splice(i, 1);
                i = i - 1;
            }
            }
            console.log('Sucessfully got events!');
            }, function(error) {
                console.log('Error in trying to get events!');
        });

        $scope.navClicked = function(index) {
            if (index == 0) {
                // Show Resources
                $('.resourceContent').removeClass('hide');
                $('.blogContent').addClass('hide');
                $('.calendarContent').addClass('hide');
            } else if (index == 1) {
                // Show Blog
                $('.blogContent').removeClass('hide');
                $('.resourceContent').addClass('hide');
                $('.calendarContent').addClass('hide');
            } else {
                // Show Calendar Events
                $('.calendarContent').removeClass('hide');
                $('.blogContent').addClass('hide');
                $('.resourceContent').addClass('hide');
            }
            // update scope index
            $scope.currentCategory = index;
            // Highlight section on side nav
            $('.side-nav-item').removeClass('side-nav-active');
            $('#nav-item-'+index.toString()).addClass('side-nav-active');
        };

        $scope.acceptRequest = function(request) {
            // Add to resource list in database
            if (request.type === 'file') {
                // Get file's downloadable url
                var storageRef = firebase.storage().ref();
                storageRef.child('resources/'+request._id)
                .getDownloadURL().then(function(url) {
                    const requestData = {
                        filename: request.name,
                        category: request.category,
                        url: url
                    };
                    Listings.uploadFile(requestData)
                    .then(function(response) {
                        console.log('Uploaded file: ', response.data);
                    });
                }).catch(function(error) {
                    // Handle any errors
                });
            } else if(request.type === 'video') {
                Listings.uploadVideo({
                    name: request.name,
                    category: request.category,
                    link: request.link
                }).then(function(response) {
                    console.log('video uploaded', response.data);
                });
            } else {
                console.log('type does not exist');
            }
            // Remove from request list
            Listings.deleteRequest(request._id);
        };

        $scope.denyRequest = function(request) {
            if (request.type === 'file') {
                // Delete from storage
                var storageRef = firebase.storage().ref();
                var fileRef = storageRef.child('resources').child(request._id);
                // Delete the file
                fileRef.delete().then(function() {
                    // File deleted successfully
                    console.log('file removed');
                }).catch(function(error) {
                    // Uh-oh, an error occurred!
                    console.log('file not removed: ', error);
                });
            }
            // Remove from request list
            Listings.deleteRequest(request._id);
        };
    }
]);
