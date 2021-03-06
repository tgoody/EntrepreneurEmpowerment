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
              {id: 7, name: 'Social Entrepreneurship'}
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
              {id: 7, name: 'Social Entrepreneurship'}
            ],
            selectedOption: {id: 0, name: 'Business Plans and Business Models'} //This sets the default value of the select in the ui
        };
        $scope.eventList = [];
        $scope.requests = [];
        $scope.tagList = [
          {name: 'Getting Started', state: false},
          {name: 'Models', state: false},
          {name: 'Marketing', state: false},
          {name: 'Financing', state: false},
          {name: 'Government', state: false}
        ];
        // Small delay to make sure loggedIn value is updated
        setTimeout(function() {
            if(!$rootScope.loggedIn && !$rootScope.isAdmin) {
                $scope.$apply(function() {
                    $location.path("home");
                });
            }
        }, 1000);

        // Modal setup
        // Get the modals
        var modal = document.getElementById('alertModal');
        var msgModal = document.getElementById('msgModal');
        $scope.modalParams = {};
        $scope.msgModalParam = {};

        Listings.getRequests().then(function(response) {
            console.log(response.data);
            $scope.requests = response.data;
        });
        // upload resource
        $("#uploadFileForm").submit(function(e){
            e.preventDefault();
            // Upload file to database
            var file = $scope.myFile;
            var category = $scope.categorySelect.selectedOption.id;
            if (!file) {
                // TODO: Feedback
                console.log('No file selected');
                return;
            }

            // Show confirm modal
            $scope.modalParams.type = 'file';
            $scope.modalParams.file = file;
            $scope.modalParams.category = category;
            openAlertModal('Upload File');
        });

        $scope.uploadVideo = function() {
            if (!$scope.videoData || !$scope.videoData.link || !$scope.videoData.name) {
                // TODO: Feedback
                console.log('Fill out all the fields');
                return;
            }
            $scope.videoData.category = $scope.vidCategorySelect.selectedOption.id;
            // Show confirm modal
            $scope.modalParams.type = 'video';
            $scope.modalParams.videoData = $scope.videoData;
            openAlertModal('Upload Video');
        };

        $scope.addPost = function() {
            var tags = [];
            //Searches for tags that were selected.
            for (var i = 0; i < $scope.tagList.length; i++) {
                if ($scope.tagList[i].state === true) {
                    tags.push($scope.tagList[i].name);
                }
            }
            $scope.blogpost.tags = tags;
           // Show confirm modal
           $scope.modalParams.type = 'blog';
           $scope.modalParams.blogpost = $scope.blogpost;
           openAlertModal('Post Blog');
        };

        $scope.verifyEvent = function(id, index) {
            // Show confirm modal
           $scope.modalParams.type = 'acceptEvent';
           $scope.modalParams.id = id;
           $scope.modalParams.index = index;
           openAlertModal('Accept Event');
        };

        $scope.deleteEvent = function(id, index) {
            // Show confirm modal
            $scope.modalParams.type = 'denyEvent';
            $scope.modalParams.id = id;
            $scope.modalParams.index = index;
            openAlertModal('Deny Event');
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

        $scope.addSpotlight = function() {
            //Binds tags to spotlight.
            $scope.spotlight.tags = ['spotlight'];
            // Show confirm modal
           $scope.modalParams.type = 'spotlight';
           $scope.modalParams.spotlight = $scope.spotlight;
           openAlertModal('Post Community Spotlight');
        };

        $scope.navClicked = function(index) {
            if (index == 0) {
                // Show Resources
                $('.resourceContent').removeClass('hide');
                $('.blogContent').addClass('hide');
                $('.spotlightContent').addClass('hide');
                $('.calendarContent').addClass('hide');
            } else if (index == 1) {
                // Show Community Spotlight
                $('.spotlightContent').removeClass('hide');
                $('.blogContent').addClass('hide');
                $('.resourceContent').addClass('hide');
                $('.calendarContent').addClass('hide');
            } else if (index == 2) {
                // Show Blog
                $('.blogContent').removeClass('hide');
                $('.spotlightContent').addClass('hide');
                $('.resourceContent').addClass('hide');
                $('.calendarContent').addClass('hide');
            } else {
                // Show Calendar Events
                $('.calendarContent').removeClass('hide');
                $('.spotlightContent').addClass('hide');
                $('.blogContent').addClass('hide');
                $('.resourceContent').addClass('hide');
            }
            // update scope index
            $scope.currentCategory = index;
            // Highlight section on side nav
            $('.side-nav-item').removeClass('side-nav-active');
            $('#nav-item-'+index.toString()).addClass('side-nav-active');
        };

        $scope.acceptRequest = function(request, index) {
            // Show confirm modal
            $scope.modalParams.type = 'requestAccept';
            $scope.modalParams.request = request;
            $scope.modalParams.index = index;
            openAlertModal('Accept Request');
        };

        $scope.denyRequest = function(request, index) {
            $scope.modalParams.type = 'requestDeny';
            $scope.modalParams.request = request;
            $scope.modalParams.index = index;
            openAlertModal('Deny Request');
        };

        $scope.cancel = function() {
            closeAlertModal();
        };
    
        $scope.confirm = function() {
            if ($scope.modalParams) {
                if ($scope.modalParams.type == 'file') {
                    uploadFileTask($scope.modalParams.file, $scope.modalParams.category);
                } else if ($scope.modalParams.type == 'video') {
                    Listings.uploadVideo($scope.modalParams.videoData).then(function(response) {
                        // Reset fields
                        $scope.videoData.link = '';
                        $scope.videoData.name = '';
                        $scope.vidCategorySelect.selectedOption = {id: 0, name: 'Business Plans and Business Models'};
                        if (response.data) {
                            $scope.msgModalParam.popupMessage = 'Sucessfully uploaded video!';
                            $scope.msgModalParam.success = true;
                        } else {
                            $scope.msgModalParam.popupMessage = 'Failed to upload video.';
                            $scope.msgModalParam.success = false;
                        }
                        openMsgModal();
                        closeMsgModal(2500);
                    });
                } else if($scope.modalParams.type == 'requestAccept') {
                    requestAcceptTask($scope.modalParams.request, $scope.modalParams.index);
                } else if($scope.modalParams.type == 'requestDeny') {
                    requestDenyTask($scope.modalParams.request, $scope.modalParams.index);
                } else if($scope.modalParams.type == 'blog') {
                    postBlogTask($scope.modalParams.blogpost);
                } else if($scope.modalParams.type == 'spotlight') {
                    spotlightTask($scope.modalParams.spotlight);
                } else if($scope.modalParams.type == 'acceptEvent') {
                    acceptEventTask($scope.modalParams.id, $scope.modalParams.index);
                } else if($scope.modalParams.type == 'denyEvent') {
                    var index = $scope.modalParams.index;
                    Listings.deleteEvent($scope.modalParams.id).then(function(response) {
                        if (response.data) {
                            $scope.eventList.splice(index, 1);
                            $scope.msgModalParam.popupMessage = 'Sucessfully denied event!';
                            $scope.msgModalParam.success = true;
                        } else {
                            $scope.msgModalParam.popupMessage = 'Failed to deny event.';
                            $scope.msgModalParam.success = false;
                        }
                        openMsgModal();
                        closeMsgModal(2500);
                    }, function(error) {
                        $scope.msgModalParam.popupMessage = 'Failed to deny event.';
                        $scope.msgModalParam.success = false;            
                        openMsgModal();
                        closeMsgModal(2500);
                    });
                }
            }
            closeAlertModal();
        };
        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];
    
        // When the user clicks on <span> (x), close the modal
        span.onclick = function() {
            closeAlertModal();
        }
    
        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target == modal) {
                closeAlertModal();
            } else if (event.target == msgModal) {
                closeMsgModal(100);
            }
        }

        function openAlertModal(title) {
            $scope.modalParams.title = title;
            setTimeout(function() {
                modal.style.display = 'block';
            }, 500);
        }
    
        function closeAlertModal() {
            modal.style.display = 'none';
            $scope.modalParams.type = null;
            $scope.modalParams.id = null;
            $scope.modalParams.spotlight = null;
            $scope.modalParams.blogpost = null;
            $scope.modalParams.file = null;
            $scope.modalParams.category = null;
            $scope.modalParams.videoData = null;
            $scope.modalParams.index = null;
            $scope.modalParams.request = null;
        }

        function openMsgModal() {
            setTimeout(function() {
                msgModal.style.display = 'block';
            }, 500);
        }
    
        function closeMsgModal(delay) {
            setTimeout(function() {
                msgModal.style.display = "none";
                $scope.msgModalParam.title = '';
                $scope.msgModalParam.popupMessage = '';
                $scope.msgModalParam.success = null;
            }.bind(this), delay);
        }

        function uploadFileTask(file, category) {
            Listings.uploadFile({filename: file.name, category: category, url: ''})
            .then(function(response) {
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
                                // console.log('Updated doc url: ', response.data);
                                $('#myFile').val('');
                            });
                        }).catch(function(error) {
                            // Handle any errors
                        });
                    });

                if (response.data) {
                    $scope.msgModalParam.popupMessage = 'Sucessfully uploaded file!';
                    $scope.msgModalParam.success = true;
                } else {
                    $scope.msgModalParam.popupMessage = 'Failed to upload file.';
                    $scope.msgModalParam.success = false;
                }
                openMsgModal();
                closeMsgModal(2500);
            });
        }

        function requestAcceptTask(request, index) {
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
                        Listings.updateFbId(request._id, response.data._id)
                        .then(function(response2) {
                            if (response2.data) {
                                $scope.msgModalParam.popupMessage = 'Sucessfully accepted request!';
                                $scope.msgModalParam.success = true;
                            } else {
                                $scope.msgModalParam.popupMessage = 'Failed to accept request.';
                                $scope.msgModalParam.success = false;
                            }
                            openMsgModal();
                            closeMsgModal(2500);
                        });
                    });
                }).catch(function(error) {
                    // Handle any errors
                    $scope.msgModalParam.popupMessage = 'Failed to accept request.';
                    $scope.msgModalParam.success = false;
                    openMsgModal();
                    closeMsgModal(2500);
                });
            } else if(request.type === 'video') {
                Listings.uploadVideo({
                    name: request.name,
                    category: request.category,
                    link: request.link
                }).then(function(response) {
                    if (response.data) {
                        $scope.msgModalParam.popupMessage = 'Sucessfully accepted request!';
                        $scope.msgModalParam.success = true;
                    } else {
                        $scope.msgModalParam.popupMessage = 'Failed to accept request.';
                        $scope.msgModalParam.success = false;
                    }
                    openMsgModal();
                    closeMsgModal(2500);
                });
            } else {
                $scope.msgModalParam.popupMessage = 'Type does not exist';
                $scope.msgModalParam.success = false;
                openMsgModal();
                closeMsgModal(2500);
            }
            // Remove from request list
            Listings.deleteRequest(request._id);
            // update array
            $scope.requests.splice(index, 1);
        }

        function requestDenyTask(request, index) {
            $scope.msgModalParam.popupMessage = 'Sucessfully denied request!';
            $scope.msgModalParam.success = true;
            if (request.type === 'file') {
                // Delete from storage
                var storageRef = firebase.storage().ref();
                var fileRef = storageRef.child('resources').child(request._id);
                // Delete the file
                fileRef.delete().then(function() {
                    // File deleted successfully
                    openMsgModal();
                    closeMsgModal(2500);
                }.bind(this)).catch(function(error) {
                    $scope.msgModalParam.popupMessage = 'Failed to deny request.';
                    $scope.msgModalParam.success = false;
                    openMsgModal();
                    closeMsgModal(2500);
                }.bind(this));
            } else {
                openMsgModal();
                closeMsgModal(2500); 
            }
            // Remove from request list
            Listings.deleteRequest(request._id);
            // update array
            $scope.requests.splice(index, 1);
        }

        function postBlogTask(blog) {
            Listings.addPost(blog).then(function(response) {
                $scope.blogpost.title = '';
                $scope.blogpost.body = '';
                $scope.blogpost.tags = [];
                // reset selected tags
                for(var i = 0; i < $scope.tagList.length; i++) {
                    $scope.tagList[i].state = false;
                }
                // notify user that the action was successful
                if (response.data) {
                    $scope.msgModalParam.popupMessage = 'Sucessfully posted Blog!';
                    $scope.msgModalParam.success = true;
                } else {
                    $scope.msgModalParam.popupMessage = 'Failed to post blog.';
                    $scope.msgModalParam.success = false;
                }
                openMsgModal();
                closeMsgModal(2500);
            }, function(error) {
                $scope.msgModalParam.popupMessage = 'Failed to post blog.';
                $scope.msgModalParam.success = false;
                openMsgModal();
                closeMsgModal(2500);
            });
        }

        function spotlightTask(spotlight) {
            Listings.addPost(spotlight).then(function(response) {
                $scope.spotlight.title = '';
                $scope.spotlight.body = '';
                $scope.spotlight.tags = [];

                if (response.data) {
                    $scope.msgModalParam.popupMessage = 'Sucessfully posted spotlight!';
                    $scope.msgModalParam.success = true;
                } else {
                    $scope.msgModalParam.popupMessage = 'Failed to post spotlight.';
                    $scope.msgModalParam.success = false;
                }
                openMsgModal();
                closeMsgModal(2500);

            }, function(error) {
                $scope.msgModalParam.popupMessage = 'Failed to post spotlight.';
                $scope.msgModalParam.success = false;
                openMsgModal();
                closeMsgModal(2500);
            });
        }

        function acceptEventTask(id, index) {
            Listings.verifyEvent(id).then(function(response) {
                var event = response.data;
                calendarEvent = {
                  'summary': event.eventName,
                  'location': event.address,
                  'description': event.details,
                  'start': {
                    'dateTime': event.startTime,
                    //'timeZone': 'America/Florida',
                  },
                  'end': {
                    'dateTime': event.endTime,
                    //'timeZone': 'America/Florida',
                  }
                };
                Listings.createEvent(calendarEvent).then(function(response2) {
                    // remove event from list
                    if (response2.data) {
                        $scope.eventList.splice(index, 1);
                        $scope.msgModalParam.popupMessage = 'Sucessfully accepted event!';
                        $scope.msgModalParam.success = true;
                    } else {
                        $scope.msgModalParam.popupMessage = 'Failed to accept event.';
                        $scope.msgModalParam.success = false;
                    }
                    openMsgModal();
                    closeMsgModal(2500);
                });
            }, function(error) {
                $scope.msgModalParam.popupMessage = 'Failed to accept event.';
                $scope.msgModalParam.success = false;            
                openMsgModal();
                closeMsgModal(2500);
            });
        }
    }
]);
