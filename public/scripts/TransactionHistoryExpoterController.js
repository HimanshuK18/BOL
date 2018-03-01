'use strict';

angular.module('LOCUseCase')
    .controller('TransactionHistoryExpoterController', ['$scope', '$http' ,'$rootScope','$location', function ($scope, $http,$rootScope,$location) {
        var refreshContractE = function () {
            $rootScope.MapShipmentID = '';
            $rootScope.shipmentID ='';
            $("#divGridExpoter").show();
            $("#DetailsShipmentI").hide();
            $http.get($scope.baseurl + '/GetShipperShipments/' + $scope.uid).then(function (response) {
                $scope.shipmentlist = response.data;
                $scope.Expoter = {};

            }, function (response)
                { return "Something went wrong." });
        };
        refreshContractE();

        $scope.ShowShipmentS = function (ShipmentID) {
            $scope.ShipmentDetails = '';
            $scope.ShipmentDetailsB = '';
            $http.get($scope.baseurl + '/ShipmentDetail/' + ShipmentID).then(function (response) {
                $scope.ShipmentDetails = response.data;
                $scope.ShipmentDetailsB = response.data;
                $("#divGridExpoter").hide();
                $("#DetailsShipmentI").show();
            }, function (response)
                { return "Something went wrong." });
        }

        $scope.CloseE = function () {
            $scope.ContractDetails = '';
            $("#divGridExpoter").show();
            $("#DetailsShipmentI").hide();
        }

        $scope.SendShipment = function(id)
        {
            ShowWait(true);
            $rootScope.shipmentID = id;
            //Save the data to the Blockchain and make the contract visible to 3 parties
            $http.put($scope.baseurl + '/ContractCreateShipper/' +  $scope.shipmentID).then(function (response) {
                if (response.data == "OK") {
                    refreshContractE();
                    ShowWait(false);
                    $('#myModal').modal({show: true});
                    $rootScope.message = "Shipment send to shipping company.";
                }
            }, function (response)
                { return "Something went wrong." });
        }

        $scope.ShowPath = function(id){
           $rootScope.MapShipmentID = id;
           $location.path('/map');
        }
    }]);