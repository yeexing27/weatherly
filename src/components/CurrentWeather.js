import { makeStyles } from "@mui/styles";
import React from "react";
import { getDay } from "./utility";
import CloudQueueIcon from "@mui/icons-material/CloudQueue";

const useStyles = makeStyles({
  currentWeatherBox: {
    textAlign: "center",
  },
  currentWeatherDay: {
    fontWeight: 700,
    fontSize: 20,
  },
});

const CurrentWeather = ({ currentWeather }) => {
  const classes = useStyles();

  if (currentWeather.cod === 200) {
    return (
      <div className={classes.currentWeatherBox}>
        <p className={classes.currentWeatherDay}>
          {getDay(currentWeather.sys.sunrise)}
        </p>
        <p>
          {currentWeather.weather[0].description} <CloudQueueIcon />
        </p>
        <p>
          {" "}
          Temperature: {Math.round(currentWeather.main.temp - 273.15)} &#176;C
        </p>
        <p>Humidity: {currentWeather.main.humidity}%</p>

        <p>Wind Speed: {currentWeather.wind.speed}m/s</p>
      </div>
    );
  } else {
    return <div>The city you entered is not found. Please try again.</div>;
  }
};

export default CurrentWeather;
