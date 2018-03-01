
'use strict';
angular.module('LOCUseCase')
    .controller('TransactionHistoryImpoterController', ['$scope', '$http', '$location','$rootScope', function ($scope, $http, $location, $rootScope) {
        var refreshContractI = function () {
            $("#divGridImpoter").show();
            $("#divdashboardreport").hide();
            $http.get($scope.baseurl + '/GetConsigneeShipments/' + $scope.uid).then(function (response) {
                $scope.shipmentlist = response.data;
                $scope.Impoter = {};

            }, function (response)
                { return "Something went wrong." });
        };
        refreshContractI();

        $scope.SeeStatus = function(id){
            ShowWait(true);
            $http.get($scope.baseurl + '/GetBusinessRuleOutput/' + id).then(function (response) {
            $("#divGridImpoter").hide();
            $("#divdashboardreport").show();
                $scope.businessrules = response.data;
                ShowWait(false);
            }, function (response)
                { return "Something went wrong." });
          
        }
        $scope.ClosedashBoard = function(){
            $("#divGridImpoter").show();
            $("#divdashboardreport").hide();
        }
        $scope.ShowPath = function(id){
            $rootScope.MapShipmentID = id;
            $location.path('/map');
         }
    }]);