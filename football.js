angular.module('football', [])
  .controller('LeagueTableCtrl', LeagueTableCtrl)
  .controller('MatchesCtrl', MatchesCtrl)
  .factory('DataService', DataService);

  function DataService($scope, $http) {
    var url_base = 'https://api.crowdscores.com/v1/';
    var api_key = 'api_key=dcb6392b40ca452aaca1ee4d8258857b';
    var DataService = [];

    DataService.get = function( val ) {
      
    }

    return DataService;
  }

  function LeagueTableCtrl($scope, $http){ // is $scope needed here? my testing surgests it isn't.
    var api_key = 'api_key=dcb6392b40ca452aaca1ee4d8258857b';
    var vm = this;
    vm.table = [];

    var reqVal = 46;

    // football-data.org GET request
    // var request = {
    //   method: 'GET',
    //   url: 'http://api.football-data.org/v1/competitions/398/leagueTable?league=CL',
    //   headers: {
    //     'X-Auth-Token' : 'd0435abf7a0046b0abcba2871bc6df51'
    //   }
    // }

    // 42 = championship
    // 44 = league one
    // 45 = league two
    // 46 = La liga
    // 47 = Ligue 1
    // 48 = bundesliga
    // 49 = serie A
    // ------
    // 55 = National league
    // 56 = world cup
    //

    // crowdscores.com GET LEAGUE request
    var request = {
      method: 'GET',
      url: 'https://api.crowdscores.com/v1/league-tables?competition_id=' + reqVal + '&' + api_key
    }

    $http(request).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        vm.dataRes = response.data[0];
        //access leagueTable
        vm.table = vm.dataRes.leagueTable;

      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.

    });

  }

  function MatchesCtrl($scope, $http) {
    var api_key = 'api_key=dcb6392b40ca452aaca1ee4d8258857b';
    var vm = this;
    vm.dataRes = [];

    vm.request = function(val) {
      // crowdscores.com GET MATCHES request
      var request = {
        method: 'GET',
        url: 'https://api.crowdscores.com/v1/matches?team_id=' + val + '&' + api_key
      }

      $http(request).then(function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
          vm.dataRes = response.data;
          //access matches
          console.log(vm.dataRes);

        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.

      });
    }
  }
