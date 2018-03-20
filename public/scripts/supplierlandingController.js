'use strict';
angular.module('LOCUseCase')
  .controller('supplierlandingController', ['$scope', '$http', '$location', '$rootScope', function ($scope, $http, $location, $rootScope) {
    var socket = io();
    //Maps and chart controller
    $scope.labels = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    $scope.series = ['Series A', 'Series B'];
    $scope.data = [[85, 89, 80, 81, 86, 95, 91, 97, 90, 94, 89, 96]];
    $scope.bardata = [[1, 1, 2, 1, 0, 2, 3, 1, 0, 0, 2, 1]];
    $scope.bar2data = [[5, 5, 7, 5, 6, 5, 5, 6, 7, 7, 5, 7]];
    $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
    $scope.baroptions = {
      scales: {
        yAxes: [
          {
            id: 'y-axis-1',
            type: 'linear',
            display: true,
            position: 'left',
            ticks: {
              max: 5,
              min: 0
            },
          }
        ]
      }
    };
    $scope.bar2options = {
      scales: {
        yAxes: [
          {
            id: 'y-axis-1',
            type: 'linear',
            display: true,
            position: 'left',
            ticks: {
              max: 10,
              min: 0
            },
          }
        ]
      }
    };
    $scope.options = {
      scales: {
        yAxes: [
          {
            id: 'y-axis-1',
            type: 'linear',
            display: true,
            position: 'left',
            ticks: {
              max: 100,
              min: 0
            },
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
    var ctx = document.getElementById("doughnut");
    var backgroundColors = [
      "#FFCE56",
      "#BBBCBB"
    ];
    var hoverBackgrounds = [
      "#EEBD47",
      "#BFCCDC"];
    var myChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ["With in Time Limit", "Out Time Limit"],
        datasets: [{
          data: [594, 73],
          backgroundColor: backgroundColors,
          hoverBackgroundColor: hoverBackgrounds
        }]
      }
    });

    var myLatLng = [{ lat: 20.5937, lng: 78.9629 }, { lat: -25.2744, lng: 133.7751 }, { lat: 8.7832, lng: 34.5085 }, 
      { lat: 56.1304, lng: 106.3468 }, { lat: 51.9244, lng: 4.4777 }];
      $scope.map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 24.397, lng: 90.644 },
        zoom: 1,
        mapTypeId: 'satellite'
      });
      //green markers
      var imagegreen = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
      var imagered = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
      for (var i = 0; i < myLatLng.length; i++) {
        var marker = new google.maps.Marker({
          position: myLatLng[i],
          map: $scope.map,
          icon: imagegreen
        });
      }
      //Redirecting on click of marker
      google.maps.event.addListener(marker, 'click', function () {
        $scope.$apply(function () {
          console.log("Marker clicked");
          $location.path('/transitsupplier');
        });
      });

      setTimeout(myfunction, 8000);
      function myfunction() {
        socket.on('chat message', function (msg) {
          if (msg == 'yes') { marker.setIcon({ url: imagered }); }
          else { marker.setIcon({ url: imagegreen }); }
        });
        socket.emit('chat message', 'this is the message');
      }





  }]);