//TODO:create list for past search items
//TODO:create card for current weather conditions
//TODO:create cards for 5-day forcast
//TODO:link UV index
//TODO:get icons to show
//TODO:setup local storage



//Pulls the current date
let NowMoment = moment().format("l");
let displayDate = document.getElementById('currentDay');

// searches the API for the chosen city
$("#search-button").on("click", function(event) {
    event.preventDefault();
    var citySelection = $("#city-input").val();
    console.log(citySelection)
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + citySelection + "&units=imperial&appid=42d98d76405f5b8038f2ad71187af430";
    console.log(queryURL);
    var queryURL2 = "https://api.openweathermap.org/data/2.5/forecast?q=" + citySelection + "&units=imperial&appid=42d98d76405f5b8038f2ad71187af430";
    let cities = document.querySelector("#city-input").value;
    console.log(cities);
    localStorage.setItem("cities", JSON.stringify(cities));


    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        let cityName = response.name;
        let cityCond = response.weather[0].description;
        let cityTemp = response.main.temp;      
        let cityHum = response.main.humidity;
        let cityWind = response.wind.speed;
        $("#city-name").text(cityName + " " + "(" + NowMoment + ")");
        $("#city-cond").text("Current Conditions: " + cityCond);
        $("#temp").text("Temperature (F): " + cityTemp.toFixed(2));
        $("#humidity").text("Humidity: " + cityHum + "%");
        $("#wind-speed").text("Wind Speed: " + cityWind + "mph");
        
    });
    
    // $.ajax({
    //     url: queryURL2,
    //     method: "GET"
    // }).then(function (response) {
    //     console.log(response);
    //     console.log(response.list.length);
    // for (let i = 0; i< response.list.length; i++) {
    //     let forecastDiv = $("<div>");
    //     forecastDiv.addClass("card").text("Forecast");
        
    //     if (response.list[i].dt_txt.includes("15:00:00")) {
    //         console.log($(this));
    //     }
        
    //     $("#forecast").append(forecastDiv);
    // }
        

    // });
    // var pastCities = JSON.parse(localStorage.getItem("cities"));
    // console.log(pastCities)
    // $("#cityList").val("<tr></tr>");
})