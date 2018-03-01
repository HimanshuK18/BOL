'use strict';

angular.module('LOCUseCase')
    .controller('UserProfileController', ['$scope', '$http', '$location','$rootScope', function ($scope, $http, $location,$rootScope) {
        var socket = io();
        var refreshProfile = function () {
            $http.get($scope.baseurl + '/getprofile/' + $rootScope.EMail).then(function (response) {
                $scope.profiledata = response.data[0];
            }, function (response)
                { return "Something went wrong." });
        };
        refreshProfile();
    }]);
