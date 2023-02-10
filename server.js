'use strict';


const express = require('express');
require('dotenv').config();
// let weatherData = require('./data/weather.json');
const cors = require('cors');
const app = express();
const axios = require('axios');
app.use(cors());


const PORT = process.env.PORT || 5005;

let WEATHER_API_KEY = process.env.WEATHER_API_KEY;
app.get('/', (request, response) => {
  response.send('hello')
});


///////////
app.get('/movie', async (request, response, next) => {
  // console.log('MMMMMMMMMMMMM',request.query.searchQuery);
  try {
    let movieSearchQuery = request.query.searchQuery;
    //https://api.themoviedb.org/3/search/movie?api_key=0ec2a83719250e1deafbcd141f8ba7af&language=en-US&page=1&include_adult=false&query=seattle
    const movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&page=1&include_adult=false&query=${movieSearchQuery}&format=json`;
    let results = await axios.get(movieUrl);
    let constructorData = results.data;
    // console.log("🚀 ~ file: server.js:30 ~ app.get ~ constructorData", constructorData)
    
    response.status(200).send(constructorData);
  
  } catch (error) {
    next(error);
  }
});


app.get('/weather', async (request, response) => {
  // console.log(request.query.searchQuery);
  try {

    let lat = request.query.latitude;
    let lon = request.query.longitude;
    let weatherCity = request.query.searchQuery;

    // let weatherDataObject = weatherData.find(day => day.city_name.toLowerCase() === weatherCity.toLowerCase());
    const weatherUrl = `http://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API_KEY}&query=${weatherCity}`
    let weatherInfo = await axios(weatherUrl);
    let weatherToday = new Forecast(weatherInfo.data)

    // console.log('!!!!!!!!!!!!!xxxxxxx', weatherInfo.data);
    // weatherInfo.data.locatio
    //  let test = Object.entries(weatherInfo.data);
    //   console.log('test', test);
    //   test.map((weather) => {
    //     new Forecast(weather);
    //   })
    // let dataToResponse = weatherInfo.data.map(weatherInfo => new Forecast(weatherInfo));
    // console.log("🚀 ~ file: server.js:45 ~ app.get ~ dataToResponse", dataToResponse)

    response.status(200).send(weatherToday);



  } catch (error) {
    console.error('ERROR', error);
  }
}
);
// 404 not found path.


class Forecast {
  constructor(weatherObject) {
    // console.log('in class constructor', weatherObject);
    //date
    this.date = weatherObject.location.localtime;
    //description
    this.description = weatherObject.current.condition.text;
    this.icon = weatherObject.current.condition.icon
  }
}

class Movies {
  constructor(movieObject) {
    console.log('ello', movieObject);
    this.movieObject = movieObject.d;
  }
}


app.get('/', (request, response) => {
  try {
    // console.log(weatherData);
    response.status(200).send('hello from our server HOME route / !!!!!');
  } catch (error) {
    console.log(error);
  }
});

app.use('*', (request, response) => {
  response.status(404).send('The route was not found. Error 404');
});

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));