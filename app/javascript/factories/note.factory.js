angular.module("app").factory("NoteFactory", ["$stamplay", "$q", function($stamplay, $q) {
  return {
    getNotes : function() {
      var q = $q.defer();
      $stamplay.Object("note").get({
        populate_owner : true
      }).then(function(res) {
        q.resolve(res.data);
      }, function(err) {
        q.reject(err);
      })
      return q.promise;
    },
    updateNote : function(note) {
      var q = $q.defer();
      $stamplay.Object("note").patch(note._id, {
        body : note.body
      }).then(function(res) {
        q.resolve(res);
      }, function(err) {
        q.reject(err);
      })
      return q.promise;
    },
    createNote : function(body, idx) {
      var q = $q.defer();
      $stamplay.Object("note").save({
        body : body
      }).then(function(res) {
        $stamplay.User.currentUser()
          .then(function(res) {
            if(res.hasOwnProperty("user")) {
              note.owner = res.user;
              q.resolve({ note : note, idx : idx });
            } else{
              q.resolve({ note : note, idx : idx });
            }
          })
      }, function(err) {
        q.reject(err);
      })
      return q.promise;
    },
    deleteNote : function(note) {
      var q = $q.defer();
      $stamplay.Object("note").remove(note._id)
        .then(function(res) {
          q.resolve();
        }, function(err) {
          q.reject();
        })
      return q.promise;
    }
  }
}])
