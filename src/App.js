import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";

const API_key = "325dcc0b72cdfc17143d7d6556c5a967";
const endpoint = "https://api.openweathermap.org/data/2.5/weather?";
function App() {
  const [loading, setLoading] = useState(true);

  const fetchAPI = async () => {
    const url = endpoint + "q=London&appid=" + API_key;
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log("This is the response.", data);

      setLoading(false);
    } catch (error) {
      console.log("API Fetching Error.", error);
    }
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  if (loading) {
    return (
      <main>
        <h1>Loading...</h1>
      </main>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
