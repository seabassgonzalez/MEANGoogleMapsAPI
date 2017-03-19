// Creates the angular.module gservice []
    // factory. This will be the primary means by which we interact with Google Maps


        // Initialize Variables

        // Service object our factory will return

        // Array of locations obtained from API calls

        // Selected Location Latitude (initialize to SF)
        // Selected Location longitude


        // Functions

        // Refresh the Map with new data. Function will take new latitude and longitude coordinates.

            // Clears the holding array of locations

            // Set the selected lat and long equal to the ones provided on the refresh() call

            // Perform an AJAX call to get all of the records in the db.
                // Convert the results into Google Map Format
                // Then initialize the map.


        // Private Inner Functions

        // Convert a JSON of users into map points

            // Clear the locations holder

            // Loop through all of the JSON entries provided in the response

                // Create popup windows for each record

                // Converts each of the JSON records into Google Maps Location format (Note [Lat, Lng] format).

        // location is now an array populated with records in Google Maps format


// Initializes the map

    // Uses the selected lat, long as starting point

    // If map has not been created already...

        // Create a new map and place in the index.html page

    // Loop through each location in the array and place a marker

    // For each marker created, add a listener that checks for clicks

        // When clicked, open the selected marker's message

    // Set initial location as a bouncing red marker

// Refresh the page upon window load. Use the initial latitude and longitude

angular.module('gservice', [])
    .factory('gservice', function($http){

        // Initialize Variables
        var googleMapService = {};
        var locations = [];
        var selectedLat = 37.7952;
        var selectedLong = 122.4028;

        // Functions

        // Refresh
            // Clear locations array
            // Set selected latitude and longitude to those provide at refresh call
            // AJAX get records in database
                // Convert to Google Maps expected format
                // Initialize the map
        googleMapService.refresh = function(latitude, longitude){
            locations = [];
            selectedLat = latitude;
            selectedLong = longitude;
            $http.get('/users').success(function(response){
                locations = convertToMapPoints(response);
                initialize(latitude, longitude);
            }).error(function(){});
        };

        // Private Inner Functions

        // Convert users JSON into map points
            // Clear locations
            // Iterate through JSON entries
                // Create windows for each
                // Convert each to Google Map expected location format

        var convertToMapPoints = function(response){
            var locations = [];
            for(var i=0, length=response.length; i < length; i++){
                var user = response[i];
                var contentString =
                    '<p><b>Name</b>: ' + user.name +
                    '<br><b>Age</b>: ' + user.age +
                    '<br><b>Gender</b>: ' + user.gender +
                    '<br><b>Favorite Location</b>: ' + user.favloc +
                    '</p>';

                locations.push({
                    latlon: new google.maps.LatLng(user.location[1], user.location[0]),
                    message: new google.maps.InfoWindow({
                        content: contentString,
                        maxWidth: 320
                    }),
                    username: user.username,
                    gender: user.gender,
                    age: user.age,
                    favlang: user.favlang
                });
            }
            return locations;
        };

        // Initialize the map passing in latitude and longitude arguments
            // Establish myLatLng variable to hold selected latitude and longitude
            // Check if map has been created already
                // if not instantiate map variable as new instance of google.maps.Map on page
            // Iterate through each location and place a corresponding marker on the map
                // instantiate marker variable to hold new instance of google.maps.Marker
                    // position property
                    // map prop
                    // title prop
                    // icon prop
                // add click listener using google.maps.event.addListener
                    // set current selected marker to n
                    // open n message with map and marker n.message.open(map,marker)
            // Set initial location new variable as new instance of google.maps.LatLng
            // Set marker variable as new instance of google.maps.Marker
                // position property
                    // map prop
                    // title prop
                    // icon prop
            // set lastMarker to marker
        var initialize = function(latitude, longitude){
            var myLatLng = {lat: selectedLat, lng: selectedLong};
            if(!map){
                var map = new google.maps.Map(document.getElementById('map'), {
                    zoom: 3, 
                    center: myLatLng
                });
            }
            locations.forEach(function(n, i){
                var marker = new google.maps.Marker({
                    position: n.latlon,
                    map: map,
                    title: "Initial Map",
                    icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                });
                google.maps.event.addListener(marker, 'click', function(e){
                    currentSelectedMarker = n;
                    n.message.open(map, marker);
                });
            });
            var initialLocation = new google.maps.LatLng(latitude, longitude);
            var marker = new google.maps.Marker({
                position: initialLocation,
                animation: google.maps.Animation.BOUNCE,
                map: map,
                icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
            });
            lastMarker = marker;
        };
        google.maps.event.addDomListener(window, 'load',
            googleMapService.refresh(selectedLat, selectedLong));

        return googleMapService;
    });