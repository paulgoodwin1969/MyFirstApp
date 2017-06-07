angular.module("app", [
  "ui.router",
  "ui.bootstrap",
  "ngStamplay"
])
.config(["$urlRouterProvider", "$stateProvider",
  function($urlRouterProvider, $stateProvider) {

    $stateProvider
      .state("Home", {
        url : "/",
        templateUrl : "./views/home.html",
        controller : "NoteController",
        controllerAs : "note"
      })

    $urlRouterProvider.otherwise("/");

}])
.run(["$rootScope", function($rootScope) {

  Stamplay.init("pjgfirstapp");

  Stamplay.User.currentUser()
    .then(function(res) {
      if(res.hasOwnProperty("user")) {
        $rootScope.user = res.user;
        $rootScope.$apply();
      } else {
        $rootScope.user = false;
        $rootScope.$apply();
      }

    })

}])
