(function() {
   var app = angular.module('DirectorySearch', ['ui.bootstrap']);
            
   app.filter('startFrom', function() {
      return function(input, start) {
         if(input) {
            start = +start;
            return input.slice(start);
        }
        return [];
      } 
   });

   app.controller('DirectoryCtrl', ['$scope', '$http', 'filterFilter', function($scope, $http, filterFilter) {
      $scope.currentPage = 1;
      $scope.numPerPage = 25;
      $scope.maxSize = 10;
      $scope.numOfPages = 0;

      $http.get('http://private-a73e-aquentuxsociety.apiary-mock.com/members').then(
         function(response) {
            $scope.records = response.data;
            $scope.selected = $scope.records[0];
            
            $scope.$watch('search', function(term) {
               $scope.filteredRows = filterFilter($scope.records, term);
               $scope.numOfPages = Math.min(Math.ceil($scope.filteredRows.length / $scope.numPerPage), $scope.maxSize);
            });
            
            $scope.$watch('currentPage', function() {
               $scope.numOfPages = Math.min(Math.ceil($scope.filteredRows.length / $scope.numPerPage), $scope.maxSize);
            });
         }
      );
      
      $scope.selectRecord = function(record) {
         $scope.selected = record;
      };
   }])
   .directive('employeeInfo', function() {
      return {
         restrict: 'E',
         templateUrl: 'employee-info.html',
         scope: {
            profile: '='
         }
      };
   });
})();