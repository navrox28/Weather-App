import React,{useState,useEffect} from "react";
import axios from"axios";
import Forecast from "./components/Forecast";
import'./App.css';
import { FaSun, FaMoon } from "react-icons/fa";



function App() {
  const [city,setCity]=useState("");
  const[weather,setWeather]=useState(null);
  const[forecast,setForecast]=useState([]);
  const[loading,setLoading]=useState(false);
  const[error,setError]=useState("");
  const[darkMode,setDarkMode]=useState(false);

  const apiKey =process.env.REACT_APP_API_KEY;

  const fetchWeather = async (cityName) => {
    if (!cityName) return;
    setLoading(true);
    setError("");

    try{
      //current weather
      const currentRes = await axios.get(  "https://api.openweathermap.org/data/2.5/weather",
       { params: { q: cityName, appid: apiKey, units: "metric" } });
    

     // forecast by city name
     const forecastRes = await axios.get(
        "https://api.openweathermap.org/data/2.5/forecast",
        { params: { q: cityName, appid: apiKey, units: "metric", cnt: 40 } }
      );

      //Daily weather
      const daily = forecastRes.data.list.filter((_,i)=> i % 8 === 0);

      setWeather(currentRes.data);
      setForecast(daily)
  } catch (err){
    console.error ("Fetch error:",err.response || err);
    setError("City not found or forecast unavailble");
    setWeather(null);
    setForecast([]);
  }finally{
    setLoading(false)
  }
}

const handleSubmit = (e) =>{
  e.preventDefault();
  fetchWeather(city.trim());
}

  return (
    <div className={`app ${darkMode ? "dark" : ""}`}>
      <header className="header">
        <h1>🌤 Weather App</h1>
        <button onClick={() => setDarkMode(!darkMode)}>
  {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
</button>
        {/* <button onClick={() => setDarkMode((dm) => !dm)}>
          {darkMode ? "☀ Light" : "🌙 Dark"}
        </button> */}
      </header>

      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {loading && (
        <div className="loader-container">
          <div className="loader" />
        </div>
      )}

      {error && <p className="error">{error}</p>}

      {weather && (
        <section className="weather-info">
          <h2>{weather.name}</h2>
          <p>{new Date().toLocaleString()}</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
          <p>{weather.weather[0].description}</p>
          <p>🌡 {weather.main.temp}°C</p>
          <p>💧 Humidity: {weather.main.humidity}%</p>

          <h3>5-Day Forecast</h3>
          <div className="forecast-grid">
            {forecast.map((f, i) => (
              <Forecast key={i} data={f} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}


export default App;


