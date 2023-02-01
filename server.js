'use strict';

const express = require('express');
require('dotenv').config();
// let weatherData = require('./data/weather.json');
const cors = require('cors');
const app = express();

app.use(cors());

const PORT = process.env.PORT || 5005;

app.get('/', (request, response) => {
  response.status(200).send('hello from our server HOME route / !!!!!');
 });
  // http://localhost:3003/weather? city_name=Paris
  //   try {
  //     // console.log('req lat', weatherData[0].lat);
  //     //create var to store request.query.city_name
  //     let weatherCity = request.query.searchQuery;
  //     //let weatherCityName = request.query.searchQuery.city_name;
  //     // console.log('city?',weatherCity);
  //     //console.log('city name?',weatheCityName);

  //     //use find to pull data from json  weatherData.find()
  //     let weatherDataObject = weatherData.find(day => day.city_name === weatherCity);
  //     // console.log('objects', weatherDataObject.data);
  //     // let dataToInstantiate = data.find(weather => weather.weatherType === weatherType);
  //     //send data to the new Weather class
  //     let dataToResponse = weatherDataObject.data.map(forecast => new Forecast(forecast));
  //     // console.log('did we get object back from constructor', dataToResponse);
  //     //response
  //     response.send(dataToResponse);
  //   catch (error) {
  //       next(error);
  //     }
  //   }
// });

// // 404 not found path.
// app.use('*', (request, response) => {
//   response.status(404).send('The route was not found. Error 404');
// });

// class Forecast {
//   constructor(weatherObject) {
//     // console.log('in class ', weatherObject);
//     //date
//     this.date = weatherObject.datetime;
//     //description
//     this.description = weatherObject.description;
//   }
// }

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));