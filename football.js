angular.module('football', [])
  .controller('LeagueTableCtrl', LeagueTableCtrl, DataService)
  .controller('MatchesCtrl', MatchesCtrl)
  .service('DataService', DataService)
  .directive('matches', matches);

  function LeagueTableCtrl($scope, $http){ // is $scope needed here? my testing surgests it isn't.
    var vm = this;
    var api_key = 'api_key=dcb6392b40ca452aaca1ee4d8258857b';
    var reqParam = 'league-tables?competition_id='; //default parameters
    vm.reqVal = 2; //default competition_id

    vm.activeTab = 2; //default active tab
    vm.table = [];

    //request after change of league
    vm.setReqVal = function( val ){
      vm.reqVal = val;
      var request = {
        method: 'GET',
        url: 'https://api.crowdscores.com/v1/' + reqParam + vm.reqVal + '&' + api_key
      }

      $http(request).then(function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
          vm.dataRes = response.data[0];
          //access leagueTable
          vm.table = vm.dataRes.leagueTable;
          console.log(vm.table);

        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.

      });

    }

    //request for top players
    // $scope.$watch('activeTab', function() {
    //     alert('hey, activeTab has changed to '+ vm.activeTab);
    // });



    //vm.test = DataService(vm.reqVal);
    //console.log(vm.test);

    // football-data.org GET request
    // var request = {
    //   method: 'GET',
    //   url: 'http://api.football-data.org/v1/competitions/398/leagueTable?league=CL',
    //   headers: {
    //     'X-Auth-Token' : 'd0435abf7a0046b0abcba2871bc6df51'
    //   }
    // }

    // 2 = premier league
    // 42 = championship
    // 43 = FA cup
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
      url: 'https://api.crowdscores.com/v1/' + reqParam + vm.reqVal + '&' + api_key
    }

    $http(request).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        vm.dataRes = response.data[0];
        //access leagueTable
        vm.table = vm.dataRes.leagueTable;
        console.log(vm.table);

      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.

    });

    // TABS (TAB FOR PLAYERSTATS)

    vm.selectTab = function(setTab) {
      vm.activeTab = setTab;
      if (vm.activeTab === 1) {
       var reqParam = 'playerstats?competition_id=';
       var request = {
         method: 'GET',
         url: 'https://api.crowdscores.com/v1/' + reqParam + vm.reqVal + '&' + api_key
       }

       $http(request).then(function successCallback(response) {
           vm.playerStats = response.data;
           console.log(vm.playerStats);
         }, function errorCallback(response) {

       });
     }
     if (vm.activeTab === 2) {
       console.log('activeTab is set as 2');
     }

    }
    vm.tabIsSelected = function(checkTab) {
      return vm.activeTab === checkTab;
    }

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
          vm.requestDone = true;
          //access matches
          console.log(vm.dataRes);

        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.

      });
    }
  }



  function DataService($scope, $http) {
    var url_base = 'https://api.crowdscores.com/v1/';
    var api_key = 'api_key=dcb6392b40ca452aaca1ee4d8258857b';
    var reqParam = 'league-tables?competition_id=';
    var reqVal = 46; //Set as defualt?
    var request = '';
  //  DataService = function( val ){

  //    this.initialize = function () {
        var request = {
          method: 'GET',
          url: url_base + reqParam + val + '&' + api_key
        }
        var self = this;

        $http(request).then(function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
          data = response.data;
          //access matches
          console.log(vm.dataRes);

        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          return false;
        });
  //    }
  //  } // end var Dataservice
    return request;

  }

  function matches() {
      return {
        templateUrl: '/magicfootballapp/templates/matches.html'
      };
  }
