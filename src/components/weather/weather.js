import React from 'react'
import "./weather.css";
import WeatherWidget from '../weather-widget/weather-widget';
const Weather = () => {
  const locations = [
    { location: 'Ottawa', lon: -75.6901106, lat: 45.4208777, count: 1 },
    { location: 'Sudbury', lon: -81.0071182, lat: 46.5025031, count: 2 },
    { location: 'Marsoui', lon: -66.0685164, lat: 49.2149677, count: 3 },
    { location: 'Montreal River Harbour', lon: -84.649356, lat: 47.232487, count: 4 }
  ];
  return (
    <div className="weather">
      {locations.map(item =>
        <WeatherWidget isFirstEntry={item.count === 1} location={item.location} lon={item.lon} lat={item.lat} key={item.location}> {item.location} </WeatherWidget>
      )}
    </div>
  )
}

export default Weather