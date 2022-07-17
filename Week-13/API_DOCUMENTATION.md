# Welcome to FatCow Weather API Service

This API is deployed on Heroku <a href="https://weather-api-2022.herokuapp.com/">here</a>

This Weather API can get

    (A) Current weather information based on city name or pincode.

    (B) Forecasts (in 3hr intervals) for upto 5 days.

    (C) Constraints: Data is available for Indian towns and cities only.

## API Reference

## Routes to GET Current Weather

#### **GET** _Current Weather_ of any City/Town in India by name

```http
    GET /api/current/city/${cityname}
```

| Parameter  | Type     | Description  |
| :--------- | :------- | :----------- |
| `cityname` | `string` | **Required** |

#### **GET** _Current Weather_ of any City/Town in India by pincode/zipcode

```http
    GET /api/current/zip/${pincode}
```

| Parameter | Type     | Description                                            |
| :-------- | :------- | :----------------------------------------------------- |
| `pincode` | `number` | **Required**.                                          |
|           |          | Pincode in India must be 6 digit number without spaces |

---

## Routes to GET Weather Forecasts

Note: Forecast data is received in 3hr intervals starts from` "02:30:00"`  
All time intervals for which data is available are
`"02:30:00", "04:30:00", "06:30:00", "08:30:00", "11:30:00", "14:30:00", "17:30:00", "20:30:00" & "23:30:00"`

#### **GET** _Weather forecast_ of any City/Town in India by name

This gets weather forecast for 5 days in 3hr intervals

```http
  GET /api/forecast/${cityname}
```

| Parameter  | Type     | Description  |
| :--------- | :------- | :----------- |
| `cityname` | `string` | **Required** |

#### **GET** _Weather forecast_ of any City/Town in India by pincode

This gets weather forecast for 5 days in 3hr intervals

```http
  GET /api/forecast/${pincode}
```

| Parameter | Type     | Description                                            |
| :-------- | :------- | :----------------------------------------------------- |
| `pincode` | `number` | **Required**.                                          |
|           |          | Pincode in India must be 6 digit number without spaces |

## Filters applicable on _Weather Forecast_ routes (cityname & pincode)

| Query  | Type     | Description                                                     |
| :----- | :------- | :-------------------------------------------------------------- |
| `days` | `number` | **Optional**. Allowed Range: [1,5]. Default = 5                 |
| `time` | `string` | **Optional**. HH:MM:SS format. No Quotes. See below for more.   |
| `date` | `string` | **Optional**. DD-MM-YYYY format. No Quotes. See below for more. |

---

\***\*Note\*\***: `time` can be any one of the followig (without quotes) :

`"02:30:00", "04:30:00", "06:30:00", "08:30:00", "11:30:00", "14:30:00", "17:30:00", "20:30:00" & "23:30:00"`

---

\***\*Note\*\***: `date` API forecast is limited to upcoming 5 days. Hence, date must not exceed `currentdate + 5`.

Eg. if current date is `02-07-2022`, you can't query for `date` beyond `07-07-2022`.
Also, note that querying old (Eg. using yesterday's date) data is not allowed as the purpose of these routes is to forecast.

---

\***\*Note\*\***: `days` and `date` filters cannot be used together.

You can only pick one of them for making a meaningful query.

---

## Forecast Weather Example Usage

This gets 5 day forecast in 3hr intervals for the given city/town in INDIA.
<a href="/api/forecast/city/hyderabad" target="_blank">Click Here</a>

```
/api/forecast/city/hyderabad
```

Gets all 3hr intervals of weather forecast for next 1 day for the given city/town in India.
[Click Here](/api/forecast/city/hyderabad?days=1)

```
/api/forecast/city/hyderabad?days=1
```

This gets forecast of next 5 days weather forecast for the given city at specific time.
[Click Here](/api/forecast/city/hyderabad?time=08:30:00)

```
/api/forecast/city/hyderabad?time=08:30:00
```

This gives weather forcecast of the given city for next 2 days for the specified time
[Click Here](/api/forecast/city/hyderabad?days=2&time=08:30:00)

```
/api/forecast/city/hyderabad?days=2&time=08:30:00
```

This gives weather forecast of the given city for the specified date and time.
[Click Here](/api/forecast/city/hyderabad?date=03-07-2022&time=08:30:00)

```
/api/forecast/city/hyderabad?date=03-07-2022&time=08:30:00
```

This gets 5 day forecast in 3hr intervals for the given pincode.
[Click Here](/api/forecast/zip/500090)

```
/api/forecast/zip/500090`
```

Gets all 3hr intervals of weather forecast for next 1 day for the given pincode
[Click Here](/api/forecast/zip/500090?days=1)

```
/api/forecast/zip/500090?days=1
```

This gives weather forecast for the next 5 days at 11:30:00 for the given pincode.
[Click Here](/api/forecast/zip/500090?time=11:30:00)

```
/api/forecast/zip/500090?time=11:30:00
```

This gives weather forcecast for next 4 days for the specified time for the pincode location......
[Click Here](/api/forecast/zip/500090?days=4&time=11:30:00)

```
/api/forecast/zip/500090?days=4&time=11:30:00
```

This gives weather forecast for the specified date and time for the pincode location...
[Click Here](/api/forecast/zip/500090?date=03-07-2022&time=11:30:00)

```
/api/forecast/zip/500090?date=03-07-2022&time=11:30:00
```

Get all 3hr forecasts available for this date
[Click Here](/api/forecast/city/hyderabad?date=05-07-2022)

```
/api/forecast/city/hyderabad?date=05-07-2022
```

This will get forecast on a date at specific time.
[Click Here](/api/forecast/city/hyderabad?time=08:30:00&date=05-07-2022)

```
/api/forecast/city/hyderabad?time=08:30:00&date=05-07-2022
```

This gives 3hr forecasts for the pincode on specified date.
[Click Here](/api/forecast/zip/500090?date=03-07-2022)

```
/api/forecast/zip/500090?date=03-07-2022
```

This gives forecast for pincode location on specified date and time.
[Click Here](/api/forecast/zip/500090?date=03-07-2022&time=11:30:00)

```
/api/forecast/zip/500090?date=03-07-2022&time=11:30:00
```

## Current Weather Example Usage

This gives current weather data for Ujjain.
[Click Here](/api/current/city/Ujjain)

```
/api/current/city/Ujjain
```

This gives current weather data for the pincode.
[Click Here](/api/current/zip/500090)

```
/api/current/zip/500090
```
