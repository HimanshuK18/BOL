'use strict';

angular.module('LOCUseCase', ['ngStorage','ngRoute','ngAnimate','angular-loading-bar','ui.bootstrap'])
.config(['$routeProvider', '$httpProvider','$locationProvider', function ($routeProvider, $httpProvider,$locationProvider) {
    $locationProvider.hashPrefix('');
    $routeProvider.
        when('/signin', {
            templateUrl: 'partials/signin.html',
            controller: 'SigninController'
        }).
        when('/profile', {
            templateUrl: 'partials/UserProfile.html',
            controller: 'UserProfileController'
        }).
        when('/transactionhistorye', {
            templateUrl: 'partials/TransactionHistoryExpoter.html',
            controller: 'TransactionHistoryExpoterController'
        }).
        when('/transactionhistoryi', {
            templateUrl: 'partials/TransactionHistoryImpoter.html',
            controller: 'TransactionHistoryImpoterController'
        }).        
        when('/shippingcompanysend/', {
            templateUrl: 'partials/ShippingCompanySend.html',
            controller: 'ShippingCompanySendController'
        }).
        when('/contract', {
            templateUrl: 'partials/Contract.html',
            controller: 'ContractController'
        }).
        when('/sendshipment', {
            templateUrl: 'partials/SendShipment.html',
            controller: 'ShipmentSendController'
        }).
        when('/shippingcompany', {
            templateUrl: 'partials/Shipping.html',
            controller: 'ShippingController'
        }).
        when('/readytounload', {
            templateUrl: 'partials/ReadytoUnload.html',
            controller: 'ReadytoUnloadController'
        }).
        when('/readytoload', {
            templateUrl: 'partials/ReadyToLoad.html',
            controller: 'ReadyToLoadController'
        }).
        when('/loc', {
            templateUrl: 'partials/CreateLOC.html',
            controller: 'CreateLOCController'
        }).
        when('/map', {
            templateUrl: 'partials/Map.html',
            controller: 'MapController'
        }).
        when('/insurance', {
            templateUrl: 'partials/Insurance.html',
            controller: 'InsuranceController'
        }).
        when('/test', {
            templateUrl: 'partials/test.html',
            controller: 'TestController'
        }).
        otherwise({
            redirectTo: '/signin'
        });
    $httpProvider.interceptors.push(['$q', '$location', '$localStorage', function($q, $location, $localStorage) {
            return {
                'request': function (config) {
                    config.headers = config.headers || {};
                    if ($localStorage.token) {
                        config.headers.Authorization = 'Bearer ' + $localStorage.token;
                    }
                    return config;
                },
                'responseError': function(response) {
                    if(response.status === 401 || response.status === 403) {
                        $location.path('/signin');
                    }
                    return $q.reject(response);
                }
            };
        }]);
}

])
.run(['$rootScope',function($rootScope){
$rootScope.showflag = false;
}
]);
