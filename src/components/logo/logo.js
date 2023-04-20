import React from 'react'
import TripCalendarImg from '../../assets/favicon/android-chrome-192x192.png'
import "./logo.css";

const Logo = () => {
  return (
    <div className="TripCalendarContainer">
        <img alt='Trip Calendar' src={TripCalendarImg} width={150} height={130}></img>
        <div className="TripCalendarTitle">Trip Calendar</div>
    </div>
  )
}

export default Logo