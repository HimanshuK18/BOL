'use strict';

angular.module('LOCUseCase')
    .controller('PaymentsController', ['$rootScope', '$scope', '$http', '$window', function ($rootScope, $scope, $http, $window) {
        var refreshlistpayment = function () {
            $scope.name = $rootScope.name;
            ShowWait(false);
            $("#divGridPayment").show();
            $("#PaymentDetail").hide();
            $scope.sortTypeC = ''; // set the default sort type
            $scope.sortReverseC = false;  // set the default sort order
            $scope.searchCRO = '';     // set the default search/filter term
            $scope.PaymentDetails ='';
            $http.get($scope.baseurl + '/payment/' + $rootScope.uid).then(function (response) {
                $scope.PaymentList = response.data;
            }, function (response)
                { return "Something went wrong." });
        };
        refreshlistpayment();
        $scope.ShowPayment = function(id)
        {
            for(var i=0; i <=  $scope.PaymentList.length -1; i++)
            {
                if($scope.PaymentList[i]._id == id)
                    {
                        $scope.PaymentDetails = $scope.PaymentList[i];
                        $("#divGridPayment").hide();
                        $("#PaymentDetail").show();
                    }
            }
        }
        $scope.Close = function()
        {
                        $("#divGridPayment").show();
                        $("#PaymentDetail").hide();
                        $scope.PaymentDetails ='';
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
