angular.module('listings').controller('blogPostController',
    ['$rootScope', '$scope', 'Listings', '$routeParams', '$location',
  function($rootScope, $scope, Listings, $routeParams, $location) {
    $scope.blog = null;

    Listings.getBlog($routeParams.blogId).then(function(response) {
        $scope.blog = response.data;
    }, function(err) {
        if (err.status == 404) {
            // if blog post not found redirect to blog page
            $location.path('blog');
        }
    });

    // Modal setup
    // Get the modal
    var modal = document.getElementById('alertModal');
    var msgModal = document.getElementById('msgModal');
    $scope.modalParams = {};
    $scope.msgModalParam = {};

    $scope.addComment = function(blog)  {
        if ($rootScope.loggedIn) {
            blog.user_id = $rootScope.userId;
            Listings.addComment(blog).then(function(response)  {
            $scope.blog.comments = response.data.comments;

            $scope.blog.comment = '';
            $scope.msgModalParam.popupMessage = 'Sucessfully added comment!';
            $scope.msgModalParam.success = true;
            setTimeout(function() {
                msgModal.style.display = 'block';
            }, 500);
            closeMsgModal(2500);
            }, function(error) {
                $scope.msgModalParam.popupMessage = 'Error in commenting!';
                $scope.msgModalParam.success = false;
                setTimeout(function() {
                    msgModal.style.display = 'block';
                }, 500);
                closeMsgModal(2500);
            });
        } else {
            alert('not logged in');
        }
    };

    $scope.deleteComment = function(blogId, id, index) {
        $scope.modalParams.type = 'comment';
        $scope.modalParams.id = id;
        $scope.modalParams.blogId = blogId;
        $scope.modalParams.index = index;
        setTimeout(function() {
          modal.style.display = 'block';
        }, 500);
    };

    $scope.editBlog = function(blog) {
        $scope.modalParams.type = 'edit';
        $scope.modalParams.blog = blog;
        setTimeout(function() {
            modal.style.display = 'block';
        }, 500);
    };

    $scope.deleteBlog = function(id) {
        $scope.modalParams.type = 'blog';
        $scope.modalParams.blogId = id;
        setTimeout(function() {
            modal.style.display = 'block';
          }, 500);
    };    

    $scope.cancelDelete = function() {
        closeDeleteModal();
    };

    $scope.confirmDelete = function() {
        if ($scope.modalParams) {
            if ($scope.modalParams.type == 'comment') {
                var index = $scope.modalParams.index;
                Listings.deleteComment($scope.modalParams.blogId, $scope.modalParams.id)
                .then(function(response) {
                    if (response.data) {
                        $scope.msgModalParam.popupMessage = "Comment deleted";
                        $scope.msgModalParam.success = true;
                        // remove from list
                        $scope.blog.comments.splice(index, 1);
                    } else {
                        $scope.msgModalParam.popupMessage = "Failed to delete comment";
                        $scope.msgModalParam.success = false;
                    }
                    setTimeout(function() {
                        msgModal.style.display = 'block';
                    }, 500);
                    closeMsgModal(2500);
                });
            } else if ($scope.modalParams.type == 'blog') {
                Listings.deleteBlog($scope.modalParams.blogId).then(function(response) {
                    if (response.data) {
                        $scope.msgModalParam.popupMessage = "Blog deleted.\nRedirecting to Blogs Page.";
                        $scope.msgModalParam.success = true;
                        // send back to blog page
                        setTimeout(function() {
                            $scope.$apply(function(){
                                $location.path('blog');
                            });
                            msgModal.style.display = "none";
                            $scope.msgModalParam.type = null;
                            $scope.msgModalParam.id = null;
                        }.bind(this), 2000);
                    } else {
                        $scope.msgModalParam.popupMessage = "Failed to delete blog";
                        $scope.msgModalParam.success = false;
                        closeMsgModal(2500);
                    }
                    setTimeout(function() {
                        msgModal.style.display = 'block';
                    }, 500);
                });
            } else if($scope.modalParams.type == 'edit') {
                Listings.editBlog($scope.modalParams.blog).then(function(response) {
                    if (response.data) {
                        $scope.msgModalParam.popupMessage = "Blog edited";
                        $scope.msgModalParam.success = true;
                    } else {
                        $scope.msgModalParam.popupMessage = "Failed to edit blog";
                        $scope.msgModalParam.success = false;
                    }
                    setTimeout(function() {
                        msgModal.style.display = 'block';
                    }, 500);
                    closeMsgModal(2500);
                });
            }
        }
        closeDeleteModal();
    };
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        closeDeleteModal();
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            closeDeleteModal();
        } else if (event.target == msgModal) {
            closeMsgModal(100);
        }
    }

    function closeDeleteModal() {
        modal.style.display = 'none';
        $scope.modalParams.type = null;
        $scope.modalParams.id = null;
        $scope.modalParams.blogId = null;
        $scope.modalParams.index = null;
        $scope.modalParams.blog = null;
    }

    function closeMsgModal(delay) {
        setTimeout(function() {
            msgModal.style.display = "none";
            $scope.msgModalParam.popupMessage = null;
            $scope.msgModalParam.success = null;
        }.bind(this), delay);
    }
  }]);