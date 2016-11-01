angular.module('football', [])
  .controller('LeagueTableCtrl', LeagueTableCtrl);

  function LeagueTableCtrl($scope, $http){ // is $scope needed here? my testing surgests it isn't.
    var vm = this;
    vm.list = [];

    // football-data.org GET request
    // var request = {
    //   method: 'GET',
    //   url: 'http://api.football-data.org/v1/competitions/398/leagueTable?league=CL',
    //   headers: {
    //     'X-Auth-Token' : 'd0435abf7a0046b0abcba2871bc6df51'
    //   }
    // }

    // crowdscores.com GET request
    var request = {
      method: 'GET',
      url: 'https://api.crowdscores.com/v1/league-tables?competition_id=42&api_key=dcb6392b40ca452aaca1ee4d8258857b'

    }

    $http(request).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        vm.list = response.data;
        console.log(vm.list);

      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.

    });

  }
