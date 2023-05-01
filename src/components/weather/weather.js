import React from 'react'
import "./weather.css";
import WeatherWidget from '../weather-widget/weather-widget';
const Weather = () => {
  const locations = [
    { location: 'Montreal River Harbour', lon: -84.649356, lat: 47.232487, isFirst:true },
    { location: 'Cochrane', lon: -81.278790, lat: 49.166792},
    { location: 'Sudbury', lon: -81.0071182, lat: 46.5025031},
    { location: 'Mattawa', lon: -78.965881, lat: 46.446380},
    { location: 'Ottawa', lon: -75.6901106, lat: 45.4208777},
    { location: 'Treeriding Adventure', lon: -71.656786, lat: 47.081166},
    { location: 'Auberge 31km', lon: -70.589226, lat: 48.669603}, 
    { location: 'Chic Chocs', lon: -66.038694, lat: 49.064366}
  ];
  return (
    <div className="weather">
      {locations.map(item =>
        <WeatherWidget isFirstEntry={item.isFirst} location={item.location} lon={item.lon} lat={item.lat} key={item.location}> {item.location} </WeatherWidget>
      )}
    </div>
  )
}

export default Weather