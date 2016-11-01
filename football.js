angular.module('football', [])
  .controller('LeagueTableCtrl', LeagueTableCtrl);

  function LeagueTableCtrl($scope, $http){ // is $scope needed here? my testing surgests it isn't.
    var vm = this;
    vm.list = [];

    //Simple GET request
    $http({
      method: 'GET',
      url: 'http://api.football-data.org/v1/competitions/398/leagueTable',
      headers: {
        'X-Auth-Token' : 'd0435abf7a0046b0abcba2871bc6df51'
      }
    }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        vm.list = response.data;
        console.log(vm.list);

      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.

    });

  }
