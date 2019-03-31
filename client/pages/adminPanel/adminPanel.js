angular.module('listings').controller('ListingsController', ['$scope', 'Listings',
  function($scope, Listings) { 
        $("#uploadFileForm").submit(function(e){
            e.preventDefault(); 
            // Upload file to database
            var file = $scope.myFile;
            var fileFormData = new FormData();
            fileFormData.append('file', file);
            fileFormData.append('category', $scope.currentCategory);
            $.ajax({
                type: "POST",
                enctype: 'multipart/form-data',
                url: "/resources/create",
                data: fileFormData,
                processData: false,
                contentType: false,
                cache: false,
                timeout: 600000,
                success: function (data) {
                    console.log("SUCCESS : ", data);
                },
                error: function (e) {
                    console.log("ERROR : ", e);
                }
            });
        });

        $scope.addPost = function() {
            Listings.addPost($scope.blogpost).then(function(response) {
                console.log('Sucessfully tried to add post!');
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

        Listings.getEvents().then(function(response) {
            $scope.eventList = response.data;
            console.log('Sucessfully got events!');
            // console.log(response.data);
        }, function(error) {
                console.log('Error in trying to get events!');
        });
    }
]);