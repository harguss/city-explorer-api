'use strict';

const express = require('express');
require('dotenv').config();
let weatherData = require('./data/weather.json');
const cors = require('cors');
const app = express();

app.use(cors());

const PORT = process.env.PORT || 5005;

app.get('/', (request, response) => {
  try {
    console.log(weatherData);
    response.status(200).send('hello from our server HOME route / !!!!!');
  } catch (error) {
    console.log(error);
  }
 });

  http://localhost:3002/weather?searchQuery=Sioux_Falls

  app.get('/weather', (request,response)=>{
    try {
      console.log('!!!!!!!!!!!!',request.query);
      let lat = request.query.latitude;
      let lon = request.query.longitude;
      let weatherCity = request.query.searchQuery;



      console.log('getweather city', weatherCity);
      let weatherDataObject = weatherData.find(day => day.city_name.toLowerCase() === weatherCity.toLowerCase());
      console.log('getweather in a city', weatherDataObject);

      let dataToResponse = weatherDataObject.data.map(forecast => new Forecast(forecast));
      console.log('are we ready with data for the front end?', dataToResponse);
      response.status(200).send(dataToResponse);
      
    } catch (error) {
      console.error('ERROR', error);
    }
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

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));