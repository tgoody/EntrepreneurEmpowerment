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

    uploadVideo: function(video) {
      return $http.post('/resources/createVideo', video);
    },

    removeFile: function(id) {
      return $http.delete('/resources/delete/'+id);
    },

    removeVideo: function(id) {
      return $http.delete('/resources/deleteVideo/'+id);
    },

    requestResource: function(request) {
      return $http.post('/resources/request', request);
    },

    getRequests: function() {
      return $http.get('/resources/request');
    },

    deleteRequest: function(id) {
      return $http.delete('/resources/request/'+ id);
    },

    downloadFile:  function(filename) {
      return $http.post('/resources/read', {name: filename});
    },

    updateDocUrl:  function(url, id) {
      return $http.post('/resources/updateUrl', {url: url, id: id});
    },

    getDocs: function(category) {
      return $http.post('/resources/docs', {'category': category});
    },

    getVideos: function(category) {
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

  createEvent: function (calendarEvent) {
    return $http.post('/calendar/add', calendarEvent);
  },

  getBlog: function(id) {
    return $http.get('/blog/'+id);
  },

  getBlogs: function() {
    return $http.get('/blog/all');
  },

  getMostRecentBlog: function() {
    return $http.get('/blog/recent');
  },

  editBlog: function(blog) {
    return $http.post('/blog/update', blog);
  },

  deleteBlog: function(id) {
    return $http.delete('/blog/'+id);
  },

  addComment: function(blog){
  	return $http.post('/blog/add', blog);
  },

  deleteComment: function(blogId, id) {
    return $http.delete('/blog/comment/'+blogId+'/'+id);
  },

  addDocComment: function(doc){
  	return $http.post('/resources/add', doc);
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
