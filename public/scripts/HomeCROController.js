'use strict';

angular.module('ClinicalTrialsUseCase')
    .controller('HomeCROController', ['$rootScope', '$scope', '$http', '$window','$compile', function ($rootScope, $scope, $http, $window,$compile) {
        var refreshlistcro = function () {
            ShowWait(false);
            $("#divGridCRO").show();
            $("#AllocateHospital").hide();
            $("#CorruptMessage").hide();
            $scope.ShipmentID = '';
            $scope.sortTypeC = ''; // set the default sort type
            $scope.sortReverseC = false;  // set the default sort order
            $scope.searchCRO = '';     // set the default search/filter term
            $http.get($scope.baseurl + '/cae/' + $rootScope.uid).then(function (response) {
                $scope.ShipmentList = response.data;
            }, function (response)
                { return "Something went wrong." });
        };

        refreshlistcro();

        $scope.Allocate = function (id, CROid) {
            $("#divGridCRO").hide();
            $("#AllocateHospital").show();
            $http.get($scope.baseurl + '/croallocatedata/' + id).then(function (response) {
                $scope.PharmaTrailData = response.data.PharmaTrailData;
                $scope.HospitalList = response.data.DDLData;
                //Fill the table
                for (var i = 0; i <= $scope.CROList.length - 1; i++) {
                    if ($scope.CROList[i]._id == CROid) {
                        $("#DrugCompound").html($scope.CROList[i].drugcompound);
                        $("#TherapeuticArea").html($scope.CROList[i].therapeuticarea);
                        $("#Indication").html($scope.CROList[i].indication);
                        $("#Study").html($scope.CROList[i].study);
                        $("#Phase").html($scope.CROList[i].phase);

                    }
                }
                $("#NumberofPatientsRequired").html($scope.PharmaTrailData[0].numberofpatientsrequired);
                $("#Incentive").html($scope.PharmaTrailData[0].incentive);
                $("#Exclusions").html($scope.PharmaTrailData[0].exclusions);
                $("#Inclusions").html($scope.PharmaTrailData[0].inclusions);
                $("#StudyProtocol").html($scope.PharmaTrailData[0].file);
                $scope.PharmaTrailID = id;
            }, function (response)
                { return "Something went wrong." });

        }

        $scope.ShowShipment = function (ShipmentId) {
            ShowWait(true);
            $scope.ShipmentID = ShipmentId;
            $http.get($scope.baseurl + '/ceashipmentdetail/' + ShipmentId).then(function (response) {
                $scope.ShipmentDetails = response.data[0];
                $scope.ShipmentDetailsB = response.data[1];
                $scope.StockDetailsB = response.data[2];
                var Mining = 'Mining';
                $("#ShipmentFiles").empty();
                var filedata = '';
                for (var i = 0; i <= $scope.ShipmentDetails.shipmentfiles.files.length - 1; i++) {
                    filedata = filedata + "<span style='font-weight:bold;cursor:pointer;color:blue;'"
                        + "ng-click='DownloadFile(\"" + Mining + "\",\"" + $scope.ShipmentDetails._id + "\",\"" + $scope.ShipmentDetails.shipmentfiles.files[i].filename + "\")'"
                        + "class='ng-binding'>" + $scope.ShipmentDetails.shipmentfiles.files[i].filename + "</span><span>  | </span>";
                }
                var temp = $compile(filedata)($scope);
                angular.element(document.getElementById('ShipmentFiles')).append(temp);
                $("#divGridCRO").hide();
                $("#AllocateHospital").show();
                ShowWait(false);
            }, function (response)
                { return "Something went wrong." });
        }

        $scope.Reject = function (form) {
            $http.post($scope.baseurl + '/cae/reject/' + $scope.ShipmentID).then(function (response) {
                    if(response.data == "OK")
                    {
                       refreshlistcro();
                    }
                }, function (response)
                    { return "Something went wrong." });
        }
        $scope.AcceptShipment = function (form) {
            if (form.$valid) {
                $http.post($scope.baseurl + '/cae/accept/' + $scope.ShipmentID).then(function (response) {
                    if(response.data == "OK")
                    {
                       refreshlistcro();
                    }
                }, function (response)
                    { return "Something went wrong." });
            }
        }
        $scope.deselectCRO = function () {
            $scope.PharmaTrailData = '';
            $scope.AllocateHospital = '';
            $("#divGridCRO").show();
            $("#CorruptMessage").hide();
            $("#AllocateHospital").hide();
        }
        $scope.DownloadFile = function (Type, ShipmentID, FileName ) {
            ShowWait(true);
            var config = '';// {responseType: "blob"};
            $http.get('/download/' + ShipmentID + '/' + FileName + '/' + Type).then(function (response) {
                if (response.data.data == 'The file is corrupt.') {
                    ShowWait(false);
                    $("#message").html("The file is currupt.");
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
