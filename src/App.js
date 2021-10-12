import "./App.css";
import { useState, useEffect } from "react";
import CurrentWeather from "./components/CurrentWeather";
import Appbar from "./components/Appbar";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/private-theming";
import "@fontsource/roboto";
import "@fontsource/merriweather";
import DailyWeather from "./components/DailyWeather";
import { getLocation, fetchAPI } from "./components/utility";
import CompareWeather from "./components/CompareWeather";
import Footer from "./components/Footer";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  loadingCtn: {
    textAlign: "center",
  },
}));

const API_key = "325dcc0b72cdfc17143d7d6556c5a967";
const endpoint = "https://api.openweathermap.org/data/2.5/";

function App() {
  const [loading, setLoading] = useState(true); // loading = true means the DOM will render Loading...
  const [currentWeather, setCurrentWeather] = useState();
  const [dailyWeather, setDailyWeather] = useState();
  const [location, setLocation] = useState("London");
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [loc2, setLoc2] = useState("");
  const [loc2Cur, setLoc2Cur] = useState();
  const [loc2Graph, setLoc2Graph] = useState();
  const [loading2, setLoading2] = useState(true);

  const classes = useStyles();

  const theme = createTheme({
    typography: {
      fontFamily: "Merriweather, serif",
      h2: {
        fontFamily: "Merriweather, serif",
      },
    },
  });

  getLocation(setLat, setLon);

  useEffect(() => {
    fetchAPI(
      endpoint,
      location,
      API_key,
      setCurrentWeather,
      setDailyWeather,
      setLoading,
      lat,
      lon
    );

    if (loc2) {
      fetchAPI(endpoint, loc2, API_key, setLoc2Cur, setLoc2Graph, setLoading2);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, lat, lon, loc2]);

  if (loading) {
    return (
      <main className={classes.loadingCtn}>
        <h1>Loading...</h1>
      </main>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Appbar
        currentWeather={currentWeather}
        setLocation={setLocation}
        location={location}
        setLat={setLat}
        setLon={setLon}
        setLoc2={setLoc2}
      />

      <CurrentWeather currentWeather={currentWeather} />
      <DailyWeather dailyWeather={dailyWeather} />
      {loc2 && (
        <CompareWeather
          loc2={loc2}
          loc2Cur={loc2Cur}
          loc2Graph={loc2Graph}
          loading2={loading2}
        />
      )}
      <Footer />
    </ThemeProvider>
  );
}

export default App;
