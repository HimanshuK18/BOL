'use strict';

angular.module('LOCUseCase')
    .controller('MapController', ['$scope', '$http','$rootScope', function ($scope, $http,$rootScope) {

        $http.get($scope.baseurl + '/GetMapCoordinates/' + $rootScope.MapShipmentID).then(function (response){
            var directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true,polylineOptions: {strokeColor: "blue"}});
            var directionsService = new google.maps.DirectionsService;
            var options = {zoom:4,center: new google.maps.LatLng(25,80)}
            $scope.map = new google.maps.Map(document.getElementById('map'), options);
            var polylineOptions={path:response.data.mapgpscoordinates,strokeColor:'blue'};
            var polyline= new google.maps.Polyline(polylineOptions);
            polyline.setMap($scope.map);
           // $scope.markers = [];
            //var infoWindow = new google.maps.InfoWindow();
        });

        var createMarker = function (info){     
            var marker = new google.maps.Marker({map: $scope.map,position: new google.maps.LatLng(info.lat, info.long),title: info.city});
            marker.content = '<div class="infoWindowContent">' + info.desc + '</div>';
            google.maps.event.addListener(marker, 'click', function(){
                infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
                infoWindow.open($scope.map, marker);
            });
            $scope.markers.push(marker);
        }  
        
        $scope.openInfoWindow = function(e, selectedMarker){
            e.preventDefault();
            google.maps.event.trigger(selectedMarker, 'click');
        }
    }]);
