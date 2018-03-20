'use strict';
angular.module('LOCUseCase')
    .controller('3plController', ['$scope', '$http', '$location','$rootScope', function ($scope, $http, $location,$rootScope) {
 

$scope.SaveShipment = function(form){
            if (form.$valid) {
               // $scope.shipmentdetails.shipper = $scope.uid;
              //  $scope.shipmentdetails.consignmentData = $scope.consignmentData;
            $http.post($scope.baseurl + '/3plSave', $scope.logistics).then(function (response) {
                    if (response.data == "OK") {
                        $location.path('/3pllanding');
                    }
                }, function (response)
                    { return "Something went wrong." });
            }
        }

        $http.get('/LOCFORM').then(function (response) {
          
                $scope.shipmentlist = response.data;
                $scope.Expoter = {};
        });

           }]);