const axios = require("axios");
var express = require("express");
const moment = require("moment");
var router = express.Router();
const SERVER_TIME_OFFSET = 330;
// Server time is UTC. So, for IST, 5:30 HRS offset is needed.

// ROUTE FOR FORECAST BY CITY NAME
router.get("/city/:cityName", (req, res, next) => {
  const cityName = req.params.cityName;
  const days = req.query.days;
  const time = req.query.time;
  const date = req.query.date;
  getWeatherForecastByCityName(cityName, days, time, date);

  async function getWeatherForecastByCityName(cityName, days, time, date) {
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName},IN&limit=1&appid=${process.env.WEATHER_API_KEY}`;
    try {
      const location = await axios.get(url);
      const { lat: latitude, lon: longitude } = location.data[0];
      // Get latitude and longitude and use that
      const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/forecast?cnt=40&lat=${latitude}&lon=${longitude}&appid=${process.env.WEATHER_API_KEY}&units=metric`;
      const currentWeather = await axios.get(currentWeatherUrl);

      // Converting Unix Timestamps in "currentWeather" to Date Strings
      currentWeather.data.list = currentWeather.data.list.map((el) => {
        //prettier-ignore
        // console.log("no offset",moment.unix(el.dt).format("DD-MM-YYYY HH:mm:ss"));
        //prettier-ignore
        // console.log("with offset",moment.unix(el.dt).utcOffset(SERVER_TIME_OFFSET).format("DD-MM-YYYY HH:mm:ss"));
        return {
          ...el,
          dt: moment
            .unix(el.dt)
            .utcOffset(SERVER_TIME_OFFSET)
            .format("DD-MM-YYYY HH:mm:ss"),
        };
      });

      currentWeather.data.city.sunrise =
        moment
          .unix(currentWeather.data.city.sunrise)
          .utcOffset(SERVER_TIME_OFFSET)
          .format("DD-MM-YYYY HH:mm:ss");

      currentWeather.data.city.sunset =
        moment
          .unix(currentWeather.data.city.sunset)
          .utcOffset(SERVER_TIME_OFFSET)
          .format("DD-MM-YYYY HH:mm:ss");

      /** FILTERS CODE START */
      let filtered = [...currentWeather.data.list];
      if (days) {
        // Getting today's date in IST from external API. So, No Offset Needed here
        const liveDateTime = await axios.get(
          "https://worldtimeapi.org/api/timezone/Asia/Kolkata"
        );
        const { unixtime } = liveDateTime.data;
        let date1 = parseInt(
          moment.unix(unixtime).format("DD-MM-YYYY HH:mm:ss").slice(0, 2)
        );
        // Per day, there are eight - 3hr intervals data in weather info...
        let count = days * 8;
        filtered = currentWeather.data.list.filter((el) => {
          let date2 = parseInt(el.dt.slice(0, 2));
          while (count > 0 && date2 > date1) {
            count--;
            return true;
          }
        });
      }
      if (time) {
        filtered = filtered.filter((el) => {
          return el.dt.endsWith(time);
        });
      }
      if (date) {
        filtered = filtered.filter((el) => {
          return el.dt.startsWith(date);
        });
      }

      currentWeather.data.list = filtered;
      /** FILTERS CODE END */

      //updating cnt (count) before responding
      currentWeather.data.cnt = currentWeather.data?.list.length;
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

// ROUTE FOR FORECAST BY ZIPCODE
router.get("/zip/:zipCode", (req, res, next) => {
  const zipCode = req.params.zipCode;
  const days = req.query.days;
  const time = req.query.time;
  const date = req.query.date;
  getWeatherForecastByZipCode(zipCode, days, time, date);

  async function getWeatherForecastByZipCode(zipCode, days, time, date) {
    const url = `http://api.openweathermap.org/geo/1.0/zip?zip=${zipCode},IN&appid=${process.env.WEATHER_API_KEY}`;
    try {
      const location = await axios.get(url);
      const { lat: latitude, lon: longitude } = location.data;
      // Get latitude and longitude and use that
      const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/forecast?cnt=40&lat=${latitude}&lon=${longitude}&appid=${process.env.WEATHER_API_KEY}&units=metric`;
      const currentWeather = await axios.get(currentWeatherUrl);

      // Converting Unix Timestamps in "received data" to Normal Date
      currentWeather.data.list = currentWeather.data.list.map((el) => {
        return {
          ...el,
          dt:
            moment
              .unix(el.dt)
              .utcOffset(SERVER_TIME_OFFSET)
              .format("DD-MM-YYYY HH:mm:ss"),
        };
      });

      currentWeather.data.city.sunrise =
        moment
          .unix(currentWeather.data.city.sunrise)
          .utcOffset(SERVER_TIME_OFFSET)
          .format("DD-MM-YYYY HH:mm:ss");

      currentWeather.data.city.sunset =
        moment
          .unix(currentWeather.data.city.sunset)
          .utcOffset(SERVER_TIME_OFFSET)
          .format("DD-MM-YYYY HH:mm:ss");

      /** FILTERS CODE END */

      let filtered = [...currentWeather.data.list];
      if (days) {
        // Getting today's date in IST from external API. So, No Offset Needed here
        const liveDateTime = await axios.get(
          "https://worldtimeapi.org/api/timezone/Asia/Kolkata"
        );
        const { unixtime } = liveDateTime.data;
        let date1 = parseInt(
          moment.unix(unixtime).format("DD-MM-YYYY HH:mm:ss").slice(0, 2)
        );

        // Per day, there are eight - 3hr intervals data in weather info...
        let count = days * 8;
        filtered = currentWeather.data.list.filter((el, i) => {
          let date2 = parseInt(el.dt.slice(0, 2));
          while (count > 0 && date2 > date1) {
            count--;
            return true;
          }
        });
      }
      if (time) {
        filtered = filtered.filter((el) => {
          return el.dt.endsWith(time);
        });
      }
      if (date) {
        filtered = filtered.filter((el) => {
          return el.dt.startsWith(date);
        });
      }

      // filtered data is attached to final output
      currentWeather.data.list = filtered;
      /** FILTERS CODE END */

      //updating cnt (count) before responding
      currentWeather.data.cnt = currentWeather.data?.list.length;
      res.json({
        success: true,
        zipCode,
        currentWeatherData: currentWeather.data,
      });
    } catch (err) {
      console.log(err.name);
      console.log(err.message);
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
