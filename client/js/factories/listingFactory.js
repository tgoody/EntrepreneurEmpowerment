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
    uploadFile: function(file) {
      var fileFormData = new FormData();
      fileFormData.append('file', file);
      return $http.post('/resources/create', fileFormData, {'contentType': 'multipart/form-data'});
    },

    downloadFile:  function(filename) {
      return $http.post('/resources/read', {name: filename});
    },


	checkLogin: function(account){
		return $http.post('/api/accounts/login', account);
	},

	addPost: function(blogpost){
		return $http.post('/blog', blogpost);
	},
	
	addEvent: function(event){
		return $http.post('/calendar', event)
	},

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
