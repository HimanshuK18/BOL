'use strict';

angular.module('LOCUseCase')
    .factory('LOCUseCaseService', ['$http', '$localStorage', '$rootScope', '$location', function ($http, $localStorage, $rootScope, $location) {
        var baseUrl = "";
        function urlBase64Decode(str) {
            var output = str.replace('-', '+').replace('_', '/');
            switch (output.length % 4) {
                case 0:
                    break;
                case 2:
                    output += '==';
                    break;
                case 3:
                    output += '=';
                    break;
                default:
                    throw 'Illegal base64url string!';
            }
            return window.atob(output);
        }
        function setBootUpValues(currentUser) {
            $rootScope.showflag = true;
            $rootScope.uid = currentUser.id;
            $rootScope.name = currentUser.name;
            $rootScope.EMail = currentUser.email;
            $rootScope.fileBusinessType = currentUser.UserType;
            $rootScope.errorclass = 'rederror';
            $rootScope.baseurl = baseUrl;
            return SetNavigation(currentUser);
        }
        function SetNavigation(user) {
            $rootScope.viewAdmin = false;
            $rootScope.viewHistory = false;
            $rootScope.viewContract = false;
            $rootScope.viewHistoryO = false;
            $rootScope.viewHelp = true;
            $rootScope.viewContact = true;
            $rootScope.viewUnLoad = false;
            $rootScope.viewLOC = false;
            

            var path = '';
            switch (user.UserType) {
                case "Shipper":
                    $rootScope.viewHistory = true;
                    $rootScope.viewContract = true;
                    $('#homelink').attr("href", "#/transactionhistorye");
                    $('#flaskLink').attr("href", "#/transactionhistorye");
                    return path = '/transactionhistorye';
                case "Shipping Company":
                    $rootScope.viewHistory = true;
                    $rootScope.viewHistoryO = true;
                    $rootScope.viewUnLoad = true;
                    $('#homelink').attr("href", "#/shippingcompany");
                    $("#homelink").text("Shipments Incoming |");
                    $('#flaskLink').attr("href", "#/shippingcompany");
                    return path = '/shippingcompany';
                case "Consignee":
                    $rootScope.viewHistory = true;
                    $('#homelink').attr("href", "#/transactionhistoryi");
                    $('#flaskLink').attr("href", "#/transactionhistoryi");
                    $rootScope.viewLOC = true;
                    return path = '/transactionhistoryi';
                case "Insurer":
                    $rootScope.viewHistory = true;
                    $('#homelink').attr("href", "#/insurance");
                    $('#flaskLink').attr("href", "#/insurance");
                    return path = '/insurance';
                case "Admin":
                    $rootScope.viewAdmin = true;
                    $rootScope.viewHistory = true;
                    $rootScope.viewContract = true;                
                    break;
            }

        }
        function getUserFromToken() {
            var token = $localStorage.token;
            var user = {};
            if (typeof token !== 'undefined') {
                var encoded = token.split('.')[1];
                user = JSON.parse(urlBase64Decode(encoded));
            }
            return user;
        }
        return {

            signin: function (data, callback) {
                $http.post(baseUrl + '/authenticate', data).then(function (response) {
                    $rootScope.name = response.data.data.name;
                    $rootScope.EMail = response.data.data.email;
                    if (response.data.token != undefined) {
                        $rootScope.showflag = true;
                        $localStorage.token = response.data.token;
                        var user = getUserFromToken();
                        var pathT = setBootUpValues(user);
                        $location.path(pathT);
                    }
                }, function (response) {
                    return "Something went wrong";
                }
                );
            },
            getUserFromToken: function (success) {
                var token = $localStorage.token;
                var user = {};
                if (typeof token !== 'undefined') {
                    var encoded = token.split('.')[1];
                    user = JSON.parse(urlBase64Decode(encoded));
                }
                return user;
            },
            getBaseUrl: function () {
                return baseUrl;
            },
            setBootUpValues: function (currentUser) {
                setBootUpValues(currentUser);
            },
            setTopNavigation: function () {
                SetNavigation(currentUser);
            },
            logOut: function () {
                $rootScope.showflag = false;
                $rootScope.name = '';
                $rootScope.EMail = '';
                $rootScope.fileBusinessType = '';
                delete $localStorage.token;
                $location.path('/signin');
            }
        };
    }
    ]);