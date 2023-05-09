import React from 'react'
import "./date-input.css"

const DateInput = ({dateValue, placeHolder, className, disabled}) => {
    const displayDate = new Date(dateValue);
    const cName = (className)?className:'';
  return (
    <div title={placeHolder} className={cName+" date-input"+((disabled)?' date-input-disabled':'')}>{displayDate.toDateString()}</div>
  )
}

export default DateInput