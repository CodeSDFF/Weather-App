//var $body = $('body');
//var $prompt = $('#prompt');
//
//var $city = $('#city').val();
//$prompt.text('The weather in ' + city + ' is currently: ');
//
//var openWeatherMap = 'api.openweathermap.org/data/2.5/weather?q=' + city;

var city = "";
//default city is San Diego
$.getJSON("http://api.openweathermap.org/data/2.5/weather?q=San Diego&mode=json&units=imperial&APPID=2e7a793e3530732e27d99c958b53f8eb",
          function(json){
    console.log(json);
    console.log(json["weather"]);
    $('#cityName').text(json['name']);
    $('#ambientWeather').text(json['weather'][0]['description']);
    var iconCode = json['weather'][0]["icon"]
    var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
    console.log(iconUrl);
    $('#iconDay').attr("src", iconUrl);
    $('#temp').text(json["main"]["temp"]);
    fivedayForecast("San Diego");
    setBackgroundColor(json['weather'][0]['id']);

});

$('#selectedCityBut').keydown(function(event) {
    if (event.which == 13) {
        city = event.target.value;
        console.log(city);

        if (city) {
            $.getJSON("http://api.openweathermap.org/data/2.5/weather?q=" + city + "&mode=json&units=imperial&APPID=918cfc46242bc81cb15e16cd0fb9a5f0",
                      function(json) {
                console.log(json);
                console.log(json["weather"]);
                $('#cityName').text(json['name']);
                $('#ambientWeather').text(json['weather'][0]['description']);
                var iconCode = json['weather'][0]["icon"]
                var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
                console.log(iconUrl);
                $('#iconDay').attr("src", iconUrl);
                $('#temp').text(json["main"]["temp"]);
                fivedayForecast(city);
                setBackgroundColor(json['weather'][0]['id']);

            });
        }
    }
});

//get the city from user and display the forecast
function getCity(ele){
    if(event.keyCode == 13) {
        city = ele.value;
        console.log(ele.value);        
    }
    if(city != ""){
        $.getJSON("http://api.openweathermap.org/data/2.5/weather?q="+city +"&mode=json&units=imperial&APPID=918cfc46242bc81cb15e16cd0fb9a5f0",
                  function(json){
            console.log(json);
            console.log(json["weather"]);
            $('#cityName').text(json['name']);
            $('#ambientWeather').text(json['weather'][0]['description']);
            var iconCode = json['weather'][0]["icon"]
            var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
            console.log(iconUrl);
            $('#iconDay').attr("src", iconUrl);
            $('#temp').text(json["main"]["temp"]);
            fivedayForecast(city);
        });
    }
    return;
}

function fivedayForecast(city){
    $.getJSON("http://api.openweathermap.org/data/2.5/forecast?q="+city+"&mode=json&units=imperial&APPID=918cfc46242bc81cb15e16cd0fb9a5f0", function(json){
        console.log(json);  
        var date1 = json["list"][5]["dt_txt"];
        var date1 = new Date(date1);
        var day = date1.toDateString().split(" ");
        $('#day1').text(day[0]);
        var temp = json["list"][5]["main"]["temp"];
        var iconCode = json["list"][5]["weather"][0]["icon"];
        var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
        console.log(iconUrl);
        $('#temp1').text(temp); 
        $('#img1').attr("src",iconUrl);
        $('#weather1').text(json["list"][5]["weather"][0]["description"]);

        var date2 = json["list"][13]["dt_txt"];
        date2 = new Date(date2);
        var day2 = date2.toDateString().split(" ");
        $("#day2").text(day2[0]);
        $('#temp2').text(json["list"][13]["main"]["temp"]); 
        $('#img2').attr("src", "http://openweathermap.org/img/w/" +json["list"][13]["weather"][0]["icon"]+".png");
        $('#weather2').text(json["list"][13]["weather"][0]["description"]);

        var date3 = json["list"][21]["dt_txt"];
        date3 = new Date(date3);
        var day3 = date3.toDateString().split(" ");
        $("#day3").text(day3[0]);
        $('#temp3').text(json["list"][21]["main"]["temp"]);
        $('#img3').attr("src", "http://openweathermap.org/img/w/" +json["list"][21]["weather"][0]["icon"]+".png");
        $('#weather3').text(json["list"][21]["weather"][0]["description"]);

        var date4= json["list"][29]["dt_txt"];
        date4 = new Date(date4);
        var day4 = date4.toDateString().split(" " );
        $("#day4").text(day4[0]);
        $('#temp4').text(json["list"][29]["main"]["temp"]);
        $('#img4').attr("src", "http://openweathermap.org/img/w/" +json["list"][29]["weather"][0]["icon"]+".png");
        $('#weather4').text(json["list"][29]["weather"][0]["description"]);

        var date5 = json["list"][37]["dt_txt"];
        date5 = new Date(date5);
        var day5 = date5.toDateString().split(" ");
        $("#day5").text(day5[0]);
        $('#temp5').text(json["list"][37]["main"]["temp"]); 
        $('#img5').attr("src", "http://openweathermap.org/img/w/" +json["list"][37]["weather"][0]["icon"]+".png");
        $('#weather5').text(json["list"][37]["weather"][0]["description"]);
    });

    function setBackgroundColor(condition) {
        var color = 'white';

        switch(true) {
            case (condition >= 200 && condition <= 299): // Group 2xx: Thunderstorm
                color = 'red';
                break;
            case (condition >= 300 && condition <= 399): // Group 3xx: Drizzle
                color = 'green';
                break;
            case (condition >= 500 && condition <= 599): // Group 5xx: Rain
                color = 'pink';
                break;
            case (condition >= 600 && condition <= 699): // Group 6xx: Snow
                color = 'white';
                break;
            case (condition >= 700 && condition <= 799): // Group 7xx: Atmosphere
                color = 'yellow';
                break;
            case (condition == 800):                     // Group 800: Clear
                color = 'blue';
                break;
            case (condition >= 801 && condition <= 899): // Group 80x: Clouds
                color = 'grey';
                break;
            default:
                color = 'white';
        }

        $('body').css('background-color', color);
    }
};