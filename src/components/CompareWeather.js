import React from "react";
import { getDay } from "./utility";
import { Line } from "react-chartjs-2";
import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  compareCtn: {
    padding: 10,
    backgroundColor: "rgba(171, 183, 183, 0.5)",
    margin: "auto",
    borderRadius: "50px",
    animationName: "$fadeIn",
    animationDuration: "3s",
  },
  weatherDetails: {
    textAlign: "center",
    alignItems: "center",
  },
  compareHead: {
    textAlign: "center",
    fontSize: "30px",
    fontWeight: 700,
  },
  "@keyframes fadeIn": {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
}));

export default function CompareWeather({ loc2, loc2Cur, loc2Graph, loading2 }) {
  const classes = useStyles();
  if (!loading2) {
    var days = loc2Graph.daily.map((day) => {
      return getDay(day.sunrise);
    });
    var dailyTemps = loc2Graph.daily.map((day) => {
      return Math.round(day.feels_like.eve - 273.15);
    });
    var dailyHumid = loc2Graph.daily.map((day) => {
      return day.humidity;
    });
  }

  return (
    <Grid container className={classes.compareCtn} xs={11} id="compareWeather">
      <Grid item xs={12} className={classes.compareHead}>
        <p>{loc2}</p>
      </Grid>
      {!loading2 && (
        <Grid item xs={3} className={classes.weatherDetails}>
          <p>{getDay(loc2Cur.sys.sunrise)}</p>
          <p> Temperature: {Math.round(loc2Cur.main.temp - 273.15)} &#176;C</p>
          <p>Humidity: {loc2Cur.main.humidity}%</p>
          <p>Wind Speed: {loc2Cur.wind.speed}m/s</p>
        </Grid>
      )}
      {!loading2 && (
        <Grid item xs={9}>
          <Line
            data={{
              labels: days,
              datasets: [
                {
                  label: "Temperature",
                  data: dailyTemps,
                  borderColor: "rgb(237,254,154)",
                  // backgroundColor: red,
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
        </Grid>
      )}
    </Grid>
  );
}
