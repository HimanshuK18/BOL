'use strict';
angular.module('LOCUseCase')
    .controller('blockchaintrackingController', ['$scope', '$http', '$location','$rootScope', function ($scope, $http, $location,$rootScope) {

      var socket = io();
      setTimeout(myfunction, 8000);
      function myfunction() {
        socket.on('chat message', function (msg) {
          if (msg == 'yes') { document.getElementById("divTx4").style.backgroundColor = "orangered"; }
          else {              document.getElementById("divTx4").style.backgroundColor = "#73AD21"; }
        });
        socket.emit('chat message', 'this is the message');
      }
    }]);

