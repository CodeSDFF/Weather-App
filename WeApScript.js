var $body = $('body');
var $prompt = $('#prompt');

var $city = $('#city').val();
$prompt.text('The weather in ' + city + ' is currently: ');

var openWeatherMap = 'api.openweathermap.org/data/2.5/weather?q=' + city;