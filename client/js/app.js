(function(){
    'use strict';
// Set up Firebase configurations
var config = {
    apiKey: "AIzaSyBXnHZlfDp1gZZTelro4wmI_9k7AFfrGQI",
    authDomain: "entrepreneurship-9edce.firebaseapp.com",
    databaseURL: "https://entrepreneurship-9edce.firebaseio.com",
    projectId: "entrepreneurship-9edce",
    storageBucket: "gs://entrepreneurship-9edce.appspot.com/",
    messagingSenderId: "1058715944518"
  };
  firebase.initializeApp(config);
  
  /* register the modules the application depends upon here*/
  angular.module('listings', []);
  angular.module('app.auth', []);
  
  /* register the application and inject all the necessary dependencies */
  var app = angular.module('EntrepreneurApp', ['firebase', 'listings', 'app.auth']);
  
  /*
      A directive to enable two way binding of file field
  */
  app.directive('demoFileModel', function ($parse) {
      return {
          restrict: 'A', //the directive can be used as an attribute only
  
          /*
              link is a function that defines functionality of directive
              scope: scope associated with the element
              element: element on which this directive used
              attrs: key value pair of element attributes
              */
          link: function (scope, element, attrs) {
              var model = $parse(attrs.demoFileModel),
                  modelSetter = model.assign; //define a setter for demoFileModel
  
              //Bind change event on the element
              element.bind('change', function () {
                  //Call apply on scope, it checks for value changes and reflect them on UI
                  scope.$apply(function () {
                      //set the model value
                      modelSetter(scope, element[0].files[0]);
                  });
              });
          }
      };
  });  
})();