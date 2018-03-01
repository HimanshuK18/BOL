'use strict';

angular.module('LOCUseCase')
    .controller('CustomsOutgoingController', ['$scope', '$http', '$location', function ($scope, $http, $location) {
        var refreshCustomsO = function () {
             $('#divGridCustoms').show();
               $("#DetailsContractC").hide();
            $http.get($scope.baseurl + '/ContractGetCutomsOutgoing/' + $scope.uid).then(function (response) {
                $scope.contractlistc = response.data;
            }, function (response)
                { return "Something went wrong." });
        };
        refreshCustomsO();
       
        $scope.ShowContractCO = function (ContractID) { 
            $http.get($scope.baseurl + '/ContractDetail/' + ContractID).then(function (response) {
                $scope.ContractDetailsC = '';
                $scope.ContractDetailsC = response.data[0];
                $scope.ContractDetailsBC = '';
                $scope.ContractDetailsBC = response.data[1];                
                $("#divGridCustoms").hide();
                $("#DetailsContractC").show();
            }, function (response)
                { return "Something went wrong." });
        }

         $scope.CloseCO = function () {
            $scope.ContractDetailsC = '';
             $scope.ContractDetailsBC = '';
            $("#divGridCustoms").show();
            $("#DetailsContractC").hide();
        }

        $scope.ActionCO = function (id, action, form) {
            if (form.$valid) {
                var data = {
                    "action": action,
                    "customsdestinationcomment": $scope.ContractDetailsC.customsdestinationcomment}
                $http.put($scope.baseurl + '/ContractUpdateCOutgoing/' + id, data).then(function (response) {
                    if(response.data == "OK")
                   {
                        refreshCustomsO();
                    }
                }, function (response) { return "Something went wrong." });
            }
        }
    }]);
