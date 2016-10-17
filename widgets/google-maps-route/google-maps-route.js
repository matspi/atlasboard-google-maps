widget = {


  //runs when we receive data from the job
  onData: function (el, data) {
    if($('#google-maps-api-script').length == 0) {
      $('head').append('<script id="google-maps-api-script" src="https://maps.googleapis.com/maps/api/js?key=' + data.globalAuth['google-apis'].maps + '" />');
      return;
    }

    var map = new google.maps.Map($(el).find(".map")[0], {
      disableDefaultUI: true
    });


    var trafficLayer = new google.maps.TrafficLayer();
    trafficLayer.setMap(map);

    var directionsDisplay = new google.maps.DirectionsRenderer({
      map: map
    });

    // Set destination, origin and travel mode.
    var request = {
      destination: data.destination,
      origin: data.source,
      travelMode: 'DRIVING',
      drivingOptions: {
        departureTime: new Date(Date.now())
      }
    };

    // Pass the directions request to the directions service.
    var directionsService = new google.maps.DirectionsService();
    directionsService.route(request, function(response, status) {
      if (status == 'OK') {
        // Display the route on the map.
        directionsDisplay.setDirections(response);
      }
    });
  }
};