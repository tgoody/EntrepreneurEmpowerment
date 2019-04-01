angular.module('listings').controller('ListingsController', ['$scope', 'Listings',
  function($scope, Listings) { 
        $scope.currentCategory = '0';
        $scope.docs = [];
        $scope.videos = [];

        Listings.getDocs($scope.currentCategory).then(function(response) {
            $scope.docs = response.data;
        });

        $scope.downloadFile = function (index, fileId) {
            var storageRef = firebase.storage().ref();
            storageRef.child('resources/'+fileId).getDownloadURL().then(function(url) {
                // `url` is the download URL for 'images/stars.jpg'
            
                // This can be downloaded directly:
                // var xhr = new XMLHttpRequest();
                // xhr.responseType = 'blob';
                // xhr.onload = function(event) {
                // var blob = xhr.response;
                // };
                // xhr.open('GET', url);
                // xhr.send();
            
                // Or inserted into an <img> element:
                var img = document.getElementById('doc'+index);
                img.href = url;
            }).catch(function(error) {
                // Handle any errors
            });
        };
    }
]);