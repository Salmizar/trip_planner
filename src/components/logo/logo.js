import React from 'react'
import TripCalendarImg from '../../assets/favicon/android-chrome-192x192.png'
import "./logo.css";

const Logo = () => {
  return (
    <div className="trip-calendar-logo">
        <img alt='Trip Calendar' src={TripCalendarImg}></img>
        <div className="trip-calendar-logo-title">Trip Calendar</div>
    </div>
  )
}

export default Logo