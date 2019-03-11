angular.module('listings', []).factory('Listings', function($http) {
  var methods = {
    getAll: function() {
      return $http.get('/api/accounts');
    },

    create: function(listing) {
      return $http.post('/api/accounts', listing);
      },

    delete: function(id) {
      /* return result of HTTP delete method
        */
      return $http.delete('/api/accounts/' + id);
    },

//------------------------------------------------------------------------------//
//TESTING FUNCTIONS

    GoToBlog: function() {
      return $http.get('/blog');
    },

    GoToCalendar: function() {
      return $http.get('/calendar');
    },

    GoToResources: function() {
      return $http.get('/resources');
    }
  };

  return methods;
});
