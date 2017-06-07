angular.module("app").factory("UserFactory", ["$stamplay", "$q", "$rootScope", function($stamplay, $q, $rootScope){
  return {
    login : function(credentials) {
      $stamplay.User.login({
        email : credentials.email,
        password : credentials.password
      }).then(function(res) {
        $rootScope.user = res;
        $rootScope.$apply()
      })
    },
    signup : function(credentials) {
      $stamplay.User.signup({
        email: credentials.email,
        password : credentials.password
      }).then(function(res) {
        $rootScope.user = res;
        $rootScope.$apply()
      })
    },
    logout : function() {
      $stamplay.User.logout();
    }
  }
}])
