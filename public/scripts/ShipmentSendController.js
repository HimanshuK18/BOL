'use strict';

angular.module('LOCUseCase')
    .controller('ShipmentSendController', ['$scope', '$http', '$location', '$rootScope', function ($scope, $http, $location, $rootScope) {
        var refreshShipment = function () {
            var id = $rootScope.shipmentID;
            $http.get($scope.baseurl + '/getimpoterddldata/').then(function (response) {
                $scope.shimentddllist = response.data;
            }, function (response)
                { return "Something went wrong." });
        };
        refreshShipment();

        $scope.SendShipment = function (form) {
            if (form.$valid) {
                $http.put('ShipmentSend/' + $rootScope.shipmentID, $scope.Shipment).then(function (response) {
                    if (response.data == "OK") {
                        $location.path('/transactionhistorye');
                    }
                });
            }
        };

        $scope.deselectS = function () {
            $location.path('/transactionhistorye');
        }
    }]);
