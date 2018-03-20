'use strict';

angular.module('LOCUseCase')
    .controller('ShippingCompanySendController', ['$rootScope', '$scope', '$http', '$location', function ($rootScope, $scope, $http, $location) {
        $http.get($scope.baseurl + '/ShipmentDetail/' + $rootScope.ShipmentID).then(function (response) {
            $scope.shipmentdetails = response.data;
        }, function (response) { return "Something went wrong." });

        $scope.shipmentdetailss = {};
        $scope.shipmentdetailss.bolissued = 'RECEIVED SHIPMENT BILL OF LADING';
        $scope.AcceptedCertificateShippingComapany = "No";
        $scope.ClearorFoulStyle = { "color": "red", "font-weight": "bold", "font-size": "20px" };
        $scope.ConsignmentData = [{
            'unit': 'Unit ' + '1',
            'rfid': '',
            'goodcondition': '',
            'selected': ''
        }];

        $scope.ConsignmentConditionData = [{ "name": "No" }, { "name": "Yes" }];
        $scope.addrows = function () {
            var newLength = $scope.ConsignmentData.length;
            newLength = newLength + 1;
            $scope.ConsignmentData.push(
                {
                    'unit': 'Unit ' + newLength,
                    'rfid': '',
                    'goodcondition': '',
                    'selected': ''
                });
        };

        $scope.CheckConsignment = function (value) {
            $scope.ClearorFoulStyle = { "color": "red", "font-weight": "bold", "font-size": "20px" };
            $scope.shipmentdetailss.cleanorfoul = "Foul";
            if (value == 'No') {
                $scope.ClearorFoulStyle = { "color": "red", "font-weight": "bold", "font-size": "20px" };
                $scope.shipmentdetailss.cleanorfoul = "Foul";
            }
            else {
                //check if the previous added rows are clear or foul
                for (let i = 0; i <= $scope.ConsignmentData.length - 1; i++) {
                    for (let j = 0; j <= $scope.shipmentdetails.consignmentData.length - 1; j++) {
                        if ($scope.shipmentdetails.consignmentData[j].rfid == $scope.ConsignmentData[i].rfid) {
                            $scope.ClearorFoulStyle = { "color": "white", "font-weight": "bold", "font-size": "20px" };
                            $scope.shipmentdetailss.cleanorfoul = "Clear";
                            break;
                        }
                        else {
                            $scope.ClearorFoulStyle = { "color": "red", "font-weight": "bold", "font-size": "20px" };
                            $scope.shipmentdetailss.cleanorfoul = "Foul";
                        }
                    }
                }
            }
        };
        $scope.deleterows = function () {
            var newDataList = [];
            angular.forEach($scope.ConsignmentData, function (selected) {
                if (!selected.selected) {
                    newDataList.push(selected);
                }
            });
            $scope.ConsignmentData = newDataList;
        };
        $scope.CancelShipmentS = function () {
            $rootScope.ShipmentID = '';
            $location.path('/shippingcompany');
        };
        $scope.AcceptCertificateS = function () {
            if ($scope.shipmentdetailss.authorizedpersonshippingcompany == undefined || $scope.shipmentdetailss.containerfid == undefined) {
                $('#myModal').modal({ show: true });
                $rootScope.message = "Please enter your name and Container RFID.";
            }
            else { $scope.AcceptedCertificateShippingComapany = "Yes"; }
        };

        $scope.SaveShipmentShippingCompany = function (form) {
            if (form.$valid) {
                if ($rootScope.ShipmentID != '') {
                    ShowWait(true);
                    $scope.shipmentdetailss.ShipmentID = $rootScope.ShipmentID;
                    $scope.shipmentdetailss.consignmentDataShippingCompany = $scope.ConsignmentData;
                    $http.put($scope.baseurl + '/ShippingComapanySave', $scope.shipmentdetailss).then(function (response) {
                        if (response.data == "OK") {
                            $rootScope.ShipmentID = '';
                            ShowWait(false);
                            $location.path('/shippingcompany');
                        }
                    }, function (response) { return "Something went wrong." });
                }
            }
        };
        var socket = io();
        socket.on('rfid value', function (msg) {
        console.log(msg.num);
        console.log(msg.type);
        $scope.$apply(function() {var index = $scope.ConsignmentData.length -1;
            $scope.ConsignmentData[index].rfid = msg.num;
           $scope.ConsignmentData[index].type = msg.type;
            });
        });
        socket.on('rfid container', function (msg) {
        console.log(msg.num);
        console.log(msg.type);
        $scope.$apply(function() {$scope.shipmentdetailss.containerfid=msg.num;
            });
        });
    }]);


