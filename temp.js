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
    });