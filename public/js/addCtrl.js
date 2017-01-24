// Instantiate addCtrl Angular Module and Controller using geolocation module and service
// Instantiate addCtrl.controller takes 'addCtrl' '$scope' '$http' and 'geolocation'
  
  // Initialize variables formData, coords, lat, and long 
    
  // Set initial coordinates $scope.formData.latitude
  // Set initial coordinates $scope.formData.longitude

  // Functions

  // $scope.createUser method 
    // Create new user from form fields taking form text field values
      // username
      // locationType
      // appreciationTime
      // favFeature
      // location
      // htmlverified

    // $http.post method saves user data to database
      // Empty form
        // username
        // locationType
        // appreciationTime
        // favFeature
      // report error
        // console.logged

var addCtrl = angular.module('addCtrl', ['geolocation']);
addCtrl.controller('addCtrl', function($scope, $http, geolocation){

  $scope.formData = {};
  var coords = {};
  var lat = 0;
  var long = 0;

  $scope.formData.latitude = 37.7952;
  $scope.formData.longitude = 122.4028;

  $scope.createUser = function(){

    var userData = {
      username: $scope.formData.username,
      locationType: $scope.formData.locationType;
      appreciationTime: $scope.formData.appreciationTime;
      favfeature: $scope.formData.favfeature;
      location: [$scope.formData.longitude, $scope.formData.latitude],
      htmlverified: $scope.formData.htmlverified;
    };

    $http.post('/users', userData)
      .success(function(data){
        $scope.formData.username = "";
        $scope.formData.locationType = "";
        $scope.formData.appreciationTime = "";
        $scope.formData.favfeature= "";
      })
      .error(function(data){
        console.log('There was an error with: ' + data);
      });
  };
});


