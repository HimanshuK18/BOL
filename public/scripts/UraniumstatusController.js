'use strict';

angular.module('ClinicalTrialsUseCase')
    .controller('UraniumstatusController', ['$scope', '$http', '$location', function ($scope, $http, $location) {
        var refreshUstatus = function () {
            $("#drugTitle").html("Uranium Shipment Status");
            $http.get($scope.baseurl + '/uraniumstatus/' + $scope.uid).then(function (response) {
                $scope.shipmentlist = response.data;
                $("#divGridDrug").show();
                $("#divDrugInput").hide();
                $("#divPharmaInput").hide();
            }, function (response)
                { return "Something went wrong." });
        };
        refreshUstatus();
       
    }]);
