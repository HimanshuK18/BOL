'use strict';
angular.module('LOCUseCase')
    .controller('TestController', ['$scope','$rootScope',  function ($scope,$rootScope) {
        var socket = io();
        socket.on('chat message', function(msg){
            $('#messages').append($('<li>').text(msg));
        });
        
        

        $scope.AcceptCertificate = function(){
                $('#myModal').modal({show: true, keyboard:true,backdrop:true}); 
        } 
        
        $scope.SendD = function()
        {
            socket.emit('chat message', $scope.cmessage);
        }
    }]);

