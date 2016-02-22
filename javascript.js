
// --------------------------------------------------VARIABLES
var app = {};
app.key = 'AIzaSyA_M8pebubRnGkDrRFArlPn-6Q3weomoI0';


// --------------------------------------------------DISTANCE DRIVING
 app.distanceDrive = function(origin, destination){
  var service = new google.maps.DistanceMatrixService();
  service.getDistanceMatrix(
    {
      origins: [origin],
      destinations: [destination],
      travelMode: google.maps.TravelMode.DRIVING
    }, callback);

  function callback(response, status) {
    console.log(response);
   
 
    app.displayInfo(response);
  }
 }

// --------------------------------------------------DISTANCE BIKING
 app.distanceBike = function(origin, destination){
  var service = new google.maps.DistanceMatrixService();
  service.getDistanceMatrix(
    {
      origins: [origin],
      destinations: [destination],
      travelMode: google.maps.TravelMode.BICYCLING
    }, callback);

  function callback(biking, status) {
    console.log(biking);
   
 
    app.displayBike(biking);
  }
 }

 // --------------------------------------------------DISTANCE WALKING
 app.distanceWalk = function(origin, destination){
  var service = new google.maps.DistanceMatrixService();
  service.getDistanceMatrix(
    {
      origins: [origin],
      destinations: [destination],
      travelMode: google.maps.TravelMode.WALKING
    }, callback);

  function callback(walking, status) {
    console.log(walking);
   
 
    app.displayWalk(walking);
  }
 }



// --------------------------------------------------GET INFO FROM API


app.getLocation = function(userInput){
  $.ajax({
    url: 'https://maps.googleapis.com/maps/api/geocode/json',
    type: 'GET',
    dataType:'json',
    data: {
      address:userInput
    }
  }).then(function(result){
    var lat = (result.results[0].geometry.location.lat);
    var lng = (result.results[0].geometry.location.lng);
      console.log (lat,lng);

    var origin1 = new google.maps.LatLng(lat, lng);
      //lat and long of User Address
    var toronto = new google.maps.LatLng(43.653908, -79.384293);
    //Lat and long of Toronto
    // var app = new google.maps.DistanceMatrixService();
    app.distanceDrive(origin1, toronto);
    app.distanceBike(origin1, toronto);
    app.distanceWalk(origin1, toronto);

});
}

// --------------------------------------------------INPUT TO HTML DRIVING

app.displayInfo = function(response) {
//get distance in KM
 var dDistance = response['rows'][0]['elements'][0]['distance']['text'];
    var title = $('#km').text(dDistance);
    console.log("Drive dist" + dDistance);

//get time driving
var dTime = response['rows'][0]['elements'][0]['duration']['text'];
  var drivingTime = $('#drive').text(dTime);
    console.log("Drive time" + dTime);


}

// --------------------------------------------------INPUT TO HTML BIKING

app.displayBike = function(biking) {
var bTime = biking['rows'][0]['elements'][0]['duration']['text'];
  var bikingTime = $('#bike').text(bTime);
    console.log(bTime);
  }

  // --------------------------------------------------INPUT TO HTML WALKING

app.displayWalk = function(walking) {
var wTime = walking['rows'][0]['elements'][0]['duration']['text'];
  var walkingTime = $('#walk').text(wTime);
    console.log(wTime);
  }
// --------------------------------------------------INIT
app.getterdun = function(){
  $('#userAddress').on('submit', function(res){
   res.preventDefault(); 
   $('main').hide();
   $('.result').fadeIn();
   console.log('getterdun')
   var userInput = $('#address').val();
   console.log(userInput);
   app.getLocation(userInput);

});

  $('.logo, #leaf').on('click', function(){
    $('.result').hide();
   $('main').fadeIn();
  });
}


// --------------------------------------------------DOCUMENT READY

$(function(){
  app.getterdun();
  console.log("javascript!")
});

