// Instantiate addCtrl Angular Module and Controller using geolocation module and service
// Instantiate addCtrl.controller takes 'addCtrl' '$scope' '$http' and 'geolocation', $rootScope and gservice also
  
  // Initialize variables formData, coords, lat, and long 
    
  // Set initial coordinates $scope.formData.latitude
  // Set initial coordinates $scope.formData.longitude

  // Get User's actual coordinates based on HTML5 at window load
    // Set the latitude and longitude equal to the HTML5 coordinates
    // Display coordinates in location textboxes rounded to three decimal points
    // Display message confirming that the coordinates verified.

  // Functions

  // Get coordinates based on click
    // Run the gservice functions associated with coordinates when click detected

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

var addCtrl = angular.module('addCtrl', ['geolocation', 'gservice']);
addCtrl.controller('addCtrl', function($scope, $http, $rootScope, geolocation, gservice){

  $scope.formData = {};
  var coords = {};
  var lat = 0;
  var long = 0;

  $scope.formData.latitude = 37.7952;
  $scope.formData.longitude = 122.4028;

geolocation.getLocation().then(function(data){
    coords = {lat:data.coords.latitude, long:data.coords.longitude};

    $scope.formData.longitude = parseFloat(coords.long).toFixed(3);
    $scope.formData.latitude = parseFloat(coords.lat).toFixed(3);

    $scope.formData.htmlverified = "Yes (Thank you for verifying)";

    gservice.refresh($scope.formData.latitude, $scope.formData.longitude);

});

  $rootScope.$on("clicked", function(){
    $scope.$apply(function(){
        $scope.formData.latitude = parseFloat(gservice.clickLat).toFixed(3);
        $scope.formData.longitude = parseFloat(gservice.clickLong).toFixed(3);
        $scope.formData.htmlverified = "No";
    });
  });

  $scope.createUser = function(){

    var userData = {
      username: $scope.formData.username,
      locationType: $scope.formData.locationType,
      appreciationTime: $scope.formData.appreciationTime,
      favfeature: $scope.formData.favfeature,
      location: [$scope.formData.longitude, $scope.formData.latitude],
      htmlverified: $scope.formData.htmlverified
    };

    $http.post('/users', userData)
      .save(function(data){
        $scope.formData.username = "";
        $scope.formData.locationType = "";
        $scope.formData.appreciationTime = "";
        $scope.formData.favfeature= "";

        // Refresh the map with new data
        gservice.refresh($scope.formData.latitude, $scope.formData.longitude);
      })
      .error(function(data){
        console.log('There was an error with: ' + data);
      });
  };
});


