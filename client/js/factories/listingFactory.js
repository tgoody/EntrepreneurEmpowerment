angular.module('listings', []).factory('Listings', function($http) {
  var methods = {
    getAll: function() {
      return $http.get('http://localhost:8080/api/accounts');
    },

    create: function(listing) {
      return $http.post('http://localhost:8080/api/accounts', listing);
      },

    delete: function(id) {
      /* return result of HTTP delete method
        */
      return $http.delete('http://localhost:8080/api/accounts/' + id);
    },

//------------------------------------------------------------------------------//
//TESTING FUNCTIONS

    GoToBlog: function() {
      return $http.get('http://localhost:8080/blog');
    },

    GoToCalendar: function() {
      return $http.get('http://localhost:8080/calendar');
    },

    GoToResources: function() {
      return $http.get('http://localhost:8080/resources');
    }
  };

  return methods;
});
