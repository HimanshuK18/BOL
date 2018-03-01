'use strict';

/* Controllers */

angular.module('LOCUseCase')
    .controller('IndexController', ['$rootScope', '$scope', '$location', '$localStorage', 'LOCUseCaseService', function ($rootScope, $scope, $location, $localStorage, LOCUseCaseService) {
        var currentUser = LOCUseCaseService.getUserFromToken();
        if (currentUser.name == undefined) {
            $location.path('/signin');
        }
        else {
            LOCUseCaseService.setBootUpValues(currentUser);            
        }
        $scope.LogoutUser = function () {
            LOCUseCaseService.logOut();
        }
        $scope.ShowProfile = function()
        {
            $location.path('/profile');
        }
        $rootScope.message = "";
    }]);
