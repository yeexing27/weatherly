import React from "react";
import { Grid, Toolbar, Input, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { makeStyles } from "@mui/styles";
import "@fontsource/merriweather";
import { timeZonizer } from "./utility";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import mapleleaf from "./mapleleaf.svg";

const useStyles = makeStyles({
  toolBar: {
    background: "#e9ff8c",
  },
  gridBarStyle: {
    display: "flex",
    alignItems: "center",
  },
  headerMid: {
    fontFamily: "Merriweather, serif",
    padding: 20,
    fontWeight: 700,
    fontSize: 30,
    textAlign: "center",
  },
  headerSub: {
    fontSize: 12,
    fontWeight: 500,
  },
  gridRightStyle: {
    textAlign: "right",
    lineHeight: 0.5,
    boxSizing: "border-box",
    width: 1000,
  },
  addBtn: {
    color: "rgb(237,254,154)",
  },
  btnContainer: {
    backgroundColor: "#000000",
    borderRadius: "15px",
    color: "rgb(237,254,154)",
    fontSize: 12,
    fontFamily: "Merriweather, serif",
    alignItems: "center",
    lineHeight: "0.5",
    paddingLeft: "2px",
    paddingRight: "2px",
  },
  logo: {
    height: 40,
  },
});

export default function Appbar({
  currentWeather,
  setLocation,
  location,
  setLon,
  setLat,
  setLoc2,
}) {
  const [tempLoc, setTempLoc] = useState(location);

  const classes = useStyles();
  const styles = {
    gridRightBorder: {
      border: "1px solid rgba(0, 0, 0, 0.05)",
    },
    codementor: {
      fontWeight: 700,
    },
  };
  const handleInput = (event) => {
    const value = event.target.value;
    setTempLoc(value);
  };

  const handleSubmit = (e) => {
    setLocation(tempLoc);
    setLat("");
    setLon("");
  };

  const handleComparison = (e) => {
    setLoc2(tempLoc);
  };

  return (
    <div>
      <Toolbar className={classes.toolBar}>
        <Grid container>
          <Grid item xs={4} className={classes.gridBarStyle}>
            <IconButton onClick={handleSubmit}>
              <SearchIcon />
            </IconButton>{" "}
            <Input
              placeholder="Search your city..."
              name="location"
              value={tempLoc}
              onChange={handleInput}
            />
            <IconButton onClick={handleComparison}>
              <Grid container className={classes.btnContainer}>
                <Grid item xs={2}>
                  <a href="#compareWeather">
                    <AddIcon className={classes.addBtn} />
                  </a>
                </Grid>
                <Grid item xs={10}>
                  <a href="#compareWeather">
                    <p>Add to Compare</p>
                  </a>
                </Grid>
              </Grid>
            </IconButton>
          </Grid>
          <Grid item xs={4} className={classes.headerMid}>
            {currentWeather.name}
            <div className={classes.headerSub}>
              {timeZonizer("now", currentWeather.timezone).toLocaleString()}
            </div>
          </Grid>
          <Grid item xs={4} className={classes.gridBarStyle}>
            <div className={classes.gridRightStyle}>
              <img src={mapleleaf} alt="logo" className={classes.logo} />
              <p style={styles.codementor}>Weatherly</p>
            </div>
          </Grid>
        </Grid>
      </Toolbar>
    </div>
  );
}
