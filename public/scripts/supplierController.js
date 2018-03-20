'use strict';
angular.module('LOCUseCase')
    .controller('supplierController', ['$scope', '$http', '$location','$rootScope', function ($scope, $http, $location,$rootScope) {
$("#tableone").hide();

$scope.t1load=function()
{
    $("#tableone").show();
}
$scope.t1hide=function()
{
    $("#tableone").hide();
}
$scope.SaveShipment = function(form){
            if (form.$valid) {
            $http.post($scope.baseurl + '/3plSave', $scope.customerdetails).then(function (response) {
                    if (response.data == "OK") {
                        $location.path('/supplierlanding');
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
