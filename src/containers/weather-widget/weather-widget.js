import React, { useState, useEffect } from 'react'
import "./weather-widget.css";
import WeatherWidgetDay from '../weather-widget-day/weather-widget-day';
import * as Utils from '../../utils';
const WeatherWidget = ({ isFirstEntry, location, lon, lat }) => {
    const apiId = '4dd46828a426f6692aec539aa487f62f';
    const unit = 'metric';
    const [state, setState] = useState('loading');
    const [locationData, setLocationData] = useState({});
    const [fiveDayForecast, setFiveDayForecast] = useState({});
    const getForecastData = (forecastDay) => {
        return structuredClone(fiveDayForecast[fiveDayForecast.forecastDates[forecastDay]]);
    }
    useEffect(() => {
        let processedData = {};
        if (locationData !== undefined && locationData.list != null) {
            //console.log('rawdata', locationData);
            processedData.currentWeather = locationData.list[0];
            processedData.forecastDates = [];
            var daysEvents = 1;
            for (var key in locationData.list) {
                let entry = locationData.list[key];
                let entryDate = new Date(entry.dt * 1000);
                //Dates are in UTC, must offset them by users timezoneOffset
                entryDate = new Date((entry.dt * 1000) + (entryDate.getTimezoneOffset() * 60 * 1000));
                //if data is about current day, ignore
                var dteNow = new Date();
                if (entryDate.getFullYear() === dteNow.getFullYear() && entryDate.getMonth() === dteNow.getMonth() && entryDate.getDate() === dteNow.getDate()) {
                    //continue;
                }
                let entryId = entryDate.getFullYear() + '-' + (entryDate.getMonth() + 1) + '-' + entryDate.getDate();
                let existingData = processedData[entryId];
                let noEntry = (existingData === undefined);
                try {
                    let icon = {
                        icon: entry.weather[0].icon.substring(0, 2),
                        day_night: entry.weather[0].icon.substring(2)
                    };
                    //Modify Data so that the first Entry for each day is converted from Day to Night, openWeather issue I guess
                    if (noEntry) {
                        icon.day_night = 'n';
                    }
                    processedData[entryId] = {
                        'night_temp': ((noEntry) ? ((icon.day_night === 'n') ? entry.main.temp : 50) : ((icon.day_night === 'n' && parseFloat(entry.main.temp) < parseFloat(existingData.night_temp)) ? Math.floor(entry.main.temp) : existingData.night_temp)),
                        'day_temp': ((noEntry) ? ((icon.day_night === 'd') ? entry.main.temp : -50) : ((icon.day_night === 'd' && parseFloat(entry.main.temp) > parseFloat(existingData.day_temp)) ? Math.ceil(entry.main.temp) : existingData.day_temp)),
                        'temp_min': ((noEntry || parseFloat(entry.main.temp_min) < parseFloat(existingData.temp_min)) ? entry.main.temp_min : existingData.temp_min),
                        'temp_max': ((noEntry || parseFloat(entry.main.temp_max) > parseFloat(existingData.temp_max)) ? entry.main.temp_max : existingData.temp_max),
                        'windchill_min': ((noEntry || parseFloat(entry.main.feels_like) < parseFloat(existingData.windchill_min)) ? entry.main.feels_like : existingData.windchill_min),
                        'windchill_max': ((noEntry || parseFloat(entry.main.feels_like) > parseFloat(existingData.windchill_max)) ? entry.main.feels_like : existingData.windchill_max),
                        'total_rain': ((noEntry) ? 0 : existingData.total_rain) + ((entry.rain) ? entry.rain['3h'] : 0),
                        'total_snow': ((noEntry) ? 0 : existingData.total_snow) + ((entry.snow) ? entry.snow['3h'] : 0),
                        'day_wind_total': ((noEntry) ? 0 : parseFloat(existingData.day_wind_total)) + ((entry.wind && icon.day_night === 'd') ? parseFloat(entry.wind.speed) : 0),
                        'night_wind_total': ((noEntry) ? 0 : parseFloat(existingData.night_wind_total)) + ((entry.wind && icon.day_night === 'n') ? parseFloat(entry.wind.speed) : 0),
                        'day_wind_direction': ((noEntry) ? 0 : parseFloat(existingData.day_wind_direction)) + ((entry.wind && icon.day_night === 'd') ? parseFloat(entry.wind.deg) : 0),
                        'night_wind_direction': ((noEntry) ? 0 : parseFloat(existingData.day_wind_direction)) + ((entry.wind && icon.day_night === 'n') ? parseFloat(entry.wind.deg) : 0),
                        'wind_gust_total': ((noEntry) ? 0 : existingData.wind_gust_total) + ((entry.wind) ? entry.wind.gust : 0),
                        'night_pop': ((noEntry) ? 0 : parseFloat(existingData.night_pop)) + ((entry.wind && icon.day_night === 'n') ? parseFloat(entry.pop) * 100 : 0),
                        'day_pop': ((noEntry) ? 0 : parseFloat(existingData.day_pop)) + ((entry.wind && icon.day_night === 'd') ? parseFloat(entry.pop) * 100 : 0),
                        'weather_patterns': ((noEntry) ? { n: {}, d: {} } : existingData.weather_patterns),
                        'day_rain': ((noEntry) ? 0 : parseFloat(existingData.day_rain)) + ((entry.rain && icon.day_night === 'd') ? parseFloat(entry.rain['3h']) : 0),
                        'night_rain': ((noEntry) ? 0 : parseFloat(existingData.night_rain)) + ((entry.rain && icon.day_night === 'n') ? parseFloat(entry.rain['3h']) : 0),
                        'day_snow': ((noEntry) ? 0 : parseFloat(existingData.day_snow)) + ((entry.snow && icon.day_night === 'd') ? parseFloat(entry.snow['3h']) : 0),
                        'night_snow': ((noEntry) ? 0 : parseFloat(existingData.night_snow)) + ((entry.snow && icon.day_night === 'n') ? parseFloat(entry.snow['3h']) : 0)
                    };
                    let weatherPattern = processedData[entryId].weather_patterns[icon.day_night];
                    //Here we are taking the hourly weather icons and adding them up, so later we can display the most active during that day/night 
                    processedData[entryId].weather_patterns[icon.day_night]['ico' + icon.icon] = ((Object.keys(weatherPattern).length > 0 && weatherPattern['ico' + icon.icon] !== undefined) ? weatherPattern['ico' + icon.icon] + 1 : 1);
                    if (key <= locationData.list.length - 1) {
                        //unable to compare current event to next whenits the last one, so turnery added to prevent error
                        let nextEntry = ((key < locationData.list.length - 1) ? locationData.list[parseInt(key) + 1] : 0);
                        let nextEntryDate = new Date(nextEntry.dt * 1000);
                        //Dates are in UTC, must offset them by users timezoneOffset
                        nextEntryDate = new Date((nextEntry.dt * 1000) + (nextEntryDate.getTimezoneOffset() * 60 * 1000));
                        let nextEntryId = nextEntryDate.getFullYear() + '-' + (nextEntryDate.getMonth() + 1) + '-' + nextEntryDate.getDate();
                        //compare current entry timestamp to next, if the same, incriment daysEvents
                        if (key < locationData.list.length - 1 && entryId === nextEntryId) {
                            daysEvents++;
                        } else {
                            processedData.forecastDates.push(entryId);
                            processedData[entryId].forecast_day = entryDate.getDate();
                            processedData[entryId].forecast_day_of_week = entryDate.getDay();
                            //We must average the wind, gusts and pop
                            processedData[entryId].total_daily_events = daysEvents;
                            processedData[entryId].day_wind_speed = processedData[entryId].day_wind_total / (daysEvents / 2);
                            processedData[entryId].night_wind_speed = processedData[entryId].night_wind_total / (daysEvents / 2);
                            processedData[entryId].day_wind_direction = processedData[entryId].day_wind_direction / (daysEvents / 2);
                            processedData[entryId].night_wind_direction = processedData[entryId].night_wind_direction / (daysEvents / 2);
                            processedData[entryId].night_pop = processedData[entryId].night_pop / (daysEvents / 2);
                            processedData[entryId].day_pop = processedData[entryId].day_pop / (daysEvents / 2);
                            Object.keys(processedData[entryId]).forEach(function (processedKey) {
                                if (processedKey !== 'weather_patterns') {
                                    //rain and snow values should not be rounded
                                    if (!['day_rain', 'night_rain', 'day_snow', 'night_snow'].includes(processedKey)) {
                                        processedData[entryId][processedKey] = Math.round(processedData[entryId][processedKey]);
                                    } else {
                                        var precipType = (['day_rain', 'night_rain'].includes(processedKey)) ? 'mm' : 'cm';
                                        processedData[entryId][processedKey] = ((parseFloat(processedData[entryId][processedKey]) > 0) ? (processedData[entryId][processedKey]).toFixed(1) + precipType : '');
                                    }
                                } else { //Run through the days weather icons and pick the most active for day and night
                                    var highestNight = 0;
                                    var nightIcon = '';
                                    Object.keys(processedData[entryId][processedKey].n).forEach(function (processedNightKey) {
                                        if (processedData[entryId][processedKey].n[processedNightKey] > highestNight) {
                                            nightIcon = processedNightKey;
                                            highestNight = parseInt(processedData[entryId][processedKey].n[processedNightKey]);
                                        }
                                    });
                                    processedData[entryId].night_weather_icon = nightIcon;
                                    var highestDay = 0;
                                    var dayIcon = '';
                                    Object.keys(processedData[entryId][processedKey].d).forEach(function (processedDayKey) {
                                        if (processedData[entryId][processedKey].d[processedDayKey] > highestDay) {
                                            dayIcon = processedDayKey;
                                            highestDay = parseInt(processedData[entryId][processedKey].d[processedDayKey]);
                                        }
                                    });
                                    processedData[entryId].day_weather_icon = dayIcon;
                                }
                            });
                            daysEvents = 1;
                        }
                    }
                    if (processedData.forecastDates.length === 6) {
                        //We have one too many days
                        if (processedData[processedData.forecastDates[0]].total_daily_events < processedData[processedData.forecastDates[5]].total_daily_events) {
                            //if first day has less weather data points than the last, remove it
                            processedData.forecastDates.splice(0, 1);
                        }
                    }
                } catch (error) {
                    console.log('An error occurred processing the Weather Data', error);
                }
            }
            //console.log(processedData);
            setFiveDayForecast(processedData);
            setState('success');
        }
    }, [locationData]);
    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await fetch(
                    'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&units=' + unit + '&appid=' + apiId
                );
                const data = await response.json();
                setLocationData(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchWeather();

    }, [lat, lon]);
    return (
        <div className='weather-widget'>
            {state === 'success' ? (
                <div className={'weather-widget-container' + ((isFirstEntry) ? ' weather-widget-container-first' : '')}>
                    <div className='weather-widget-now'>
                        <div className='weather-widget-now-container'>
                            <div className='whitespace-nowrap z-50 relative'>{location}</div>
                            <img alt='weatherIcon' className='weather-widget-now-weather-ico' src={'/assets/weatherIcons/' + fiveDayForecast.currentWeather.weather[0].icon + '.png'}></img>
                            {Utils.WeatherUtils.weatherIconDescription[fiveDayForecast.currentWeather.weather[0].icon.substring(0, 2)]}
                            <div className='weather-widget-now-container-temp'>
                                {Math.round(fiveDayForecast.currentWeather.main.temp) + '°C'}
                            </div>
                            <div className={'weather-widget-now-container-feels-wind'}>
                                {(Math.round(fiveDayForecast.currentWeather.main.feels_like) === Math.round(fiveDayForecast.currentWeather.main.temp) ?
                                    'Feels like ' + Math.round(fiveDayForecast.currentWeather.main.feels_like) + '°C ' : ''
                                )
                                }
                                <svg height="10" width="8" style={{ transform: ' rotate(' + fiveDayForecast.currentWeather.wind.deg + 'deg)' }}>
                                    <path d="M4 0 L0 10 L4 6 L8 10 Z" />
                                </svg>
                                <div>&nbsp;&nbsp;{Utils.WeatherUtils.convertMPStoKPH(fiveDayForecast.currentWeather.wind.speed)} kph&nbsp;
                                    {Utils.WeatherUtils.getWindDirection(fiveDayForecast.currentWeather.wind.deg)}</div>
                            </div>
                        </div>
                    </div>
                    <WeatherWidgetDay forecastInfo={getForecastData(0)} firstEntry={isFirstEntry}></WeatherWidgetDay>
                    <WeatherWidgetDay forecastInfo={getForecastData(1)} firstEntry={isFirstEntry}></WeatherWidgetDay>
                    <WeatherWidgetDay forecastInfo={getForecastData(2)} firstEntry={isFirstEntry}></WeatherWidgetDay>
                    <WeatherWidgetDay forecastInfo={getForecastData(3)} firstEntry={isFirstEntry}></WeatherWidgetDay>
                    <WeatherWidgetDay forecastInfo={getForecastData(4)} firstEntry={isFirstEntry}></WeatherWidgetDay>
                </div>
            ) : (
                <div className='weather-widget-container weather-widget-container-loading'>loading</div>
            )}
        </div>
    );
}

export default WeatherWidget