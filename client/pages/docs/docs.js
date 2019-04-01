angular.module('listings').controller('ListingsController', ['$scope', 'Listings',
  function($scope, Listings) { 
        $scope.currentCategory = 'Business Plans and Business Models';
        $scope.docs = [];
        $scope.videos = [];

        Listings.getDocs($scope.currentCategory).then(function(response) {
            $scope.docs = response.data;
        });

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

        $scope.downloadFile = function (filename) {
            Listings.downloadFile(filename).then(function(response){
                console.log(response);
                // var blob = new Blob([response.data], {type: "application/pdf"});
                // saveAs(blob, filename);
                // alert('File '+ filename + ' downloaded');
            });
        };
    }
]);