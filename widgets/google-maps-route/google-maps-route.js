widget = {


  //runs when we receive data from the job
  onData: function (el, data) {
    if($('#google-maps-api-script').length == 0) {
      $('head').append('<script id="google-maps-api-script" src="https://maps.googleapis.com/maps/api/js?libraries=geometry&key=' + data.apikey + '" />');

      return;
    }

    config = data.config;

    $('h2', el).text("ABC");

    if (typeof google === 'object' && typeof google.maps === 'object') {
      var map = new google.maps.Map($(el).find(".map")[0], {
        disableDefaultUI: true
      });
      var trafficLayer = new google.maps.TrafficLayer();
      trafficLayer.setMap(map);

      directionsDisplay = new google.maps.DirectionsRenderer({
        map: map
      });

    }
    else {
      return;
    }

    //directionsDisplay.setDirections(data.route);

    var path = new google.maps.Polyline({
      path: google.maps.geometry.encoding.decodePath(data.route.routes[0].overview_polyline.points),
      geodesic: true,
      strokeColor: '#0000DD',
      strokeOpacity: 1.0,
      strokeWeight: 4
    });
    path.setMap(map);

    var bounds = new google.maps.LatLngBounds();
    var points = path.getPath().getArray();
    for (var n = 0; n < points.length ; n++){
      bounds.extend(points[n]);
    }
    map.fitBounds(bounds);

    $('h2', el).text(data.config.title + ": " + data.route.routes[0].legs[0].duration_in_traffic.text);
  }
};
