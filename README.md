# Weather Dashboard

A web-app for checking the current weather and 5-day forecast for a city.

[A deployed version can be viewed here.](https://jfisher396.github.io/weather-dashboard/)

## Contents

1. [About](#about)
    1. [User Story](#user%20story)
    2. [Acceptance criteria](#acceptance%20criteria)
    3. [Visuals](#visuals)
    4. [Data](#data)
    5. [Build](#build)
2. [Setup](#setup)
3. [Credits](#credits)
4. [License](#license)
5. [Contributing](#contributing)

## About

Developers are often tasked with retrieving data from another application's API and using it in the context of their own. Third-party APIs allow developers to access their data and functionality by making requests with specific parameters to a URL. Your challenge is to build a weather dashboard that will run in the browser and feature dynamically updated HTML and CSS.

### User Story

    AS A traveler
    I WANT to see the weather outlook for multiple cities
    SO THAT I can plan a trip accordingly

### Acceptance Criteria

    GIVEN a weather dashboard with form inputs
    WHEN I search for a city
    THEN I am presented with current and future conditions for that city and that city is added to the search history
    WHEN I view current weather conditions for that city
    THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
    WHEN I view the UV index
    THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
    WHEN I view future weather conditions for that city
    THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
    WHEN I click on a city in the search history
    THEN I am again presented with current and future conditions for that city
    WHEN I open the weather dashboard
    THEN I am presented with the last searched city forecast 


## Visuals:

![Screenshot of load page](/media/weather-dashboard.png)


### Data

The application uses the following data inputs:
* Weather information is provided by the OpenWeather [OpenWeatherMap API](https://openweathermap.org/). [Documentation](https://openweathermap.org/api) can be found here.


### Build

* In HTML semantic tags have been used to aid with accessibility.
* The site is built using Bulma CSS framework.
   * The use of Bulma minimises the need for media queries. 
   * See [Bulma documentation](https://bulma.io/documentation/) for customizing the site with their provided options
* [jQuery](https://api.jquery.com/) powers the dynamic rendering of the html content based on user input
* [moment.js](https://momentjs.com/) is used to manipulate date values for historic data extraction from APIs


## Setup

To clone the repo:
```
git clone git@github.com:jfisher396/weather-dashboard.git
``` 

## Credits

[James Fisher](https://github.com/jfisher396)

## License

Built by James Fisher.
This application is released under [MIT](assets/LICENSE.txt) license.

## Contributing

To contribute to this application, create a pull request.
Here are the steps needed for doing that:
- Fork the repo
- Create a feature branch (git checkout -b NAME-HERE)
- Commit your new feature (git commit -m 'Add some feature')
- Push your branch (git push)
- Create a new Pull Request

Following a code review, your feature will be merged.

