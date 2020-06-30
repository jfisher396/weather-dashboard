//TODO:create list for past search items
//TODO:link UV index
//TODO:get icons to show
//TODO:setup local storage



//Pulls the current date
let NowMoment = moment().format("l");
let displayDate = document.getElementById('currentDay');
let day1 = moment().add(1, 'days').format('l');
let day2 = moment().add(2, 'days').format('l');
let day3 = moment().add(3, 'days').format('l');
let day4 = moment().add(4, 'days').format('l');
let day5 = moment().add(5, 'days').format('l');


// searches the API for the chosen city
$("#search-button").on("click", function(event) {
    event.preventDefault();
    var citySelection = $("#city-input").val();
   
    console.log(citySelection)
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + citySelection + "&units=imperial&appid=42d98d76405f5b8038f2ad71187af430";
    console.log(queryURL);
    // var queryURL2 = "https://api.openweathermap.org/data/2.5/forecast?q=" + citySelection + "&units=imperial&appid=42d98d76405f5b8038f2ad71187af430";
    // var queryURL3 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&exclude=minutely,hourly" + "&units=imperial&appid=42d98d76405f5b8038f2ad71187af430";
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
        $("#temp").text("Temperature (F): " + cityTemp.toFixed(1));
        $("#humidity").text("Humidity: " + cityHum + "%");
        $("#wind-speed").text("Wind Speed: " + cityWind + "mph");
        $("#date1").text(day1);
        $("#date2").text(day2);
        $("#date3").text(day3);
        $("#date4").text(day4);
        $("#date5").text(day5);
    });
    
    // $.ajax({
    //     url: queryURL3,
    //     method: "GET"
    // }).then(function (response) {
    //     console.log(response);
    //     console.log(response.list.length);
    // for (let i = 0; i < response.list.length; i++) {
        
    // })
    
    var pastCities = JSON.parse(localStorage.getItem("cities"));
    console.log(pastCities)
    $("#cityList").prepend("<td>" + pastCities + "</td>");

    })
    

