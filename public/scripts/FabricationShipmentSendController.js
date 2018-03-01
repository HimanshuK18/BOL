'use strict';

angular.module('ClinicalTrialsUseCase')
    .controller('FabricationShipmentSendController', ['$scope', '$http', '$location', function ($scope, $http, $location) {
        var refreshDrug = function () {
            $("#drugTitle").html("Fabricated Uranium Stockpile");
            $("#divGridShipmentF").show();
            $("#divShipmentFInput").hide();
            $http.get($scope.baseurl + '/fabricationplantshipment/' + $scope.uid).then(function (response) {
                $scope.shimentlistf = response.data;
            }, function (response)
                { return "Something went wrong." });
        };
        refreshDrug();

        $scope.SendShipmentF = function () {
            $http.get('NuclearPlantDDL').then(function(response) {
                $scope.PlantList = response.data;
                $("#divGridShipmentF").hide();
                $("#divShipmentFInput").show();
                document.shipmentform.action = "/createsshipmentfabrication/" + $scope.uid;
            });
               
        };

        $scope.deselectF = function () {
            $("#divGridShipmentF").show();
            $("#divShipmentFInput").hide();
            
        }
    }]);
