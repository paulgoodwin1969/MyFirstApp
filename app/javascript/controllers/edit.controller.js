angular.module("app").controller("EditController", ["NoteFactory", "$uibModalInstance", "note", function(NoteFactory, $uibModalInstance, note) {

  var vm = this;
  vm.note = note.note.body;

  vm.submit = function() {
    note.note.body = vm.note;
    $uibModalInstance.close(note);
  }


}]);
