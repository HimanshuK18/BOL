'use strict';

angular.module('LOCUseCase')
    .controller('InsuranceController', ['$scope', '$http', '$location', function ($scope, $http, $location) {
        var refreshCustoms = function () {
             $('#divGridInsurance').show();
               $("#DetailsContractI").hide();
            $http.get($scope.baseurl + '/ContractGetInsurance/' + $scope.uid).then(function (response) {
                $scope.contractlisti = response.data;
            }, function (response)
                { return "Something went wrong." });
        };
        refreshCustoms();
       
        $scope.ShowContractI = function (ContractID) { 
            $http.get($scope.baseurl + '/ContractDetail/' + ContractID).then(function (response) {
                $scope.ContractDetailsI = '';
                $scope.ContractDetailsI = response.data[0];
                $scope.ContractDetailsBI = '';
                $scope.ContractDetailsBI = response.data[1];                
                $("#divGridInsurance").hide();
                $("#DetailsContractI").show();
            }, function (response)
                { return "Something went wrong." });
        }

         $scope.CloseI = function () {
            $scope.ContractDetailsI = '';
             $scope.ContractDetailsBI = '';
            $("#divGridInsurance").show();
            $("#DetailsContractI").hide();
        }

        $scope.ActionI = function (id, action, form) {
            if (form.$valid) {
                var data = {
                    "action": action,
                    "insurancecomment": $scope.ContractDetailsI.insurancecomment}
                $http.put($scope.baseurl + '/ContractUpdateI/' + id, data).then(function (response) {
                    if(response.data == "OK")
                   {
                        refreshCustoms();
                    }
                }, function (response) { return "Something went wrong." });
            }
        }
    }]);
