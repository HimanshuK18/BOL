'use strict';

angular.module('ClinicalTrialsUseCase')
    .controller('ConversionShipmentSendController', ['$scope', '$http', '$location', function ($scope, $http, $location) {
        var refreshDrug = function () {
            $("#divGridShipment").show();
            $("#divShipmentInput").hide();
            $("#drugTitle").html("Enrichment Uranium Stockpile");
            $http.get($scope.baseurl + '/conversionshipment/' + $scope.uid).then(function (response) {
                $scope.shimentlist = response.data;
                $scope.Shipment = {};
            }, function (response)
                { return "Something went wrong." });
        };
        refreshDrug();

        $scope.addShipment = function () {
            $http.get($scope.baseurl + '/fabricationddl').then(function (response) {
                $scope.FabricationList = response.data.AllFabrication;
                $scope.ShipConversion = {};
                $("#divGridShipment").hide();
                $("#divShipmentInput").show();
                document.shipmentform.action = "/saveshipmentfabrication/" + $scope.uid;
            }, function (response)
                { return "Something went wrong." });
        };

        $scope.Savedrug = function (form) {
            if (!$scope.update && form.$valid) {
                $http.post($scope.baseurl + '/drug', $scope.drug).then(function (response) {
                    if (response.data == "OK") {
                        refreshDrug();
                    }
                }, function (response)
                    { return "Something went wrong." });
            }
            if ($scope.update && form.$valid) {
                $http.put($scope.baseurl + '/drug/' + $scope.drug._id, $scope.drug).then(function (response) {
                    refreshDrug();                    
                    $scope.update = false;
                }, function (response) { return "Something went wrong." });
            }
        };
        
        $scope.edit = function (id) {
            $http.get($scope.baseurl + '/drug/' + id).then(function (response) {
                $scope.update = true;
                $scope.drug = response.data;
                $("#divGridDrug").hide();
                $("#divDrugInput").show();
            }, function (response) {
                return "Something went wrong";
            });
        };


        $scope.updatedrug = function () {
            $http.put($scope.baseurl + '/drug/' + $scope.drug._id, $scope.drug).then(function (response) {
                refreshDrug();
            }, function (response) { return "Something went wrong." });
        };

        $scope.deselect = function () {
            $("#divGridShipment").show();
            $("#divShipmentInput").hide();
        }
        $scope.AllocateCRO = function (id) {
            $http.get($scope.baseurl + '/miningddl').then(function (response) {
                $scope.ConversionList = response.data.AllConversion;
                $scope.ShipConversion = {};
                $scope.updateP = false;
                $scope.ShipConversion.stockID = id;
                $("#divGridDrug").hide();
                $("#divDrugInput").hide();
                $("#divPharmaInput").show();
                $("#drugTitle").html("Create Shipment");
                document.Pharmaform.action = "/saveshipmentconversion/" + $scope.uid;
            }, function (response)
                { return "Something went wrong." });
        }


    }]);
