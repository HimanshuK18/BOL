'use strict';
angular.module('LOCUseCase')
    .controller('ReadytoUnloadController', ['$scope', '$http', '$location','$rootScope', function ($scope, $http, $location,$rootScope) {
        var refreshShipmentToUnLoad = function () {
             $('#divGridShipmentsUnLoad').show();
             $("#DetailsShipemtSCLUnload").hide();
             $("#divfillformUnload").hide();
            $http.get($scope.baseurl + '/GetReadyToUnLoadShipments/' + $scope.uid).then(function (response) {
                $scope.shipmentlistsc = response.data;
            }, function (response)
                { return "Something went wrong." });
        };
        refreshShipmentToUnLoad();
       
        $scope.ShowShipmentSCUnloadData = function (ShipmentID) {
            $scope.ShipmentDetails = '';
            $scope.ShipmentDetailsB = '';
            $scope.SelectedShipmentID = ShipmentID;
            $http.get($scope.baseurl + '/ShipmentDetail/' + ShipmentID).then(function (response) {
                $scope.ShipmentDetails = response.data;
                $scope.ShipmentDetailsB = response.data;
                $("#divGridShipmentsUnLoad").hide();
                $("#DetailsShipemtSCLUnload").show();
            }, function (response)
                { return "Something went wrong." });
        }

        $scope.CloseUnLoad = function () {
            $scope.ShipmentDetails = '';
            $scope.ShipmentDetailsB = '';
            $scope.SelectedShipmentID = '';
            $scope.ShipmentIDLoad = '';
            $("#divGridShipmentsUnLoad").show();
            $("#DetailsShipemtSCLUnload").hide();
            $("#divfillformUnload").hide();
        }
        $scope.UnLoadConsigment = function(id){
            $scope.unloadshipmentdetails = {};
            $scope.unloadshipmentdetails.boltobeissued = 'On Board Bill of Lading';
            $scope.unloadshipmentdetails.ShipmentIDLoad = id;
            $("#divGridShipmentsUnLoad").hide();
            $("#DetailsShipemtSCLUnload").hide();
            $("#divfillformUnload").show();
            $scope.UnLoadConsignmentData = [{
                'unit': 'Unit ' + '1',
                'rfid': '',
                'goodcondition': '',
                'selected': ''
            }];
            $scope.ConsignmentConditionData = [{ "name": "No" }, { "name": "Yes" }];
        };

        $scope.deselectUnLoading = function(){
            $scope.ShipmentIDLoad = '';
            $("#divGridShipmentsUnLoad").show();
            $("#DetailsShipemtSCLUnload").hide();
            $("#divfillformUnload").hide();
        };
        $scope.addrows = function () {
            var newLength = $scope.UnLoadConsignmentData.length;
            newLength = newLength + 1;
            $scope.UnLoadConsignmentData.push(
                {
                    'unit': 'Unit ' + newLength,
                    'rfid': '',
                    'goodcondition': '',
                    'selected': ''
                });
        };

        $scope.deleterows = function () {
            var newDataList = [];
            angular.forEach($scope.UnLoadConsignmentData, function (selected) {
                if (!selected.selected) {
                    newDataList.push(selected);
                }
            });
            $scope.UnLoadConsignmentData = newDataList;
        };
        $scope.SaveShipmentUnLoading = function (form) {
            if (form.$valid) {
                ShowWait(true);
                $scope.unloadshipmentdetails.UnLoadConsignmentData = $scope.UnLoadConsignmentData;
                    $http.put($scope.baseurl + '/ShippingComapanyUnLoadingSave/', $scope.unloadshipmentdetails).then(function (response) {
                        if (response.data == "OK") {
                            $scope.unloadshipmentdetails = {};
                            $scope.unloadshipmentdetails.boltobeissued = '';
                            $scope.unloadshipmentdetails.ShipmentIDLoad = '';
                            $("#divGridShipmentsUnLoad").show();
                            $("#DetailsShipemtSCLUnload").hide();
                            $("#divfillformUnload").hide();
                            ShowWait(false);
                            refreshShipmentToUnLoad();
                            $rootScope.message = "Shipment Un Loaded and Business rules implemented.";
                            $('#myModal').modal({show: true});
                            
                        }
                    }, function (response) { return "Something went wrong." });  
            }
        };
        
        var socket = io();
        socket.on('rfid value', function (msg) {
        console.log(msg.num);
        console.log(msg.type);
        $scope.$apply(function() {
            var index = $scope.UnLoadConsignmentData.length -1;
            $scope.UnLoadConsignmentData[index].rfid=msg.num;
           
            });
        });
        socket.on('rfid container', function (msg) {
        console.log(msg.num);
        console.log(msg.type);
        $scope.$apply(function() {$scope.unloadshipmentdetails.containerrfidunload=msg.num;
            });
        });
    }]);
