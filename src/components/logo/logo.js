import React from 'react'
import TripCalendarImg from '../../assets/favicon/android-chrome-192x192.png'
import "./logo.css";

const Logo = () => {
  return (
    <div className="TripCalendarContainer">
        <img alt='Trip Calendar' style={{height:130}} src={TripCalendarImg}></img>
        <div className="TripCalendarTitle">Trip Calendar</div>
    </div>
  )
}

export default Logo