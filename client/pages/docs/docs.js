angular.module('listings').controller('ListingsController', ['$scope', 'Listings',
  function($scope, Listings) { 
    $("#uploadFileForm").submit(function(e){
        e.preventDefault(); 

        var file = $scope.myFile;
        var fileFormData = new FormData();
        fileFormData.append('file', file);
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

        $scope.downloadFile = function () {
            Listings.downloadFile('example prospectus lead aprons.pdf').then(function(response){
                console.log('done');
            });
        };
    }
]);