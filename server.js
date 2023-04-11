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
  try {
    let movieSearchQuery = request.query.searchQuery;
    const movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&page=1&include_adult=false&query=${movieSearchQuery}&format=json`;
    let results = await axios.get(movieUrl);

    let constructorData = results.data;
    console.log('XXXXXX',constructorData);
    let movieData = constructorData.results.map((movies) => new Movie(movies));

    response.status(200).send(movieData);
  

    //     let results = await axios.get(url);
    //    let constructorData = results.data;
    //     console.log(constructorData);
    //     let pictureInstance = results.data.results.map((pic) => new Photos(pic));
    //     res.status(200).send(pictureInstance);
  } catch (error) {
    next(error);
  }
});


app.get('/weather', async (request, response) => {
  console.log(request.query.searchQuery);
  try {

    let lat = request.query.latitude;
    let lon = request.query.longitude;
    let weatherCity = request.query.searchQuery;

    // let weatherDataObject = weatherData.find(day => day.city_name.toLowerCase() === weatherCity.toLowerCase());
    const weatherUrl = `http://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API_KEY}&query=${weatherCity}`
    let weatherInfo = await axios(weatherUrl);
    let weatherToday = new Forecast(weatherInfo.data)


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

class Movie {
  constructor(movieObject) {
    console.log("🚀 ~ file: server.js:94 ~ Movies ~ constructor ~ movieObject", movieObject)
  
   
    this.tableName = 'movies';
    this.title = movieObject.title;
    this.overview = movieObject.overview;
    this.imageUrl = 'https://image.tmdb.org/t/p/w500' + movieObject.poster_path;
    this.timestamp = Date.now();
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