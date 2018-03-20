'use strict';

angular.module('LOCUseCase')
    .controller('ReadyToLoadController', ['$scope', '$http', '$location', function ($scope, $http, $location) {
        var refreshShipmentToLoad = function () {
             $('#divGridShipmentsLoad').show();
             $("#DetailsShipemtSCL").hide();
             $("#divfillform").hide();
                           
            $http.get($scope.baseurl + '/GetReadyToLoadShipments/' + $scope.uid).then(function (response) {
                $scope.shipmentlistsc = response.data;
            }, function (response)
                { return "Something went wrong." });
        };
        refreshShipmentToLoad();
       
        $scope.ShowShipmentSCData = function (ShipmentID) {
            $scope.ShipmentDetails = '';
            $scope.ShipmentDetailsB = '';
            $scope.SelectedShipmentID = ShipmentID;
            $http.get($scope.baseurl + '/ShipmentDetail/' + ShipmentID).then(function (response) {
                $scope.ShipmentDetails = response.data;
                $scope.ShipmentDetailsB = response.data;
                $("#divGridShipmentsLoad").hide();
                $("#DetailsShipemtSCL").show();
            }, function (response)
                { return "Something went wrong." });
        }

        $scope.CloseSL = function () {
            $scope.ShipmentDetails = '';
            $scope.ShipmentDetailsB = '';
            $scope.SelectedShipmentID = '';
            $scope.ShipmentIDLoad = '';
            $("#divGridShipmentsLoad").show();
            $("#DetailsShipemtSCL").hide();
            $("#divfillform").hide();
        }

        $scope.LoadConsigment = function(id){
            $scope.loadshipmentdetails = {};
            $scope.loadshipmentdetails.bolissued = 'On Board Bill of Lading';
            $scope.loadshipmentdetails.ShipmentIDLoad = id;
            $("#divGridShipmentsLoad").hide();
            $("#DetailsShipemtSCL").hide();
            $("#divfillform").show();
        };

        $scope.deselectLoading = function(){
            $scope.ShipmentIDLoad = '';
            $("#divGridShipmentsLoad").show();
            $("#DetailsShipemtSCL").hide();
            $("#divfillform").hide();
        };

        $scope.SaveShipmentLoading = function (form) {
            if (form.$valid) {
                ShowWait(true);
                    $http.put($scope.baseurl + '/ShippingComapanyLoadingSave/', $scope.loadshipmentdetails).then(function (response) {
                        if (response.data == "OK") {
                            $scope.ShipmentIDLoad = '';
                            $("#divGridShipmentsLoad").show();
                            $("#DetailsShipemtSCL").hide();
                            $("#divfillform").hide();
                            refreshShipmentToLoad();
                            ShowWait(false);
                        }
                    }, function (response) { return "Something went wrong." });  
            }
        };
        var socket = io();
         socket.on('rfid container', function (msg) {
        console.log(msg.num);
        console.log(msg.type);
        $scope.$apply(function() {$scope.loadshipmentdetails.containerefidload=msg.num;
            });
        });
        
    }]);
