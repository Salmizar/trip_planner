import React from 'react'
import "./date-input.css"

const DateInput = ({dateValue, title, placeHolder, className, disabled}) => {
    const displayDate = new Date(dateValue);
    const cName = (className)?className:'';
  return (
    <div title={title} className={cName+" date-input"+((disabled)?' date-input-disabled':'')}>
      {((displayDate)? displayDate.toDateString() : placeHolder && title )}
    </div>
  )
}

export default DateInput