'use strict';
angular.module('LOCUseCase')
    .controller('3pllandingController', ['$scope', '$http', '$location','$rootScope', function ($scope, $http, $location,$rootScope) {

        //Maps and chart controller

        
  $scope.labels = ["January", "February", "March", "April", "May", "June", "July","August","September","October","November","December"];
  $scope.series = ['Series A', 'Series B'];
  $scope.data = [
    [65, 59, 80, 81, 56, 55, 40],
    //[28, 48, 40, 19, 86, 27, 90]
  ];
  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };
  $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
  $scope.options = {
    scales: {
      yAxes: [
        {
          id: 'y-axis-1',
          type: 'linear',
          display: true,
          position: 'left'
        },
        {
          id: 'y-axis-2',
          type: 'linear',
          display: false,
          position: 'right'
        }
      ]
    }
  };

  $scope.labelsDoughnut = ["Out of time limit", "Within time limit"];
  $scope.dataDoughnut = [49, 628];

        $http.get('/LOC').then(function (response) {
          
                $scope.shipmentlist = response.data;
                $scope.Expoter = {};

                //code for bar chart

                //angular.module("app", ["chart.js"]).controller("BarCtrl", function ($scope) {
                  $scope.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
                  $scope.series = ['Series A'];
                
                  $scope.data = [
                    [65, 59, 80, 81, 56, 55, 40]
                  ];
                
                
                //maps code
   
        /*var myLatLng = {lat: 20.5937, lng:78.9629};  

        $scope.map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 1,
          mapTypeId: 'satellite'
        });

        var marker = new google.maps.Marker({
         position: myLatLng,
           map: $scope.map,
          
         });
         */
         var locations = [
          ['A', 33.890542, 151.274856, 1],
          ['B', -33.923036, -151.259052, 2],
          ['C', -74.028249, 151.157507, 3],
          ['D', 23.80010128657071, 151.28747820854187, 4],
          ['E', -33.950198, -151.259302, 5]
        ];
    
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 1,
          center: new google.maps.LatLng(0, 0),
          mapTypeId: google.maps.MapTypeId.ROADMAP
        });
    
        var infowindow = new google.maps.InfoWindow();
    
        var marker, i;
    
        for (i = 0; i < locations.length; i++) { 
          marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i][1], locations[i][2]),
            map: map
          });
    
          google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
       // alert(i);
       // alert(marker.position);
          
              infowindow.setContent(locations[i][0]);
              infowindow.open(map, marker);
            }
          })(marker, i));
        }
         //end of maps and chart

            }, function (response)
                { return "Something went wrong." });


      
    }]);
