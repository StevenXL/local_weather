$(document).ready(function() {
  var geoObj = navigator.geolocation;

  // retrieve appropriate city and state
  geoObj.getCurrentPosition(function(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    var endPointCoord = 'http://api.wunderground.com/api/cd5e931660a9ed25/geolookup/q/' + latitude + ',' + longitude + '.json';

    $.getJSON(endPointCoord, function(data) {
      var state = data["location"]["state"];
      var city = data["location"]["city"].replace(/\s/g,'_'); // must replace spaces with underscores for API call

      // retrieve weather and attach to DOM
      var endPointWeather = 'http://api.wunderground.com/api/cd5e931660a9ed25/conditions/q/' + state + '/' + city + '.json'

      $.getJSON(endPointWeather, function(data) {
        // gather data
        var full_location = data["current_observation"]["display_location"]["full"];
        var conditions = data["current_observation"]["weather"];
        var temperature = data["current_observation"]["temp_f"];
        var icon = data["current_observation"]["icon_url"];
        var lastObserved = data["current_observation"]["observation_time"];

        // build and attach icon and weather
        nodeStruct = '';
        nodeStruct += '<div class="row" id="icon-temp">';
        nodeStruct += '<div class="col-md-2 col-md-offset-4">';
        nodeStruct += '<img src="' + icon + '" + alt="Icon of current weather"/>';
        nodeStruct += '</div>';
        nodeStruct += '<div class="col-md-2 temp">';
        nodeStruct += '<h2>' + temperature + ' <sup>F</sup>' + '</h2>';
        nodeStruct += '</div>';
        nodeStruct += '</div>';
        $("#weather").append(nodeStruct);

        // build and attach location and condition and last observation
        nodeStruct = '';
        nodeStruct += '<div class="row" id="weather-info">';
        nodeStruct += '<div class="col-md-2 col-md-offset-4" id="location">';
        nodeStruct += '<h3>' + full_location + '</h3>';
        nodeStruct += '</div>';
        nodeStruct += '<div class="col-md-2" id="conditions">';
        nodeStruct += '<h3>' + conditions + '</h3>';
        nodeStruct += '</div>';
        nodeStruct += '</div>';
        $("#weather").append(nodeStruct);
      });
    });
  });
});
