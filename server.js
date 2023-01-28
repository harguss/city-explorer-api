'use strict';

const express = require('express');
require('dotenv').config();
let weatherData = require('./data/weather.json');
const cors = require('cors');


const app = express();
app.use(cors());
const PORT = process.env.PORT || 5005;

app.get('/weather',(request, response)=>{

  // http://localhost:3003/weather? city_name=Paris
  // console.log('req lat', weatherData[0].lat);
//create var to store request.query.city_name
let weatherCity = request.query.searchQuery;
// console.log('city?',weatherCity);

//use find to pull data from json  weatherData.find()
let weatherDataObject = weatherData.find(day => day.city_name === weatherCity);
// console.log('objects', weatherDataObject.data);
//send data to the new Weather class
let dataToResponse = weatherDataObject.data.map(forecast => new Forecast(forecast))
// console.log('did we get object back from constructor', dataToResponse);
//response
  response.send(dataToResponse);

});




class Forecast{
  constructor(weatherObject){
    // console.log('in class ', weatherObject);
    //date
    this.date = weatherObject.datetime;
    //description
  }
}

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));