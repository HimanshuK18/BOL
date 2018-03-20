'use strict';

angular.module('LOCUseCase')
    .controller('CustomsController', ['$scope', '$http', '$location', function ($scope, $http, $location) {
        var refreshCustoms = function () {
             $('#divGridCustoms').show();
               $("#DetailsContractC").hide();
            $http.get($scope.baseurl + '/ContractGetCutoms/' + $scope.uid).then(function (response) {
                $scope.contractlistc = response.data;
            }, function (response)
                { return "Something went wrong." });
        };
        refreshCustoms();
       
        $scope.ShowContractC = function (ContractID) { 
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

         $scope.CloseC = function () {
            $scope.ContractDetailsC = '';
             $scope.ContractDetailsBC = '';
            $("#divGridCustoms").show();
            $("#DetailsContractC").hide();
        }

        $scope.ActionC = function (id, action, form) {
            if (form.$valid) {
                var data = {
                    "action": action,
                    "customscomment": $scope.ContractDetailsC.customscomment}
                $http.put($scope.baseurl + '/ContractUpdateC/' + id, data).then(function (response) {
                    if(response.data == "OK")
                   {
                        refreshCustoms();
                    }
                }, function (response) { return "Something went wrong." });
            }
        }
    }]);
