import { makeStyles } from "@mui/styles";
import React from "react";
import { getDay } from "./utility";
import { Line } from "react-chartjs-2";
import { red } from "@mui/material/colors";

const useStyles = makeStyles({
  dailyWeatherContainer: {
    display: "flex",
  },
  graphContainer: {
    padding: 20,
  },
});

export default function DailyWeather({ dailyWeather }) {
  const classes = useStyles();
  const days = dailyWeather.daily.map((day) => {
    return getDay(day.sunrise);
  });
  const dailyTemps = dailyWeather.daily.map((day) => {
    return Math.round(day.feels_like.eve - 273.15);
  });
  const dailyHumid = dailyWeather.daily.map((day) => {
    return day.humidity;
  });

  return (
    <>
      <div className={classes.dailyWeatherContainer}>
        {/* {dailyWeather.daily.map((day, index) => {
          return (
            <div key={index}>
              {timeZonizer(
                day.sunrise,
                dailyWeather.timezone_offset
              ).toLocaleString()}
              <p>{getDay(day.sunrise)}</p>
              <p>Temp: {Math.round(day.feels_like.eve - 273.15)}&#176;C</p>
              <p>Description: {day.weather[0].description}</p>
              <p>Humidity: {day.humidity}%</p>
            </div>
          );
        })} */}
      </div>

      <div className={classes.graphContainer}>
        <Line
          data={{
            labels: days,
            datasets: [
              {
                label: "Temperature",
                data: dailyTemps,
                borderColor: red,
                backgroundColor: red,
                yAxisID: "y",
              },
              {
                label: "Humidity",
                data: dailyHumid,
                yAxisID: "y1",
              },
            ],
          }}
          height={400}
          width={400}
          options={{
            maintainAspectRatio: false,
            plugins: {
              tooltip: true,
              title: {
                display: true,
                text: "Temperature and Humidity change for a week.",
              },
            },
            animations: {
              radius: {
                duration: 400,
                easing: "linear",
                loop: (context) => context.active,
              },
            },
            hoverRadius: 20,
            interaction: {
              mode: "nearest",
              intersect: false,
              axis: "x",
            },
            scales: {
              y: {
                display: true,
                title: {
                  display: true,
                  text: "Temperature (\xB0C)",
                },
              },
              y1: {
                display: true,
                position: "right",
                title: {
                  display: true,
                  text: "Humidity (%)",
                },
              },
            },
          }}
        />
      </div>
    </>
  );
}
