'use strict';

angular.module('LOCUseCase')
    .controller('ShippingController', ['$scope', '$http', '$location','$rootScope', function ($scope, $http, $location,$rootScope) {
        var refreshShipping = function () {
            $("#divGridShipping").show();
            $("#DetailsShipemtSC").hide();
            $rootScope.ShipmentID = '';
            $http.get($scope.baseurl + '/GetShippIngCompanyShipments/' + $scope.uid).then(function (response) {
                $scope.shipmentlist = response.data;
            }, function (response)
                { return "Something went wrong." });
        };
        refreshShipping();

        $scope.ShowShipmentSC = function (ShipmentID) {
            $scope.ShipmentDetails = '';
            $scope.ShipmentDetailsB = '';
            $scope.SelectedShipmentID = ShipmentID;
            $http.get($scope.baseurl + '/ShipmentDetail/' + ShipmentID).then(function (response) {
                $scope.ShipmentDetails = response.data;
                $scope.ShipmentDetailsB = response.data;
                $("#divGridShipping").hide();
                $("#DetailsShipemtSC").show();
            }, function (response)
                { return "Something went wrong." });
        }

        $scope.CloseS = function () {
            $scope.ShipmentDetails = '';
            $scope.ShipmentDetailsB = '';
            $scope.SelectedShipmentID = '';
            $("#divGridShipping").show();
            $("#DetailsShipemtSC").hide();
        }

        $scope.AcceptS = function () {
                $http.put($scope.baseurl + '/AcceptShipmentShippingCompany/' + $scope.SelectedShipmentID).then(function (response) {
                    if(response.data == "OK")
                    {
                        refreshShipping();
                    }
                }, function (response) { return "Something went wrong." });
        }

        $scope.CreateShipmentShippingCompamy = function(Shipmentid)
        {
            $rootScope.ShipmentID = Shipmentid;
            $location.path('/shippingcompanysend/');
        }
    }]);