export function getDay(time) {
  // This function inputs the epoch time of your desired date.
  let day = new Date(time * 1000);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[day.getDay()];
}

export function timeZonizer(epochTime, offset) {
  // This function only input the timezone of your desired location. The output will be the current time in the desired timezone.
  let timeInt = epochTime !== "now" ? new Date(epochTime * 1000) : new Date();
  let utc = timeInt.getTime() + timeInt.getTimezoneOffset() * 60000;

  let timeNow = new Date(utc + offset * 1000);

  return timeNow;
}

export function getLocation(setLat, setLon) {
  // This function input the function to set the latitude and longitude in order to set it to the device's location.
  function successCB(position) {
    setLat(position.coords.latitude);
    setLon(position.coords.longitude);
  }
  function errorCB() {
    console.log("Unable to retrieve your location.");
  }

  if (!navigator.geolocation) {
    alert("Sorry your browser doesn't support geolocation.");
  } else {
    navigator.geolocation.getCurrentPosition(successCB, errorCB);
  }
}

export const fetchAPI = async (
  endpoint,
  location,
  API_key,
  setCurrentWeather,
  setDailyWeather,
  setLoading,
  lat = "",
  lon = ""
) => {
  // location = The name of the city, lat and lon are optional (intent for user's location), setCurrentWeather = Function to set the target of the city, setDailyWeather = Function to set the daily's graph.
  const currentWeatherUrl =
    lat === ""
      ? endpoint + "weather?q=" + location + "&appid=" + API_key
      : endpoint + "weather?lat=" + lat + "&lon=" + lon + "&appid=" + API_key;

  try {
    const responseCurrent = await fetch(currentWeatherUrl);
    const dataCurrent = await responseCurrent.json();

    const dailyWeatherUrl =
      endpoint +
      "onecall?lat=" +
      dataCurrent.coord.lat +
      "&lon=" +
      dataCurrent.coord.lon +
      "&exclude=hourly,minutely&appid=" +
      API_key;
    const responseDaily = await fetch(dailyWeatherUrl);
    const dataDaily = await responseDaily.json();

    setCurrentWeather(dataCurrent);
    setDailyWeather(dataDaily);
    setLoading(false);
    console.log("Successfully fetched.");
  } catch (error) {
    console.log("API Fetching Error.", error);
  }
};
