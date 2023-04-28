import React from 'react'
import "./weather-widget-day.css";
import * as Utils from '../../utils';
const WeatherWidgetDay = ({ forecastInfo, weatherIconDescription, firstEntry }) => {
    const forecastData = JSON.parse(forecastInfo);
    return (
        <div className='weather-widget-forecast'>
            <div className={'weather-widget-forecast-date ' + (firstEntry ? 'block' : 'hidden') + ' text-gray-500'}>
                {Utils.WeatherUtils.daysOfWeek[forecastData.forecast_day_of_week] + ' ' + forecastData.forecast_day}
            </div>
            <div className='weather-widget-night-container'>
                <div className='weather-widget-night-container-title'>
                    {forecastData.night_temp + '°C'}
                </div>
                <div className={'weather-widget-night-container-feels ' + ((forecastData.windchill_min === forecastData.night_temp) ? 'invisible' : '')}>
                    Feels like {forecastData.windchill_min}°C
                </div>
                <img className='weather-widget-night-container-weather-ico' src={'/assets/weatherIcons/' + forecastData.night_weather_icon.substring(3) + 'n.png'}></img>
                <div className='weather-widget-container-description'>
                    {weatherIconDescription[forecastData.night_weather_icon.substring(3)]}
                    <div className='weather-widget-container-wind-direction'>
                        <svg height="10" width="8" style={{ transform: ' rotate(' + forecastData.night_wind_direction + 'deg)' }}>
                            <path d="M4 0 L0 10 L4 6 L8 10 Z" />
                        </svg>
                        <div>&nbsp;{Utils.WeatherUtils.convertMPStoKPH(forecastData.night_wind_speed)} kph&nbsp;
                            {Utils.WeatherUtils.getWindDirection(forecastData.night_wind_direction)}</div>
                    </div>
                </div>
                <div className='weather-widget-container-precipitation'>
                    <span>{forecastData.night_rain}&nbsp;{forecastData.night_snow}</span>
                    <div className='weather-widget-container-precipitation-rain' style={{ height: (parseFloat(forecastData.night_rain) * 2) + 'px', display: ((parseFloat(forecastData.night_rain) > 0) ? 'block' : 'none') }}></div>
                    <div className='weather-widget-container-precipitation-snow' style={{ height: (parseFloat(forecastData.night_snow) * 2) + 'px', display: ((parseFloat(forecastData.night_snow) > 0) ? 'block' : 'none') }}></div>
                </div>
            </div>
            <div className='weather-widget-day-container'>
                <div className='weather-widget-day-container-title'>
                    {forecastData.day_temp + '°C'}
                </div>
                <div className={'weather-widget-day-container-feels ' + ((forecastData.windchill_max === forecastData.day_temp) ? 'invisible' : '')}>
                    Feels like {forecastData.windchill_max}°C
                </div>
                <img className='weather-widget-day-container-weather-ico' src={'/assets/weatherIcons/' + forecastData.day_weather_icon.substring(3) + 'd.png'}></img>
                <div className='weather-widget-container-description'>
                    {weatherIconDescription[forecastData.day_weather_icon.substring(3)]}<br></br>
                    <div className='weather-widget-container-wind-direction'>
                        <svg height="10" width="8" style={{ transform: ' rotate(' + forecastData.day_wind_direction + 'deg)' }}>
                            <path d="M4 0 L0 10 L4 6 L8 10 Z" />
                        </svg>
                        <div>&nbsp;{Utils.WeatherUtils.convertMPStoKPH(forecastData.day_wind_speed)} kph&nbsp;
                            {Utils.WeatherUtils.getWindDirection(forecastData.day_wind_direction)}</div>
                    </div>
                </div>
                <div className='weather-widget-container-precipitation'>
                    <span>{forecastData.day_rain}&nbsp;{forecastData.day_snow}</span>
                    <div className='weather-widget-container-precipitation-rain' style={{ height: (parseFloat(forecastData.day_rain) * 2) + 'px', display: ((parseFloat(forecastData.day_rain) > 0) ? 'block' : 'none') }}></div>
                    <div className='weather-widget-container-precipitation-snow' style={{ height: (parseFloat(forecastData.day_snow) * 2) + 'px', display: ((parseFloat(forecastData.day_snow) > 0) ? 'block' : 'none') }}></div>
                </div>
            </div>
        </div>
    )
};
export default WeatherWidgetDay