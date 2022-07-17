const axios = require("axios");
var express = require("express");
const moment = require("moment");
const path = require("path");
var router = express.Router();
const SERVER_TIME_OFFSET = 330;

router.get("/city/:cityName", function (req, res, next) {
  getCurrentWeatherByCityName(req.params.cityName);

  async function getCurrentWeatherByCityName(cityName) {
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName},IN&limit=1&appid=${process.env.WEATHER_API_KEY}`;
    try {
      console.log(url);
      const location = await axios.get(url);
      const { lat: latitude, lon: longitude } = location.data[0];
      // Get latitude and longitude and use that
      const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.WEATHER_API_KEY}&units=metric`;
      const currentWeather = await axios.get(currentWeatherUrl);

      // Converting Unix Timestamps in "received data" to Normal Date
      currentWeather.data.dt = moment
        .unix(currentWeather.data.dt)
        .utcOffset(SERVER_TIME_OFFSET)
        .format("DD-MM-YYYY HH:mm:ss");

      currentWeather.data.sys.sunrise = moment
        .unix(currentWeather.data.sys.sunrise)
        .utcOffset(SERVER_TIME_OFFSET)
        .format("DD-MM-YYYY HH:mm:ss");

      currentWeather.data.sys.sunset = moment
        .unix(currentWeather.data.sys.sunset)
        .utcOffset(SERVER_TIME_OFFSET)
        .format("DD-MM-YYYY HH:mm:ss");
      //updating cnt (count) before responding
      currentWeather.data.cnt = currentWeather.data.list?.length;
      res.json({
        success: true,
        cityName,
        currentWeatherData: currentWeather.data,
      });
    } catch (err) {
      res.json({
        success: false,
        details: !err.response ? err.name : err.response.data.message,
        message: err.message,
        errorCode: !err.response ? "Not Applicable" : err.response.data.cod,
      });
    }
  }
});

router.get("/zip/:zipCode", (req, res, next) => {
  getCurrentWeatherByZipCode(req.params.zipCode);

  async function getCurrentWeatherByZipCode(zipCode) {
    const url = `http://api.openweathermap.org/geo/1.0/zip?zip=${zipCode},IN&appid=${process.env.WEATHER_API_KEY}`;
    try {
      console.log(url);
      const location = await axios.get(url);
      const { lat: latitude, lon: longitude } = location.data;
      // Get latitude and longitude and use that
      const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.WEATHER_API_KEY}&units=metric`;
      const currentWeather = await axios.get(currentWeatherUrl);

      // Converting Unix Timestamps in "received data" to Normal Date
      currentWeather.data.dt = moment
        .unix(currentWeather.data.dt)
        .utcOffset(SERVER_TIME_OFFSET)
        .format("DD-MM-YYYY HH:mm:ss");

      currentWeather.data.sys.sunrise = moment
        .unix(currentWeather.data.sys.sunrise)
        .utcOffset(SERVER_TIME_OFFSET)
        .format("DD-MM-YYYY HH:mm:ss");

      currentWeather.data.sys.sunset = moment
        .unix(currentWeather.data.sys.sunset)
        .utcOffset(SERVER_TIME_OFFSET)
        .format("DD-MM-YYYY HH:mm:ss");

      //updating cnt (count) before responding
      currentWeather.data.cnt = currentWeather.data.list?.length;
      res.json({
        success: true,
        zipCode,
        cityName: location.data.name,
        currentWeatherData: currentWeather.data,
      });
    } catch (err) {
      res.json({
        success: false,
        details: !err.response ? err.name : err.response.data.message,
        message: err.message,
        errorCode: !err.response ? "Not Applicable" : err.response.data.cod,
      });
    }
  }
});

module.exports = router;
