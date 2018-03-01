'use strict';

angular.module('LOCUseCase')
    .controller('InsuranceClaimsController', ['$scope', '$http', '$location', function ($scope, $http, $location) {
        var refreshCustoms = function () {
             $('#divGridInsurance').show();
               $("#DetailsContractI").hide();
            $http.get($scope.baseurl + '/ContractGetInsuranceClaims/' + $scope.uid).then(function (response) {
                $scope.contractlistclaims = response.data;
            }, function (response)
                { return "Something went wrong." });
        };
        refreshCustoms();
       
        $scope.ShowContractI = function (ContractID) { 
            $http.get($scope.baseurl + '/ContractDetail/' + ContractID).then(function (response) {
                $scope.ContractDetailsIC = '';
                $scope.ContractDetailsIC = response.data[0];
                $scope.ContractDetailsBIC = '';
                $scope.ContractDetailsBIC = response.data[1];                
                $("#divGridInsurance").hide();
                $("#DetailsContractI").show();
            }, function (response)
                { return "Something went wrong." });
        }

         $scope.CloseI = function () {
            $scope.ContractDetailsIC = '';
             $scope.ContractDetailsBIC = '';
            $("#divGridInsurance").show();
            $("#DetailsContractI").hide();
        }

        $scope.ActionIC = function (id, action, form) {
            if (form.$valid) {
                var data = {
                    "action": action,
                    "insuranceclaimcomment": $scope.ContractDetailsIC.insuranceclaimcomment}
                $http.put($scope.baseurl + '/ContractUpdateIClaim/' + id, data).then(function (response) {
                    if(response.data == "OK")
                   {
                        refreshCustoms();
                    }
                }, function (response) { return "Something went wrong." });
            }
        }
    }]);
