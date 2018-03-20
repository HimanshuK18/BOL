'use strict';

angular.module('ClinicalTrialsUseCase')
    .controller('MiningController', ['$scope', '$http', '$location', function ($scope, $http, $location) {
        var refreshDrug = function () {
            $("#drugTitle").html("Uranium Ore Stockpile");
            $http.get($scope.baseurl + '/drug').then(function (response) {
                $scope.druglist = response.data;
                $scope.drug = {};
                $("#divGridDrug").show();
                $("#divDrugInput").hide();
                $("#divPharmaInput").hide();
            }, function (response)
                { return "Something went wrong." });
        };
        refreshDrug();

        $scope.adddrug = function () {
            $("#divGridDrug").hide();
            $("#divDrugInput").show();
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
        $scope.remove = function (id) {
            $http.delete($scope.baseurl + '/drug/' + id).then(function (response) {
                refreshDrug();
            });
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
            $scope.drug = {};
            $("#divGridDrug").show();
            $("#divDrugInput").hide();
            $("#divPharmaInput").hide();
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

        $scope.deselectPharma = function () {
            $scope.CROList = '';
            $scope.DrugList = '';
            $scope.AllocatePharma = {};
            $("#showDrug").html("");
            $("#divGridDrug").show();
            $("#divDrugInput").hide();
            $("#divPharmaInput").hide();
            $("#drugTitle").html("Uranium Stockpile");
        }

        $scope.SaveCRODrug = function (form) {
            if (form.$valid) {
                $scope.AllocatePharma.parmacompany = $scope.uid;
                $scope.AllocatePharma.status = "Send to CRO";
                $http.put($scope.baseurl + '/pharmacro/' + $scope.uid, $scope.AllocatePharma).then(function (response) {
                    refreshlistparma();
                    $scope.CROList = '';
                    $scope.DrugList = '';
                    $scope.AllocatePharma = {};
                    $("#showDrug").html("");
                    $("#divGridDrug").show();
                    $("#divDrugInput").hide();
                    $("#divPharmaInput").hide();
                    $("#drugTitle").html("Uranium Stockpile");
                }, function (response)
                    { return "Something went wrong." });
            }
        }

    }]);
