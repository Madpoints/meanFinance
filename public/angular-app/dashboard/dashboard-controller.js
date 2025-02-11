angular.module('cdfinance').controller("DashboardController", DashboardController);

function DashboardController( $http, $window, AuthFactory, jwtHelper, $location) {
  var vm = this;
  if ($window.sessionStorage.token && AuthFactory.isLoggedIn) {
    var token = $window.sessionStorage.token;
    var decodedToken = jwtHelper.decodeToken(token);
    var username = decodedToken.username;
    
    $http.get('/api/users/'+ username +"/stocks").then(function(response) {
      console.log(response.data.stocks, "dashboard-controller: 11")
      // Old line:14 'vm.stocks = response.data' 
      // needed to access .stocks object to retrieve stock info for a user
      vm.stocks = response.data.stocks;
    }).catch(function(error) {
      console.log(error);
    })
    $http.get('/api/users/' + username).then(function(response) {
      vm.balance = response.data
    })
  } else {
    $location.path('/');
  }
}