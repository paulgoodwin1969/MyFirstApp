angular.module("app").controller("NoteController", ["NoteFactory", "$uibModal", "$rootScope", function(NoteFactory, $uibModal, $rootScope) {

  var vm = this;
  vm.new = "";
  NoteFactory.getNotes()
    .then(function(notes) {
      vm.notes = notes;
    }, function(err) {
      console.log(err);
    })

  vm.openEdit = function(note, idx) {
    var modal = $uibModal.open({
      templateUrl : "./views/edit.html",
      controller : "EditController",
      controllerAs : "edit",
      resolve: {
        note: function () {
          return { note : note, idx : idx };
        }
      }
    });
    modal.result.then(function(note) {
      vm.notes[note.idx] = note.note;
      NoteFactory.updateNote(note.note)
    })
  }

  vm.deleteNote = function(note, idx) {
    vm.notes.splice(idx, 1);
    NoteFactory.deleteNote(note).then(function() {
      console.info("Note has been deleted.");
    })
  }

  vm.createNote = function() {
    var length = vm.notes.length;
    var body = vm.new;
    if(body.length < 1) return;
    var owner = $rootScope.user ? $rootScope.user.email : "anonymous"
    var item = {  body : vm.new, owner : { email : owner }  };
    vm.new = "";
    vm.notes.push(item);
    NoteFactory.createNote(body, length)
      .then(function(res) {
        console.log(res)
        vm.notes[res.idx] = res.note;
      }, function() {
        console.error("Error: failed to create note.")
      })
  }

}])
