'use strict';


const express = require('express');
require('dotenv').config();
// let weatherData = require('./data/weather.json');
const cors = require('cors');
const app = express();
const axios = require('axios');
app.use(cors());


const PORT = process.env.PORT || 5005;

// let WEATHER_API_KEY = process.env.WEATHER_API_KEY;
app.get('/',(request, response)=>{
  response.send('hello')
});

  

  // app.get('/movie'), (request, response)=>{
  //   try {
      
  //   } catch (error) {
      
  //   }
  // };

  app.get('/weather', async(request,response)=>{
  console.log(request.query.searchQuery);
    // try {
     
    //   let lat = request.query.latitude;
    //   let lon = request.query.longitude;
    //   let weatherCity = request.query.searchQuery;

      // let weatherDataObject = weatherData.find(day => day.city_name.toLowerCase() === weatherCity.toLowerCase());
      //  const weatherUrl = `http://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API_KEY}=London&days=1&aqi=no&alerts=no`
      //  let weatherInfo = await axios(weatherUrl);

      //  console.log('!!!!!!!!!!!!!xxxxxxx',weatherInfo);

      // let dataToResponse = weatherInfo.data.map(weatherInfo => new Forecast(weatherInfo));
      response.status(200).send('dataToResponse');
      
    // } catch (error) {
    //   console.error('ERROR', error);
    // }
  }
  );
   // 404 not found path.
app.use('*', (request, response) => {
  response.status(404).send('The route was not found. Error 404');
});

class Forecast {
  constructor(weatherObject) {
     console.log('in class constructor', weatherObject.weather.description);
    //date
    this.date = weatherObject.datetime;
    //description
    this.description = weatherObject.weather.description;
  }
}
// app.get('/', (request, response) => {
//   try {
//     console.log(weatherData);
//     response.status(200).send('hello from our server HOME route / !!!!!');
//   } catch (error) {
//     console.log(error);
//   }
//  });
// class Movie {
//   constructor(movieObject) {
//     console.log('')
//   }
// }

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));