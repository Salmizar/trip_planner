import React, { createRef, useState, useEffect } from 'react'
import "./date-input.css"
import * as Utils from "../../utils";

const DateInput = ({ dateValue, title, placeHolder, onChange, className, disabled, invalid }) => {
  const [displayDate, setDisplayDate] = useState(new Date(0));
  const [pickerDate, setPickerDate] = useState(new Date(0));
  const [datesOfMonth, setDatesOfMonth] = useState({});
  const dateInputContainer = createRef();
  const toggleTheMonth = (incriment) => {
    setPickerDate(new Date(pickerDate.setMonth(pickerDate.getMonth() + incriment)));
  }
  const toggleDatePicker = () => {
    if (dateInputContainer.current.classList.contains('date-input-container-visible')) {
      dateInputContainer.current.classList.remove('date-input-container-visible');
    } else {
      dateInputContainer.current.classList.add('date-input-container-visible');
    }
  }
  const changeDisplayDate = (year, month, day) => {
    setDisplayDate(new Date(year, month, day));
    toggleDatePicker();
    if (onChange) {
      onChange(new Date(year, month, day));
    }
  }
  useEffect(() => {
    if (dateValue != undefined) {
      var newDate = new Date(dateValue);
      setDisplayDate(new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate()));
      setPickerDate(new Date(newDate.getFullYear(), newDate.getMonth(), 1));
    }
  }, [dateValue]);
  useEffect(() => {
    setDatesOfMonth(Utils.CalendarUtils.getDatesOfTheMonth(pickerDate));
  }, [pickerDate]);
  return (
    <div className={((className) ? className : '') + " date-input"}>
      <div title={title} 
      className={'date-input-display-date' +
        ((disabled) ? ' date-input-display-date-disabled' : '')+
        ((invalid)? ' date-input-display-date-invalid':'' )
      } onClick={toggleDatePicker}>
        {((displayDate) ? displayDate.toDateString() : placeHolder && title)}
      </div>
      <div ref={dateInputContainer} className="date-input-container">
        <nav className='date-input-nav'>
          {pickerDate.toLocaleDateString("en-us", { month: 'long', year: 'numeric' })}
          <button title="Next month" className='date-input-nav-next' onClick={() => toggleTheMonth(1)}>
            <img alt="Next Month" src="/assets/arrowIcon.png"></img>
          </button>
          <button title="Previous Month" className='date-input-nav-previous' onClick={() => toggleTheMonth(-1)}>
            <img alt="Previous Month" src="/assets/arrowIcon.png"></img>
          </button>
        </nav>
        <div className="date-input-days-of-week-container">
          {Utils.CalendarUtils.daysOfTheWeek.map(item =>
            <div key={item}> {item.substring(0, 1)} </div>
          )}
        </div>
        {Object.entries(datesOfMonth).map((week) =>
          <div title='Pick a Date' key={JSON.stringify(week)} className="date-input-week-container">
            {Object.entries(Object.values(week)[1]).map((day) =>
              <div key={JSON.stringify(day[1])} className='date-input-day-container'>
                <div
                  className={
                    'date-input-day' +
                    ((day[1].isThisToday) ? ' date-input-today' : '' +
                      ((day[1].year === displayDate.getFullYear() && day[1].month === displayDate.getMonth() && day[1].dayOfMonth === displayDate.getDate()) ? ' date-input-selected' : '')
                    )}
                  onClick={() => changeDisplayDate(day[1].year, day[1].month, day[1].dayOfMonth)}
                >
                  {JSON.stringify(day[1].dayOfMonth)}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default DateInput