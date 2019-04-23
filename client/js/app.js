(function(){
    'use strict';

  /* register the modules the application depends upon here*/
  angular.module('listings', []);
  angular.module('app.auth', []);
  
  /* register the application and inject all the necessary dependencies */
  var app = angular.module('EntrepreneurApp', ['ngRoute', 'firebase', 'listings', 'app.auth']);
  
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

  app.config(function($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
      'self',
      'https://www.youtube.com/**'
    ]);
  });
  
})();
