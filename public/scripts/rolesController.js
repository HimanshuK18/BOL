'use strict';
angular.module('LOCUseCase')
    .controller('rolesController', ['$scope', '$http', '$location','$rootScope', function ($scope, $http, $location,$rootScope) {


        $scope.role = function(choice){
           switch(choice)
           {
               case 1:$location.path('/supplierlanding');
                        break;
                case 2:$location.path('/blockchaintracking');
                        break;
                case 3:$location.path('/3pllanding');
                        break;
                case 4:$location.path('/tabb');
                        break;
                
           }
          /*  if (form==1) {
              
                        $location.path('/3pl');
                    }
          */
        }
      
        }]);
