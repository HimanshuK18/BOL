angular.module('LOCUseCase')
    .controller('SigninController', ['$rootScope', '$scope', '$localStorage', 'LOCUseCaseService', function ($rootScope, $scope, $localStorage, LOCUseCaseService) {
        LOCUseCaseService.logOut();
        $scope.emailid = '';
        $scope.password = '';
        
        $scope.LoginClick = function (form) {
            if (form.$valid) {
                var data = {
                    "emailid": $scope.emailid,
                    "password": $scope.password
                };
                LOCUseCaseService.signin(data); 
            }
        }

    }]);


function ShowWait(flag) {
    if (flag) {
        $('#WaitDiv').show();
        $('.loading').css("transform", "rotateY(0deg)");
        var delay = 100;
        setTimeout(function () {
            $('.loading-spinner-large').css("display", "block");
            $('.loading-spinner-small').css("display", "block");
        }, delay);
    }
    else
    { $('#WaitDiv').hide(); }
}