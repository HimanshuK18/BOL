'use strict';
angular.module('LOCUseCase')
    .controller('customerController', ['$scope', '$http', '$location','$rootScope', function ($scope, $http, $location,$rootScope) {


        $scope.SaveShipment = function(form){
            if (form.$valid) {
               // $scope.shipmentdetails.shipper = $scope.uid;
              //  $scope.shipmentdetails.consignmentData = $scope.consignmentData;
            $http.post($scope.baseurl + '/customerSave', $scope.logistics).then(function (response) {
                    if (response.data == "OK") {
                        $location.path('/transactionhistorye');
                    }
                }, function (response)
                    { return "Something went wrong." });
            }
        }

      
    }]);

