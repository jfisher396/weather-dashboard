$(document).ready(function () {

  //Pulls the current date
  let NowMoment = moment().format("l");
  
  //adds days to moment for forecast
  let day1 = moment().add(1, "days").format("l");
  let day2 = moment().add(2, "days").format("l");
  let day3 = moment().add(3, "days").format("l");
  let day4 = moment().add(4, "days").format("l");
  let day5 = moment().add(5, "days").format("l");

 //global variables
  let city;
  let cities;
 //function to load most recently searched city from local storage
  function loadMostRecent() {
    let lastSearch = localStorage.getItem("mostRecent");
    if (lastSearch) {
      city = lastSearch;
      search();
    } else {
      city = "Seattle";
      search();
    }
  }

  loadMostRecent()

//function to load recently searched cities from local storage
  function loadRecentCities() {
    let recentCities = JSON.parse(localStorage.getItem("cities"));

    if (recentCities) {
      cities = recentCities;
    } else {
      cities = [];
    }
  }

  loadRecentCities()

  //event handler for search city button
  $("#submit").on("click", (e) => {
    e.preventDefault();
    getCity();
    search();
    $("#city-input").val("");
    listCities();
  });

  //function to save searched cities to local storage
  function saveToLocalStorage() {
    localStorage.setItem("mostRecent", city);
    cities.push(city);
    localStorage.setItem("cities", JSON.stringify(cities));
  }

  //function to retrieve user inputted city name
  function getCity() {
    city = $("#city-input").val();
    if (city && cities.includes(city) === false) {
      saveToLocalStorage();
      return city;
    } else if (!city) {
      alert("Please enter a valid city");
    }
  }


  // searches the API for the chosen city
  function search() {
    
    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=42d98d76405f5b8038f2ad71187af430";
    let coords = [];

    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      
      coords.push(response.coord.lat);
      coords.push(response.coord.lon);
      let cityName = response.name;
      let cityCond = response.weather[0].description.toUpperCase();
      let cityTemp = response.main.temp;
      let cityHum = response.main.humidity;
      let cityWind = response.wind.speed;
      let icon = response.weather[0].icon;
      $("#icon").html(
        `<img src="http://openweathermap.org/img/wn/${icon}@2x.png">`
      );
      $("#city-name").html(cityName + " " + "(" + NowMoment + ")");
      $("#city-cond").text("Current Conditions: " + cityCond);
      $("#temp").text("Current Temp (F): " + cityTemp.toFixed(1));
      $("#humidity").text("Humidity: " + cityHum + "%");
      $("#wind-speed").text("Wind Speed: " + cityWind + "mph");
      $("#date1").text(day1);
      $("#date2").text(day2);
      $("#date3").text(day3);
      $("#date4").text(day4);
      $("#date5").text(day5);

      getUV(response.coord.lat, response.coord.lon);
    });

    //Function to get 5-day forecast and UV index and put them on page
    function getUV(lat, lon) {
     
        
      $.ajax({
        url: "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly" + "&units=imperial&appid=42d98d76405f5b8038f2ad71187af430",
        method: "GET",
      }).then(function (response) {

        //code to determine UV index severity
        let uvIndex = response.current.uvi;
        $("#uv-index").text("UV Index:" + " " + uvIndex);
        if (uvIndex >= 8) {
          $("#uv-index").css("color", "red");
        } else if (uvIndex > 4 && uvIndex < 8) {
          $("#uv-index").css("color", "yellow");
        } else {
          $("#uv-index").css("color", "green");
        }
        let cityHigh = response.daily[0].temp.max;
        $("#high").text("Expected high (F): " + " " + cityHigh);

        //forecast temp variables
        let day1temp = response.daily[1].temp.max;
        let day2temp = response.daily[2].temp.max;
        let day3temp = response.daily[3].temp.max;
        let day4temp = response.daily[4].temp.max;
        let day5temp = response.daily[5].temp.max;
        //forecast humidity variables
        let day1hum = response.daily[1].humidity;
        let day2hum = response.daily[2].humidity;
        let day3hum = response.daily[3].humidity;
        let day4hum = response.daily[4].humidity;
        let day5hum = response.daily[5].humidity;
        //forecast weather icon variables
        let icon1 = response.daily[1].weather[0].icon;
        let icon2 = response.daily[2].weather[0].icon;
        let icon3 = response.daily[3].weather[0].icon;
        let icon4 = response.daily[4].weather[0].icon;
        let icon5 = response.daily[5].weather[0].icon;
        //
        $("#temp1").text("Temp(F):" + " " + day1temp.toFixed(1));
        $("#temp2").text("Temp(F):" + " " + day2temp.toFixed(1));
        $("#temp3").text("Temp(F):" + " " + day3temp.toFixed(1));
        $("#temp4").text("Temp(F):" + " " + day4temp.toFixed(1));
        $("#temp5").text("Temp(F):" + " " + day5temp.toFixed(1));

        $("#hum1").text("Hum:" + " " + day1hum + "%");
        $("#hum2").text("Hum:" + " " + day2hum + "%");
        $("#hum3").text("Hum:" + " " + day3hum + "%");
        $("#hum4").text("Hum:" + " " + day4hum + "%");
        $("#hum5").text("Hum:" + " " + day5hum + "%");

        $("#icon1").html(
          `<img src="http://openweathermap.org/img/wn/${icon1}@2x.png">`
        );
        $("#icon2").html(
          `<img src="http://openweathermap.org/img/wn/${icon2}@2x.png">`
        );
        $("#icon3").html(
          `<img src="http://openweathermap.org/img/wn/${icon3}@2x.png">`
        );
        $("#icon4").html(
          `<img src="http://openweathermap.org/img/wn/${icon4}@2x.png">`
        );
        $("#icon5").html(
          `<img src="http://openweathermap.org/img/wn/${icon5}@2x.png">`
        );
      });
    }
  }
//function to render recently searched cities to page
  function listCities() {
    $("#cityList").text("");
    cities.forEach((city) => {
      $("#cityList").prepend("<tr><td>" + city + "</td></tr>");
    });
  }

  listCities();
//event handler for recently searched cities in table
  $(document).on("click", "td", (e) => {
    e.preventDefault();
    let listedCity = $(e.target).text();
    city = listedCity;
    search();
  });
//event handler for clear button
  $("#clr-btn").click(() => {
    localStorage.removeItem("cities");
    loadRecentCities();
    listCities();
  });
});


//End of line
