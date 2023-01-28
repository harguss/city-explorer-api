'use strict';

const express = require('express');
require('dotenv').config();
let data = require('./data/weather.json');
const cors = require('cors');

console.log('Hello from our SERVER PORT!!!!!', process.env.PORT);



const app = express();
app.use(cors());
const PORT = process.env.PORT || 5005;

// app.get('/hello', (request, response) => {
//   localhost:3003/hello

//   console.log('request object', request.query);
  
// });