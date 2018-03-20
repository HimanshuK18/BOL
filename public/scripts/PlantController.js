'use strict';
angular.module('ClinicalTrialsUseCase')
    .controller('PlantController', ['$scope', '$http', '$location', '$compile','$window', function ($scope, $http, $location, $compile,$window) {
        var refreshPlant = function () {
            $("#divGridPlant").show();
            $("#ShipmentDetailsPlant").hide();
            $http.get($scope.baseurl + '/plant/' + $scope.uid).then(function (response) {
                $scope.PlantList = response.data;
                $scope.Plant = {};
            }, function (response)
                { return "Something went wrong." });
        };
        refreshPlant();

        $scope.ShowShipmentPlant = function (PlantId) {
            $scope.PlantId = PlantId;
            $http.get($scope.baseurl + '/plantshipmentdetail/' + PlantId).then(function (response) {
                $scope.PlantShipmentDetails = response.data[1];
                $scope.PlantShipmentDetailsB = response.data[0];
                $("#ShipmentFiles").empty();
                var filedata = '';
                var Fabrication = 'Fabrication';
                for (var i = 0; i <= $scope.PlantShipmentDetails.shipmentfiles.files.length - 1; i++) {
                    filedata = filedata + "<span style='font-weight:bold;cursor:pointer;color:blue;'"
                        + "ng-click='DownloadFileP(\"" + Fabrication + "\",\"" + $scope.PlantShipmentDetails._id + "\",\"" + $scope.PlantShipmentDetails.shipmentfiles.files[i].filename + "\")'"
                        + "class='ng-binding'>" + $scope.PlantShipmentDetails.shipmentfiles.files[i].filename + "</span><span> |</span>";
                }
                var temp = $compile(filedata)($scope);
                angular.element(document.getElementById('ShipmentFiles')).append(temp);
                $("#divGridPlant").hide();
                $("#ShipmentDetailsPlant").show();
            }, function (response)
                { return "Something went wrong." });
        }
        $scope.AcceptShipmentF = function (PlantId) {
            $http.post($scope.baseurl + '/plant/accept/' + PlantId).then(function (response) {
                if (response.data == "OK") {
                    refreshPlant();
                }
            }, function (response)
                { return "Something went wrong." });
        }

         $scope.RejectP = function (PlantId) {
            $http.post($scope.baseurl + '/plant/reject/' + PlantId).then(function (response) {
                if (response.data == "OK") {
                    refreshPlant();
                }
            }, function (response)
                { return "Something went wrong." });
        }

        $scope.deselectShipmentF = function () {
            $("#divGridPlant").show();
            $("#ShipmentDetailsPlant").hide();
        }

        $scope.DownloadFileP = function (Type, ShipmentID, FileName ) {
            ShowWait(true);
            var config = '';
            $http.get('/download/' + ShipmentID + '/' + FileName + '/' + Type).then(function (response) {
                if (response.data.data == 'The file is corrupt.') {
                    ShowWait(false);
                    $("#message").html("The file is corrupt.");
                }
                else {
                    if (response.data.data == "OK") {
                        ShowWait(false);
                        $window.open('/downloadfile/' + response.data.filename + '/' + response.data.type );
                    }                   
                }
            });
            ShowWait(false);
        }
    }]);

