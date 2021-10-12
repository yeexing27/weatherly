import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { getDay, timeZonizer } from "./utility";
import { IconButton } from "@mui/material";
import HourlyGraph from "./HourlyGraph";

const useStyles = makeStyles({
  dailyWeatherContainer: {
    display: "flex",
  },
  graphContainer: {
    padding: 20,
    textAlign: "center",
  },
  btnCtn: {
    zIndex: "1",
    position: "absolute",
    right: 90,
    top: 30,
  },
  container: {
    position: "relative",
  },
  btnStyle: {
    fontFamily: "Merriweather, serif",
    fontSize: 14,
    backgroundColor: "rgb(128,128,128, 0.5)",
    padding: "10px",
    borderRadius: "10px",
    color: "white",
  },
  iconBtn: {
    border: "1px solid black",
  },
  hourlyBtn: {
    right: 16,
  },
  selectedBtn: {
    backgroundColor: "rgb(128,128,128, 1)",
  },
  daysBtn: {
    width: 70,
    height: 70,
    backgroundColor: "rgb(128,128,128, 0.5)",
    margin: "10px",
    "&:hover": {
      cursor: "pointer",
      backgroundColor: "rgb(128,128,128, 1)",
    },
    borderRadius: "10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  daysBtnCtn: {
    display: "flex",
    justifyContent: "center",
  },
  displayShow: {
    display: "none",
  },
  hourTitle: {
    fontSize: "20px",
    fontWeight: 700,
  },
  aniFadeIn: {
    animationName: "$fading",
    animationDuration: "1.5s",
  },
  "@keyframes fading": {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
});

export default function DailyWeather({ dailyWeather }) {
  const [isActive, setActive] = useState(false);
  const [index, setIndex] = useState(0);
  const [hourlyAct, setHourlyAct] = useState(false);
  const toggleClass = () => {
    setActive(!isActive);
    setHourlyAct(false);
  };
  const showGraph = (index) => {
    setHourlyAct(true);
    setIndex(index);
  };
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
  const hourlyTemps = dailyWeather.hourly.map((hour) => {
    return Math.round(hour.feels_like - 273.15);
  });

  const hourlyHumid = dailyWeather.hourly.map((hour) => {
    return hour.humidity;
  });

  const hourlyDays = genHourData(dailyWeather); // 0: hours, 1: days

  const hourlyTempsHumid = sepData(hourlyDays, hourlyTemps, hourlyHumid); // 0: temp, 1: humid *return arranged according to days

  function sepData(hourlyDays, hourlyTemps, hourlyHumid) {
    var hourlyTempsDays = {};
    var hourlyHumidDays = {};
    for (let i = 0; i < Object.keys(hourlyDays[0]).length; i++) {
      if (i === 0) {
        var sta = 0;
        var end = hourlyDays[0][`${i}`].length;
      } else {
        sta = end;
        end = end + hourlyDays[0][`${i}`].length;
      }

      hourlyTempsDays[`${i}`] = [];
      hourlyHumidDays[`${i}`] = [];

      hourlyTempsDays[`${i}`].push(hourlyTemps.slice(sta, end));
      hourlyHumidDays[`${i}`].push(hourlyHumid.slice(sta, end));
    }
    return [hourlyTempsDays, hourlyHumidDays];
  }

  function genHourData(dailyWeather) {
    var hours = {};
    var dayIndex = 0;
    var day = [];
    dailyWeather.hourly.map((hour, index) => {
      if (index === 0) {
        hours[`${dayIndex}`] = [
          timeZonizer(
            hour.dt,
            dailyWeather.timezone_offset
          ).toLocaleTimeString(),
        ];
        day.push(
          getDay(timeZonizer(hour.dt, dailyWeather.timezone_offset) / 1000)
        );
      } else if (
        timeZonizer(
          hour.dt,
          dailyWeather.timezone_offset
        ).toLocaleTimeString() === "00:00:00"
      ) {
        dayIndex = dayIndex + 1;
        hours[`${dayIndex}`] = [];
        hours[`${dayIndex}`].push(
          timeZonizer(
            hour.dt,
            dailyWeather.timezone_offset
          ).toLocaleTimeString()
        );
        day.push(
          getDay(timeZonizer(hour.dt, dailyWeather.timezone_offset) / 1000)
        );
      } else if (hours[`${dayIndex}`]) {
        hours[`${dayIndex}`].push(
          timeZonizer(
            hour.dt,
            dailyWeather.timezone_offset
          ).toLocaleTimeString()
        );
      }
      return null;
    });
    return [hours, day];
  }

  return (
    <div className={classes.container}>
      <div className={classes.btnCtn}>
        <IconButton className={classes.iconBtn} onClick={toggleClass}>
          {" "}
          <div
            className={`${classes.btnStyle} ${
              !isActive ? classes.selectedBtn : null
            }`}
          >
            Daily
          </div>
        </IconButton>
        <IconButton className={classes.hourlyBtn} onClick={toggleClass}>
          <div
            className={`${classes.btnStyle} ${
              isActive ? classes.selectedBtn : null
            }`}
          >
            Hourly
          </div>
        </IconButton>
      </div>

      <div
        className={`${classes.daysBtnCtn} ${
          isActive ? classes.aniFadeIn : classes.displayShow
        }`}
      >
        {hourlyDays[1].map((d, index) => {
          return (
            <div
              className={`${classes.daysBtn} ${classes.aniFadeIn}`}
              onClick={() => showGraph(index)}
            >
              {d.substring(0, 3)}
            </div>
          );
        })}
      </div>

      <div className={classes.graphContainer}>
        {!isActive && (
          <HourlyGraph
            xdata={days}
            tempData={dailyTemps}
            humidData={dailyHumid}
            text={"Temperature and Humidity change for a week."}
          />
        )}
      </div>

      <div className={classes.graphContainer}>
        {hourlyAct && isActive && (
          <div>
            <p className={classes.hourTitle}>{hourlyDays[1][index]}</p>
            <p>{dailyWeather.daily[index].weather[0].description}</p>
          </div>
        )}
        {hourlyAct && isActive && (
          <HourlyGraph
            xdata={hourlyDays[0][`${index}`]}
            tempData={hourlyTempsHumid[0][`${index}`][0]}
            humidData={hourlyTempsHumid[1][`${index}`][0]}
            text={"Temperature and Humidity change for several hours."}
          />
        )}
      </div>
    </div>
  );
}
