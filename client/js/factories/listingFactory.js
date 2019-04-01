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

    getUser: function(id) {
      return $http.get('/api/accounts/'+ id);
    },
//------------------------------------------------------------------------------//
//TESTING FUNCTIONS
    uploadFile: function(file) {
      return $http.post('/resources/create', file);
    },

    downloadFile:  function(filename) {
      return $http.post('/resources/read', {name: filename});
    },

    getDocs: function(category) {
      return $http.post('/resources/docs', {'category': category});
    },

    getViedos: function(category) {
      return $http.post('/resources/videos', {'category': category} );
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

  verifyEvent: function(id) {
    return $http.put('/calendar/' + id);
  },

  deleteEvent: function(id) {
    return $http.delete('/calendar/' + id);
  },

  getEvents: function() {
    return $http.get('/calendar/events');
  },

  getBlogs: function() {
    return $http.get('/blog/all');
  },

  getMostRecentBlog: function() {
    return $http.get('/blog/recent');
  },
  
  addComment: function(blog){
  	return $http.post('/blog/add', blog);
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
