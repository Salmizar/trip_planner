import React from 'react'
import "./weather.css";
import WeatherWidget from '../weather-widget/weather-widget';
import * as Utils from '../../utils';
const Weather = () => {
  return (
    <div className="weather">
      {Utils.WeatherUtils.locations.map(item =>
        <WeatherWidget isFirstEntry={item.isFirst} location={item.location} lon={item.lon} lat={item.lat} key={item.location}> {item.location} </WeatherWidget>
      )}
    </div>
  )
}

export default Weather