'use strict';
angular.module('LOCUseCase')
    .controller('ContractController', ['$scope', '$http', '$location', '$rootScope', function ($scope, $http, $location, $rootScope) {
        $scope.shipmentdetails = {};
        $http.get($scope.baseurl + '/getprofileandshippingcompany/' + $scope.uid).then(function (response) {
            $scope.shipmentdetails.shippername = response.data[0].companyname;
            $scope.shipmentdetails.shipperaddress = response.data[0].address;
            $scope.shipmentdetails.shippercity = response.data[0].city;
            $scope.shipmentdetails.shippercountry = response.data[0].country;
            $scope.shipmentdetails.shipperphone = response.data[0].phone;
            $scope.ConsigneeList = response.data[1].filter(function (e) { return e.UserType == 'Consignee'; });
            $scope.ShippingCompanyList = response.data[1].filter(function (e) { return e.UserType == 'Shipping Company'; });
        }, function (response) { return "Something went wrong." });
        function SelectConsignee() {

        }
        $scope.ConsignmentTypeData = [{ "name": "Box" }, { "name": "Drum" }];
        $scope.HazardousMaterialData = [{ "name": "No" }, { "name": "Yes" }];
        $scope.AcceptedCertificate = "No";
        $scope.consignmentData = [
            {
                'unit': '1',
                'type': '',
                'rfid': '',
                'hazardousmaterial': '',
                'description': '',
                'weight': 0,
                'selected': ''
            }];

        $scope.addrow = function () {
            var index = $scope.consignmentData.length + 1;
            $scope.consignmentData.push(
                {
                    'unit': index,
                    'type': '',
                    'rfid': '',
                    'hazardousmaterial': '',
                    'description': '',
                    'weight': 0,
                    'selected': ''
                });
        }

        $scope.deleterow = function () {
            var newDataList = [];
            angular.forEach($scope.consignmentData, function (selected) {
                if (!selected.selected) {
                    newDataList.push(selected);
                }
            });
            $scope.consignmentData = newDataList;
        };

        $scope.AcceptCertificate = function () {
            if ($scope.shipmentdetails.authorizedperson == undefined) {
                $('#myModal').modal({ show: true });
                $rootScope.message = "Please enter your name.";
            }
            else { $scope.AcceptedCertificate = "Yes"; }
        }

        $scope.SaveShipment = function (form) {
            if (form.$valid) {
                $scope.shipmentdetails.shipper = $scope.uid;
                $scope.shipmentdetails.consignmentData = $scope.consignmentData;
                $http.post($scope.baseurl + '/ShipperSave', $scope.shipmentdetails).then(function (response) {
                    if (response.data == "OK") {
                        $location.path('/transactionhistorye');
                    }
                }, function (response) { return "Something went wrong." });
            }
        }

        $scope.ChangeConsignee = function () {
            for (let i = 0; i <= $scope.ConsigneeList.length - 1; i++) {
                if ($scope.shipmentdetails.consignee == $scope.ConsigneeList[i]._id) {
                    $scope.shipmentdetails.consigneeaddress = $scope.ConsigneeList[i].address;
                    $scope.shipmentdetails.consigneecity = $scope.ConsigneeList[i].city;
                    $scope.shipmentdetails.consigneecountry = $scope.ConsigneeList[i].country;
                    $scope.shipmentdetails.consigneephone = $scope.ConsigneeList[i].phone;
                }
            }
        }
        $scope.deselectContract = function () {
            $location.path('/transactionhistorye');
        }


        var socket = io();
        socket.on('rfid value', function (msg) {
        console.log(msg.num);
        console.log(msg.type);
        $scope.$apply(function() {var index = $scope.consignmentData.length -1;
            $scope.consignmentData[index].rfid = msg.num;
          
         });
        });
    }]);
