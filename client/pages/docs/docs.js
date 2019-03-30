angular.module('listings').controller('ListingsController', ['$scope', 'Listings',
  function($scope, Listings) { 
        $scope.uploadFile = function () {
            var file = $scope.myFile;
            // console.log('file: ', file);
            Listings.uploadFile(file).then(function(response){
                console.log('done');
            });
        };
    }
]);