
'use strict';
angular.module('ClinicalTrialsUseCase')
    .controller('FabricationController', ['$scope', '$http', '$location', '$compile','$window', function ($scope, $http, $location, $compile, $window) {
        var refreshFabrication = function () {
            $("#divGridfabrication").show();
            $("#ShipmentDetailsFabricator").hide();
            $http.get($scope.baseurl + '/Fabrication/' + $scope.uid).then(function (response) {
                $scope.Fabricationlist = response.data;
                $scope.Fabrication = {};
            }, function (response)
                { return "Something went wrong." });
        };
        refreshFabrication();

        $scope.ShowShipmentFabrication = function (ShipmentId) {
            ShowWait(true);
            $scope.ShipmentID = ShipmentId;
            $http.get($scope.baseurl + '/fabricationshipmentdetail/' + ShipmentId).then(function (response) {
                $scope.ShipmentDetailsF = response.data[1];
                $scope.ShipmentDetailsFB = response.data[0];
                $("#ShipmentFiles").empty();
                var filedata = '';
                var Conversion = 'Conversion';
                for (var i = 0; i <= $scope.ShipmentDetailsF.shipmentfiles.files.length - 1; i++) {
                    filedata = filedata + "<span style='font-weight:bold;cursor:pointer;color:blue;'"
                        + "ng-click='DownloadFileF(\"" + Conversion + "\",\"" + $scope.ShipmentDetailsF._id + "\",\"" + $scope.ShipmentDetailsF.shipmentfiles.files[i].filename + "\")'"
                        + "class='ng-binding'>" + $scope.ShipmentDetailsF.shipmentfiles.files[i].filename + "</span><span> |</span>";
                }
                var temp = $compile(filedata)($scope);
                angular.element(document.getElementById('ShipmentFiles')).append(temp);
                $("#divGridfabrication").hide();
                $("#ShipmentDetailsFabricator").show();
                ShowWait(false);
            }, function (response)
                { return "Something went wrong." });
        }
        $scope.AcceptShipmentF = function (ShipmentID) {
            $http.post($scope.baseurl + '/Fabrication/accept/' + ShipmentID).then(function (response) {
                if (response.data == "OK") {
                    refreshFabrication();
                }
            }, function (response)
                { return "Something went wrong." });
        }
            
        $scope.RejectF = function (ShipmentID) {
            $http.post($scope.baseurl + '/Fabrication/reject/' + ShipmentID).then(function (response) {
                if (response.data == "OK") {
                    refreshFabrication();
                }
            }, function (response)
                { return "Something went wrong." });
        }
        $scope.deselectShipmentF = function () {
            $("#divGridfabrication").show();
            $("#ShipmentDetailsFabricator").hide();
        }

        $scope.DownloadFileF = function (Type, ShipmentID, FileName ) {
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

function ShowWait(flag) {
    if (flag) {
        $('#WaitDiv').show();
        $('.loading').css("transform", "rotateY(0deg)");
        var delay = 100;
        setTimeout(function () {
            $('.loading-spinner-large').css("display", "block");
            $('.loading-spinner-small').css("display", "block");
        }, delay);
    }
    else
    { $('#WaitDiv').hide(); }
}