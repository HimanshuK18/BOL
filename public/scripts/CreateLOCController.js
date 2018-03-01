'use strict';
angular.module('LOCUseCase')
    .controller('CreateLOCController', ['$scope', '$http', '$location', '$rootScope', function ($scope, $http, $location, $rootScope) {
        var refreshLOC = function () {
            $('#divGridLOC').show();
            $('#divLOCDetails').hide();
            $rootScope.MapShipmentID = '';
            $rootScope.shipmentID ='';
            $http.get($scope.baseurl + '/GetLOC/' + $scope.uid).then(function (response) {
                $scope.shipmentlist = response.data;
                $scope.loc = {};
            }, function (response)
                { return "Something went wrong." });
        };
        refreshLOC();
        $scope.CreateLOC = function () {
            $('#divGridLOC').hide();
            $('#divLOCDetails').show();
            $http.get($scope.baseurl + '/getports/').then(function (response) {
                $scope.portslist = response.data;
            }, function (response) { return "Something went wrong." });
        }

        $scope.SaveLOC = function(){
            
        }
    }]);

