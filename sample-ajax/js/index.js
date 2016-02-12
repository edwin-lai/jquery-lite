console.log("HELLO FROM THE JAVASCRIPT CONSOLE!");

$.ajax({
  type: 'POST',
  url: "http://api.openweathermap.org/data/2.5/weather?q=NY,NY&appid=bcb83c4b54aee8418983c2aff3073b3b",
  success: function(data) {
    console.log("Weather aquired!");
    console.log(data);
  },
  error: function() {
    console.error(":(");
  },
});

console.log("Request done");
